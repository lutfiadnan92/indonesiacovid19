'use strict'

Vue.use(VueRouter);

const routes = [
    { 
        path: '/',
        component: Home
    },
    { 
        path: '/cek_dini',
        component: CekDini
    }
];
const router = new VueRouter({
    mode: 'history',
    base: '/indonesiacovid19',
    routes
});

new Vue({
    router   
}).$mount('#app')