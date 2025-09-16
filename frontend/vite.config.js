import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "vite-plugin-vercel"



export default defineConfig({
  server:{
    port:'https://ghup-shup.onrender.com'},
  plugins: [react(), tailwindcss()],
});
