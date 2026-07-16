import { createBrowserClient } from "@supabase/ssr";

declare global {
  // allow storing the client on globalThis to persist across HMR in dev
  // eslint-disable-next-line no-var
  var __SUPABASE_CLIENT__: ReturnType<typeof createBrowserClient> | undefined;
}

export function createClient() {
  if (typeof globalThis !== "undefined" && globalThis.__SUPABASE_CLIENT__) {
    return globalThis.__SUPABASE_CLIENT__;
  }

  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  if (typeof globalThis !== "undefined") {
    globalThis.__SUPABASE_CLIENT__ = client;
  }

  return client;
}
