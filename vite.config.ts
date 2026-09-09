import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * A relative base keeps the build portable across any GitHub Pages project URL:
 * https://USERNAME.github.io/ANY-REPOSITORY-NAME/
 *
 * Hash routing keeps all browser requests on that one static index.html, so
 * nested routes never need server-side rewrites.
 */
export default defineConfig({
  base: "./",
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [tailwindcss(), viteReact()],
});
