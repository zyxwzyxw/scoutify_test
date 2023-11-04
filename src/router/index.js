import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

import Index from "../views/index.vue"

const router = createRouter({
    history: createWebHistory(), // Vue 3
    routes: [
        {
            path: '/',
            component: Index
        },
    ],
})

export default router