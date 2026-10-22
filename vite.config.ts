import { defineConfig } from "vite";

export default defineConfig({
    base: "/AES-Encoder-Decoder-Webpage/",
    server: {
        watch: {
            ignored: [
                "**/.vs/**"
            ]
        }
    }
});
