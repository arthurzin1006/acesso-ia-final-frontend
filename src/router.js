import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue';
import Home from '@/components/Home.vue'

Vue.use(Router);

const router = new Router({
    mode:"history",
    routes: [
        {path: "/login", component: Login},
        {
            path: "/home", 
            component: Home, 
            meta: { requireAuth: true}
        },
    ]
});


//Intercepta a navegação visando validar regras
router.beforeEach((to, from, next) => {
    const usuarioLogado = localStorage.getItem('dados-usuario-logado');


    //Valida se a rota solicitada estar logado se possui dados de login
    if(to.matched.some(record => record.meta.requiresAuth ) && !usuarioLogado)
    {
        //Se a rota exige autenticação e não há usuário logado, redireciona para login
        next('/login');
    }
    //segue a vida
    next();
});

export default router;