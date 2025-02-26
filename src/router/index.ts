import { createRouter, createWebHistory } from 'vue-router'
import GuestLayout from '../views/layouts/GuestLayout.vue';
import LoginView from '../views/auth/LoginView.vue';
import AppLayout from '../views/layouts/AppLayout.vue';
import CreateDriver from '../views/Driver/CreateDriver.vue';
import CreateRace from '../views/Race/CreateRace.vue';
import CreateLap from '../views/Race/CreateLap.vue';
import Home from '../views/Home.vue';

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
                path: '',
                name: 'Home',
                component: Home,
            },
            {
                path: 'laps/create',
                name: 'CreateLap',
                component: CreateLap,
            },
            {
                path: 'drivers/create',
                name: 'CreateDriver',
                component: CreateDriver,
            },
            {
                path: 'races/create',
                name: 'CreateRace',
                component: CreateRace,
            }
        ]
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;