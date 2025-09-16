import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: "https://ghup-shup.onrender.com",
  },
  plugins: [react(), tailwindcss()],
});
