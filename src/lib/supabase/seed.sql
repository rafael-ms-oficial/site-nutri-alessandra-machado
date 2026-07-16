-- Seed data: migrates the 6 sample blog posts that used to be hardcoded in the
-- frontend (BlogPreview, BlogGrid, blog/[slug]) into the real `posts` table.
-- Run this manually in the Supabase SQL editor after schema.sql. Safe to
-- re-run — inserts are skipped for slugs that already exist.

insert into posts (title, slug, excerpt, content, category, published, author)
values
  (
    'Como perder peso sem seguir dietas restritivas',
    'como-perder-peso-sem-dieta',
    'Descubra como uma abordagem baseada em comportamento alimentar pode ser mais eficaz e duradoura do que qualquer dieta da moda.',
    '<p>A busca pelo peso ideal muitas vezes leva as pessoas a adotarem dietas cada vez mais restritivas — e cada vez mais insustentáveis. O problema é que esse ciclo de restrição, queda, culpa e nova restrição cria uma relação tóxica com a comida que sabota os resultados a longo prazo.</p>
<h2>Por que as dietas restritivas falham</h2>
<p>Quando você restringe drasticamente a alimentação, o corpo interpreta isso como uma ameaça e ativa mecanismos de sobrevivência: diminui o metabolismo, aumenta a sensação de fome e eleva o desejo por alimentos calóricos. É biologia, não falta de força de vontade.</p>
<h2>A abordagem comportamental</h2>
<p>Em vez de ditar o que você pode ou não pode comer, trabalho com você para entender os gatilhos emocionais que levam a escolhas alimentares menos saudáveis. Quando entendemos o "porquê", fica muito mais fácil fazer escolhas conscientes.</p>
<h2>Princípios que uso com minhas pacientes</h2>
<ul>
<li><strong>Comer com atenção plena</strong> — sem tela, saboreando cada mordida</li>
<li><strong>Reconhecer fome e saciedade</strong> — o corpo sabe, precisamos aprender a ouvir</li>
<li><strong>Sem alimentos proibidos</strong> — a proibição aumenta o desejo</li>
<li><strong>Consistência, não perfeição</strong> — uma refeição não define seu resultado</li>
</ul>
<h2>Resultados reais e duradouros</h2>
<p>As pacientes que trabalham comigo com essa abordagem não apenas atingem seu peso ideal — elas mantêm os resultados. Porque não é uma dieta que tem prazo de validade, é uma mudança de vida.</p>',
    'Emagrecimento',
    true,
    'Dra. Alessandra Machado'
  ),
  (
    'A conexão entre saúde intestinal e seu bem-estar geral',
    'saude-intestinal-imunidade',
    'O intestino é o segundo cérebro do corpo. Entenda como cuidar do seu microbioma pode transformar sua saúde de dentro para fora.',
    '<p>O intestino é o segundo cérebro do corpo. Entenda como cuidar do seu microbioma pode transformar sua saúde de dentro para fora.</p>
<p>Trilhões de microrganismos vivem no seu trato digestivo e influenciam desde a digestão até o humor e a imunidade. Cuidar dessa flora com alimentação adequada é um dos pilares de um tratamento nutricional duradouro.</p>',
    'Saúde Intestinal',
    true,
    'Dra. Alessandra Machado'
  ),
  (
    'Ansiedade e comida: como quebrar o ciclo emocional',
    'ansiedade-comida-comportamento',
    'Comer por ansiedade é mais comum do que você imagina. Veja as estratégias para reconhecer e tratar esse padrão.',
    '<p>Comer por ansiedade é mais comum do que você imagina. Veja as estratégias que uso com minhas pacientes para reconhecer e tratar esse padrão.</p>
<p>Identificar os gatilhos emocionais por trás da compulsão alimentar é o primeiro passo para construir uma relação mais saudável com a comida — sem culpa e sem restrição.</p>',
    'Comportamento Alimentar',
    true,
    'Dra. Alessandra Machado'
  ),
  (
    'O café da manhã ideal para quem quer emagrecer',
    'cafe-da-manha-ideal',
    'Aprenda a montar um café da manhã nutritivo e saciante que ajuda no controle do peso sem sacrifício.',
    '<p>Aprenda a montar um café da manhã nutritivo e saciante que ajuda no controle do peso sem sacrifício.</p>
<p>Equilibrar proteínas, fibras e gorduras boas logo na primeira refeição do dia ajuda a manter a saciedade e evita picos de fome ao longo do dia.</p>',
    'Nutrição',
    true,
    'Dra. Alessandra Machado'
  ),
  (
    'Microbioma intestinal: o que é e por que importa',
    'microbioma-flora-intestinal',
    'Conheça os trilhões de microrganismos que habitam seu intestino e como eles influenciam seu peso, humor e imunidade.',
    '<p>Conheça os trilhões de microrganismos que habitam seu intestino e como eles influenciam seu peso, humor e imunidade.</p>
<p>Um microbioma equilibrado está diretamente ligado a um metabolismo mais eficiente e a uma resposta imunológica mais forte.</p>',
    'Saúde Intestinal',
    true,
    'Dra. Alessandra Machado'
  ),
  (
    'Comer sem culpa: como desenvolver uma relação saudável com a comida',
    'comer-sem-culpa',
    'A culpa após comer é um dos maiores sabotadores do emagrecimento. Saiba como sair desse ciclo de uma vez por todas.',
    '<p>A culpa após comer é um dos maiores sabotadores do emagrecimento. Saiba como sair desse ciclo de uma vez por todas.</p>
<p>Nenhum alimento isolado define o sucesso ou o fracasso de um plano alimentar. Consistência ao longo do tempo é sempre mais importante do que perfeição em uma única refeição.</p>',
    'Comportamento Alimentar',
    true,
    'Dra. Alessandra Machado'
  )
on conflict (slug) do nothing;
