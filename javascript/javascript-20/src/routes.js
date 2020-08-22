import VueRouter from 'vue-router'
import Settings from './components/Settings'
import Game from "./components/Game.vue";

import store from "./store.js";

const router = new VueRouter({
    mode: 'history',
    base: '/hoborg91-otus-js-vue/',
    routes: [
        { 
            path: '/', 
            name: 'Settings',
            component: Settings,
            props: () => ({
                defaultSettings: store.getters.settings,
                statistics: store.getters.statistics
            }),
        },
        { 
            path: '/game', 
            name: 'Game',
            component: Game,
            props: () => ({
                settings: store.getters.settings,
            }),
        },
    ]
});

export default router;
