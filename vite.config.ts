import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    // This tells Vite to ignore these specific requests so they don't hit the Router
    proxy: {
      "/.well-known": {
        target: "http://localhost:5173",
        bypass: (req, res) => {
          res.statusCode = 404;
          res.end();
          return false;
        },
      },
    },
  },
});
