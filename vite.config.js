import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src') // 将 @ 别名指向 src 目录的绝对路径
  //   }
  // }
});
