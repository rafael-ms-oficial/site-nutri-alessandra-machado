#!/usr/bin/env bash

set -Eeuo pipefail

APP_DIR="/var/www/dra-alessandra"
BRANCH="main"
PM2_APP="dra-alessandra"
APP_PORT="3001"
LOCK_FILE="/tmp/dra-alessandra-deploy.lock"

log() {
  echo
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

fail() {
  echo
  echo "ERRO: $1" >&2
  exit 1
}

rollback() {
  log "Executando rollback para o commit anterior: $PREVIOUS_COMMIT"

  git reset --hard "$PREVIOUS_COMMIT"

  npm ci
  npm run build

  pm2 restart "$PM2_APP" --update-env

  sleep 5

  fail "Deploy revertido. Consulte: pm2 logs $PM2_APP"
}

# Impede dois deploys simultâneos.
exec 9>"$LOCK_FILE"

if ! flock -n 9; then
  fail "Já existe outro deploy em execução."
fi

log "Iniciando deploy da Dra. Alessandra"

cd "$APP_DIR" || fail "Não foi possível acessar $APP_DIR"

command -v git >/dev/null 2>&1 || fail "Git não encontrado."
command -v npm >/dev/null 2>&1 || fail "npm não encontrado."
command -v pm2 >/dev/null 2>&1 || fail "PM2 não encontrado."
command -v curl >/dev/null 2>&1 || fail "curl não encontrado."

# Não permite sobrescrever mudanças manuais na VPS.
if ! git diff --quiet || ! git diff --cached --quiet; then
  git status
  fail "Existem alterações locais versionadas na VPS."
fi

PREVIOUS_COMMIT="$(git rev-parse HEAD)"

log "Commit atual: $PREVIOUS_COMMIT"
log "Buscando atualizações no GitHub"

git fetch origin "$BRANCH"

REMOTE_COMMIT="$(git rev-parse "origin/$BRANCH")"

if [ "$PREVIOUS_COMMIT" = "$REMOTE_COMMIT" ]; then
  log "Nenhuma atualização encontrada."

  pm2 status "$PM2_APP"

  exit 0
fi

log "Novo commit encontrado: $REMOTE_COMMIT"

git reset --hard "origin/$BRANCH"

log "Instalando dependências"

if ! npm ci; then
  log "Falha no npm ci."
  log "O package.json e o package-lock.json podem estar dessincronizados."

  git reset --hard "$PREVIOUS_COMMIT"

  fail "Deploy interrompido. Corrija o package-lock.json no repositório."
fi

log "Executando build do Next.js"

if ! npm run build; then
  rollback
fi

log "Reiniciando processo PM2: $PM2_APP"

if pm2 describe "$PM2_APP" >/dev/null 2>&1; then
  pm2 restart "$PM2_APP" --update-env
else
  log "Processo PM2 não encontrado. Criando novo processo."

  PORT="$APP_PORT" pm2 start npm \
    --name "$PM2_APP" \
    -- start -- -p "$APP_PORT"
fi

sleep 5

log "Verificando status do PM2"

if ! pm2 describe "$PM2_APP" | grep -q "online"; then
  rollback
fi

log "Testando aplicação na porta $APP_PORT"

if ! curl \
  --fail \
  --silent \
  --show-error \
  --max-time 15 \
  "http://127.0.0.1:$APP_PORT" \
  >/dev/null; then

  rollback
fi

pm2 save

log "Deploy concluído com sucesso"
log "Commit publicado: $REMOTE_COMMIT"
log "Aplicação disponível internamente em http://127.0.0.1:$APP_PORT"

pm2 status "$PM2_APP"
