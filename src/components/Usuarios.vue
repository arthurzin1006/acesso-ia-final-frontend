<template>
    <div>
        <h2>Gernciamento de usuarios </h2>

        <!-- Botao para criar novo -->
         <div class="mb-3">
            <router-link to="/usuario/cadastrar" class="btn btn-success">
                <i class="fa fa-plus">Adicionar novo</i>
            </router-link>
         </div>

         <div  v-if="carregando" class="text-center">
            <i class="fa fa-spinner fa-spin"></i>Carregando....
         </div>

         <div  v-if="erro" class="alert alert-danger">
            <i class="fa fa-ban"></i>
            {{ erro }}
         </div>

         <div v-if="!carregando && usuarios.length === 0 && erro"
         class = "alert alert-warning text-center">
         <i class="fa fa-exclamattion-circle"></i>Nenhum usuário cadastrado!
        </div>

         <!-- Tabela de listagem -->
          <table  v-if="!carregando && usuarios.length> 0" class="table table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Status</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                <td>{{ usuario.id }}</td>
                <td>{{ usuario.nome }}</td>
                <td>{{ usuario.email }}</td>
                <td>{{ usuario.cpf }}</td>
                <td>{{ usuario.status }}</td>

            
                <td>
                    <button class="btn btn-primary btn-sm">
                        <i class="fa fa-edit"></i>Editar
                    </button>

                    <button class="btn btn-danger btn-sm ml-2" @click="excluir(usuario.id)" >
                        <i class="fa fa-trash"></i>Excluir
                    </button>
                </td>
            </tr>

            </tbody>
          </table>
    </div>



</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default{
    data(){
        return{
            usuarios:[],
            carregando:false,
            erro: null
        };
    },
    mounted(){
this.carregarUsuarios();
    },
    methods:{
        async carregarUsuarios()
        {
            this.carregando = true;
        
            try{
                const response = await axios.get("https://localhost:7263/api/v1/usuarios/listar-todos");
                setTimeout(() =>{
                    this.usuarios = response.data;
                   this.carregando = false;

                }, 2000)
         

            }catch(error){
                this.erro = "Ocorreu um erro ao listar os usuários";
                console.log(error);
                this.carregando =false;

            }

        },
        async excluir(id){
            const confirmacao = await Swal.fire({
                title: "Atenção",
                text: "Você deseja excluir este usuário",
                icon: "warning",
                showCancelButton: true,
                confirmeButtonText: "Sim, desejo excluir",
                cancelButtonText: "Não"
            });

            if(confirmacao.isConfirmed) {
                try{
                await axios.delete(`https://localhost:7263/api/v1/usuarios/remover/${id}`);
                Swal.fore("Excluido!", "o usuário foi removido com sucesso", "sucess");

                this.carregarUsuarios();
            }catch(error){
                Swal.fire("Atenção - Erro!", "Ocorreu um erro ao excluir o usuário", "error");
            }

            }
          
        }

    }
}
</script>