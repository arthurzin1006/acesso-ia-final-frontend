<template>  
    <div>
    <div class="container mt-4 text-center">
    <h2>Bem vindo, {{nomeUsuarioLogado}} </h2>
    </div>
        <br>
        <button @click="deslogar">Sair</button>
    </div>
</template>

<script>   
export default {
    data(){
        return {
            nomeUsuarioLogado: ''
        };
    },
    mounted(){
        const usuarioLogado = localStorage.getItem('dados-usuario-logado');
        if(usuarioLogado){
            this.nomeUsuarioLogado = JSON.parse(usuarioLogado).nome;
        }
    },
    methods: {
        deslogar()
        {
            localStorage.removeItem('dados-usuario-logado');
            this.$router.push('/login');
        }
    }
}
</script>

<style></style>