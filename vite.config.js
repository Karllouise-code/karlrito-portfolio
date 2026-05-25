  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  import { resolve } from 'path'
  import { nodePolyfills } from 'vite-plugin-node-polyfills'
  
  export default defineConfig({
    plugins: [
      vue(),
      nodePolyfills(),
    ],
    server: {
      proxy: {
        '/api/hashnode': {
          target: 'https://gql.hashnode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/hashnode/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@components': resolve(__dirname, 'src/components')
      }
    },       assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.ico', '**/*.pdf'],
       css: {
         preprocessorOptions: {
           scss: {
             additionalData: '@import "@/assets/scss/variables.scss";'
           }
         }
       }
     })