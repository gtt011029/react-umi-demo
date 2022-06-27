import { defineConfig } from 'umi';

export default defineConfig({
  dva: {
    hmr: true,
  },
  history: {
    type: 'hash',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  title: '学习demo', // 浏览器头部文字
  // 路由在这里
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/user', component: '@/pages/user/user' },
    { path: '/reducer', component: '@/pages/useReducerTest' },
    { path: '/count', component: '@/pages/count' },
    { path: '/redux', component: '@/pages/reduxTest' },
  ],
  // 代理也称为网络代理， 是一种特殊的网络服务， 允许一个终端（一般为客户端）
  // 通过这个服务与另一个终端（一般为服务端）进行非直接的连接
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:5000',
      changeOrigin: true,
    },
  },
  fastRefresh: {},
});
