import { createRouter, createWebHistory } from 'vue-router'
import GuestLayout from '../views/layouts/GuestLayout.vue';
import LoginView from '../views/auth/LoginView.vue';
import AppLayout from '../views/layouts/AppLayout.vue';
import CreateDriver from '../views/Driver/CreateDriver.vue';

const routes = [
    {
        path: '/auth',
        component: GuestLayout,
        children: [
            {
                path: 'login',
                name: 'LoginPage',
                component: LoginView,
            }
        ],
    },
    {
        path: '',
        component: AppLayout,
        children: [
            {
                path: 'drivers/create',
                name: 'CreateDriver',
                component: CreateDriver,
            }
        ]
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;