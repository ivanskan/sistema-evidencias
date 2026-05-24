import {
  defineConfig
} from "vite";

import react
  from "@vitejs/plugin-react";

import {
  VitePWA
} from "vite-plugin-pwa";

export default defineConfig({

  plugins: [

    react(),

    VitePWA({

      registerType:
        "autoUpdate",

      includeAssets: [

        "favicon.png",

        "apple-touch-icon.png",
      ],

      manifest: {

        name:
          "Sistema Evidencias",

        short_name:
          "Evidencias",

        description:
          "Sistema de gestión de evidencias",

        theme_color:
          "#212529",

        background_color:
          "#212529",

        display:
          "standalone",

        orientation:
          "portrait",

        start_url:
          "/",

        icons: [

          {
            src:
              "/pwa-192.png",

            sizes:
              "192x192",

            type:
              "image/png",
          },

          {
            src:
              "/pwa-512.png",

            sizes:
              "512x512",

            type:
              "image/png",
          },
        ],
         screenshots: [

    {
      src:
        "/screenshot-desktop.png",

      sizes:
        "1280x720",

      type:
        "image/png",

      form_factor:
        "wide",

      label:
        "Sistema Evidencias Desktop"
    },

    {
      src:
        "/screenshot-mobile.png",

      sizes:
        "390x844",

      type:
        "image/png",

      label:
        "Sistema Evidencias Mobile"
    }
  ]
      },
    }),
  ],
   server: {

    host: "0.0.0.0",

    port: 5173,
  },
});