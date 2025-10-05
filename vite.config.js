  import { defineConfig } from 'vite'
     import vue from '@vitejs/plugin-vue'
     import { resolve } from 'path'

     export default defineConfig({
       plugins: [vue()],
       resolve: {
         alias: {
           '@': resolve(__dirname, 'src'),
           '@assets': resolve(__dirname, 'src/assets'),
           '@components': resolve(__dirname, 'src/components')
         }
       },
       assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.ico'],
       css: {
         preprocessorOptions: {
           scss: {
             additionalData: '@import "@/assets/scss/variables.scss";'
           }
         }
       }
     })