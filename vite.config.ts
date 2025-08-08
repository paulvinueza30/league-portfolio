import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
});
