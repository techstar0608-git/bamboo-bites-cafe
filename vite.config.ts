// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    // Cloudflare worker bundle uses `index.js`; TanStack preview loads `<outDir>/server.js`.
    environments: {
      ssr: {
        build: {
          rollupOptions: {
            output: {
              entryFileNames: "server.js",
            },
          },
        },
      },
    },
    // Cloud Run (and any *.run.app hostname): allow the incoming Host header.
    // Listing hosts is fragile; preview + Workers dev stack may not merge lists reliably.
    server: {
      allowedHosts: true,
    },
    preview: {
      allowedHosts: true,
    },
  },
});
