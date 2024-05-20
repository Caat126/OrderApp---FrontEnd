<template>

    <div class="container">
        <div class="text-center">
            <h3>Hamilo Pedidos</h3>
        <p>Bienvenido, realiza tus pedidos con nosotros</p>
        </div>

        <div class="align-middle text-center my-5 py-5">
        <img src="/Principal.jpg" alt="" class="rounded image">
        </div>

        <div class="row justify-content-center">
            <div class="col-md-4 col-6 p-1">
                <RouterLink to="/login" class="btn btn-danger btn-block">Iniciar Sesion</RouterLink>
            </div>
            <div class="col-md-4 col-6 p-1">
                <RouterLink to="/register" class="btn btn-light btn-block">Registrarse</RouterLink>
            </div>
        </div>

        <div class="text-center mt-5">
            <p>Al continuar aceptas nuestros <RouterLink to="/terminos" class="btn btn-link">Terminos y Condiciones</RouterLink></p>
        </div>

    </div>

</template>

<script setup>
    import { onMounted } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';

    const router = useRouter();

    onMounted(() => {
        token = localStorage.getItem('token');
        usuario = JSON.parse(localStorage.getItem('usuario'));

        if(token == null || token == '' || token == undefined
        || usuario == null || usuario == '' || usuario == undefined
        ){
            localStorage.clear(); // borrar todo el local storage
        } else {
            router.push({path: '/inicio'});
        }
    })

</script>

<style scoped>
    .image{
        height: auto;
        width: 100%;
    }

    @media (min-width: 1024px) {
    .image{
        height: auto;
        width: 50%;
    }
    }
    
    .btn-block{
        width: 100%;
    }
</style>