// vite.config.ts
import * as path from "node:path";
import fs from "node:fs";
import react from "file:///Users/nth/Desktop/NTH/React-TipTab/node_modules/.pnpm/@vitejs+plugin-react@4.3.3_vite@5.4.10_@types+node@22.9.0_less@4.2.0_lightningcss@1.25.1_sass@1.80.6_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///Users/nth/Desktop/NTH/React-TipTab/node_modules/.pnpm/vite@5.4.10_@types+node@22.9.0_less@4.2.0_lightningcss@1.25.1_sass@1.80.6/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/nth/Desktop/NTH/React-TipTab/node_modules/.pnpm/vite-plugin-dts@4.3.0_@types+node@22.9.0_rollup@4.21.1_typescript@5.6.3_vite@5.4.10_@types+no_krwuu5ydj2zybwljsv5z3ja77u/node_modules/vite-plugin-dts/dist/index.mjs";
import tailwind from "file:///Users/nth/Desktop/NTH/React-TipTab/node_modules/.pnpm/tailwindcss@3.4.14/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///Users/nth/Desktop/NTH/React-TipTab/node_modules/.pnpm/autoprefixer@10.4.20_postcss@8.4.47/node_modules/autoprefixer/lib/autoprefixer.js";
import postcssReplace from "file:///Users/nth/Desktop/NTH/React-TipTab/node_modules/.pnpm/postcss-replace@2.0.1_postcss@8.4.47/node_modules/postcss-replace/index.js";
var __vite_injected_original_dirname = "/Users/nth/Desktop/NTH/React-TipTab";
var vite_config_default = defineConfig(({ mode }) => {
  const isDev = mode !== "production";
  return {
    plugins: [
      react(),
      dts({
        rollupTypes: true,
        afterBuild: (emittedFiles) => {
          emittedFiles.forEach((content, filePath) => {
            if (filePath.endsWith(".d.ts")) {
              const newFilePath = filePath.replace(".d.ts", ".d.cts");
              fs.writeFileSync(newFilePath, content);
            }
          });
        }
      })
    ],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__vite_injected_original_dirname, "src") }]
    },
    css: {
      postcss: {
        plugins: [
          tailwind(),
          autoprefixer(),
          postcssReplace({
            pattern: /(--tw|\*, ::before, ::after)/g,
            data: {
              "--tw": "--richtext",
              // Prefixing
              "*, ::before, ::after": ":root"
              // So variables does not pollute every element
            }
          })
        ]
      },
      preprocessorOptions: {
        scss: {
          charset: false,
          api: "modern-compiler"
          // or 'modern'
        }
      }
    },
    build: {
      cssMinify: "esbuild",
      minify: "esbuild",
      outDir: "lib",
      sourcemap: isDev,
      lib: {
        entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
        formats: ["es", "cjs"]
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("@tiptap")) {
              return "tiptap";
            }
            if (id.includes("node_modules")) {
              return "vendor";
            }
            if (id.includes("src/utils")) {
              return "utils";
            }
            if (id.includes("src/locales")) {
              return "locales";
            }
          }
        },
        external: ["react", "react-dom", "react/jsx-runtime", "katex", "shiki", "docx", "@radix-ui/react-dropdown-menu", "@radix-ui/react-icons", "@radix-ui/react-label", "@radix-ui/react-popover", "@radix-ui/react-separator", "@radix-ui/react-slot", "@radix-ui/react-switch", "@radix-ui/react-tabs", "@radix-ui/react-toast", "@radix-ui/react-toggle", "@radix-ui/react-tooltip", "@radix-ui/react-select", "@radix-ui/react-checkbox", "react-colorful", "scroll-into-view-if-needed", "tippy.js", "valtio", "lucide-react", "prosemirror-docx", "re-resizable", "@excalidraw/excalidraw", "@radix-ui/react-dialog", "react-image-crop", "mermaid", "react-tweet"]
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbnRoL0Rlc2t0b3AvTlRIL1JlYWN0LVRpcFRhYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL250aC9EZXNrdG9wL05USC9SZWFjdC1UaXBUYWIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL250aC9EZXNrdG9wL05USC9SZWFjdC1UaXBUYWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xuXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgdGFpbHdpbmQgZnJvbSAndGFpbHdpbmRjc3MnXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcbmltcG9ydCBwb3N0Y3NzUmVwbGFjZSBmcm9tICdwb3N0Y3NzLXJlcGxhY2UnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGlzRGV2ID0gbW9kZSAhPT0gJ3Byb2R1Y3Rpb24nXG5cbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAgZHRzKHtcbiAgICAgICAgcm9sbHVwVHlwZXM6IHRydWUsXG4gICAgICAgIGFmdGVyQnVpbGQ6IChlbWl0dGVkRmlsZXMpID0+IHtcbiAgICAgICAgICBlbWl0dGVkRmlsZXMuZm9yRWFjaCgoY29udGVudCwgZmlsZVBhdGgpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWxlUGF0aC5lbmRzV2l0aCgnLmQudHMnKSkge1xuICAgICAgICAgICAgICBjb25zdCBuZXdGaWxlUGF0aCA9IGZpbGVQYXRoLnJlcGxhY2UoJy5kLnRzJywgJy5kLmN0cycpXG4gICAgICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMobmV3RmlsZVBhdGgsIGNvbnRlbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IFt7IGZpbmQ6ICdAJywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSB9XSxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcG9zdGNzczoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgdGFpbHdpbmQoKSxcbiAgICAgICAgICBhdXRvcHJlZml4ZXIoKSxcbiAgICAgICAgICBwb3N0Y3NzUmVwbGFjZSh7XG4gICAgICAgICAgICBwYXR0ZXJuOiAvKC0tdHd8XFwqLCA6OmJlZm9yZSwgOjphZnRlcikvZyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgJy0tdHcnOiAnLS1yaWNodGV4dCcsIC8vIFByZWZpeGluZ1xuICAgICAgICAgICAgICAnKiwgOjpiZWZvcmUsIDo6YWZ0ZXInOiAnOnJvb3QnLCAvLyBTbyB2YXJpYWJsZXMgZG9lcyBub3QgcG9sbHV0ZSBldmVyeSBlbGVtZW50XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgc2Nzczoge1xuICAgICAgICAgIGNoYXJzZXQ6IGZhbHNlLFxuICAgICAgICAgIGFwaTogJ21vZGVybi1jb21waWxlcicsIC8vIG9yICdtb2Rlcm4nXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIGNzc01pbmlmeTogJ2VzYnVpbGQnLFxuICAgICAgbWluaWZ5OiAnZXNidWlsZCcsXG4gICAgICBvdXREaXI6ICdsaWInLFxuICAgICAgc291cmNlbWFwOiBpc0RldixcbiAgICAgIGxpYjoge1xuICAgICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgICBmb3JtYXRzOiBbJ2VzJywgJ2NqcyddLFxuICAgICAgfSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0B0aXB0YXAnKSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ3RpcHRhcCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3NyYy91dGlscycpKSB7XG4gICAgICAgICAgICAgIHJldHVybiAndXRpbHMnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3NyYy9sb2NhbGVzJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdsb2NhbGVzJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGV4dGVybmFsOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC9qc3gtcnVudGltZScsICdrYXRleCcsICdzaGlraScsICdkb2N4JywgJ0ByYWRpeC11aS9yZWFjdC1kcm9wZG93bi1tZW51JywgJ0ByYWRpeC11aS9yZWFjdC1pY29ucycsICdAcmFkaXgtdWkvcmVhY3QtbGFiZWwnLCAnQHJhZGl4LXVpL3JlYWN0LXBvcG92ZXInLCAnQHJhZGl4LXVpL3JlYWN0LXNlcGFyYXRvcicsICdAcmFkaXgtdWkvcmVhY3Qtc2xvdCcsICdAcmFkaXgtdWkvcmVhY3Qtc3dpdGNoJywgJ0ByYWRpeC11aS9yZWFjdC10YWJzJywgJ0ByYWRpeC11aS9yZWFjdC10b2FzdCcsICdAcmFkaXgtdWkvcmVhY3QtdG9nZ2xlJywgJ0ByYWRpeC11aS9yZWFjdC10b29sdGlwJywgJ0ByYWRpeC11aS9yZWFjdC1zZWxlY3QnLCAnQHJhZGl4LXVpL3JlYWN0LWNoZWNrYm94JywgJ3JlYWN0LWNvbG9yZnVsJywgJ3Njcm9sbC1pbnRvLXZpZXctaWYtbmVlZGVkJywgJ3RpcHB5LmpzJywgJ3ZhbHRpbycsICdsdWNpZGUtcmVhY3QnLCAncHJvc2VtaXJyb3ItZG9jeCcsICdyZS1yZXNpemFibGUnLCAnQGV4Y2FsaWRyYXcvZXhjYWxpZHJhdycsICdAcmFkaXgtdWkvcmVhY3QtZGlhbG9nJywgJ3JlYWN0LWltYWdlLWNyb3AnLCAnbWVybWFpZCcsICdyZWFjdC10d2VldCddLFxuICAgICAgfSxcbiAgICB9LFxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUixZQUFZLFVBQVU7QUFDalQsT0FBTyxRQUFRO0FBRWYsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGNBQWM7QUFDckIsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxvQkFBb0I7QUFSM0IsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxRQUFRLFNBQVM7QUFFdkIsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sSUFBSTtBQUFBLFFBQ0YsYUFBYTtBQUFBLFFBQ2IsWUFBWSxDQUFDLGlCQUFpQjtBQUM1Qix1QkFBYSxRQUFRLENBQUMsU0FBUyxhQUFhO0FBQzFDLGdCQUFJLFNBQVMsU0FBUyxPQUFPLEdBQUc7QUFDOUIsb0JBQU0sY0FBYyxTQUFTLFFBQVEsU0FBUyxRQUFRO0FBQ3RELGlCQUFHLGNBQWMsYUFBYSxPQUFPO0FBQUEsWUFDdkM7QUFBQSxVQUNGLENBQUM7QUFBQSxRQUNIO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTyxDQUFDLEVBQUUsTUFBTSxLQUFLLGFBQWtCLGFBQVEsa0NBQVcsS0FBSyxFQUFFLENBQUM7QUFBQSxJQUNwRTtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLFFBQ1AsU0FBUztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsYUFBYTtBQUFBLFVBQ2IsZUFBZTtBQUFBLFlBQ2IsU0FBUztBQUFBLFlBQ1QsTUFBTTtBQUFBLGNBQ0osUUFBUTtBQUFBO0FBQUEsY0FDUix3QkFBd0I7QUFBQTtBQUFBLFlBQzFCO0FBQUEsVUFDRixDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLFNBQVM7QUFBQSxVQUNULEtBQUs7QUFBQTtBQUFBLFFBQ1A7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsS0FBSztBQUFBLFFBQ0gsT0FBWSxhQUFRLGtDQUFXLGNBQWM7QUFBQSxRQUM3QyxTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsTUFDdkI7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGFBQWEsSUFBSTtBQUNmLGdCQUFJLEdBQUcsU0FBUyxTQUFTLEdBQUc7QUFDMUIscUJBQU87QUFBQSxZQUNUO0FBQ0EsZ0JBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsV0FBVyxHQUFHO0FBQzVCLHFCQUFPO0FBQUEsWUFDVDtBQUNBLGdCQUFJLEdBQUcsU0FBUyxhQUFhLEdBQUc7QUFDOUIscUJBQU87QUFBQSxZQUNUO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFVBQVUsQ0FBQyxTQUFTLGFBQWEscUJBQXFCLFNBQVMsU0FBUyxRQUFRLGlDQUFpQyx5QkFBeUIseUJBQXlCLDJCQUEyQiw2QkFBNkIsd0JBQXdCLDBCQUEwQix3QkFBd0IseUJBQXlCLDBCQUEwQiwyQkFBMkIsMEJBQTBCLDRCQUE0QixrQkFBa0IsOEJBQThCLFlBQVksVUFBVSxnQkFBZ0Isb0JBQW9CLGdCQUFnQiwwQkFBMEIsMEJBQTBCLG9CQUFvQixXQUFXLGFBQWE7QUFBQSxNQUNyb0I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
