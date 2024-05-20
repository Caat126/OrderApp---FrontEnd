<template>

    <div class="container">

        <div class="text-center my-2 py-2">
        <img src="/login.png" alt="" class="rounded image">
        </div>

        <div class="row justify-content-center">
            <div class="col-md-6 col-12">
                <div class="text-center">
                    <h3>Hamilo Pedidos</h3>
                    <p>Iniciar Sesión</p>
                </div>

                <div class="form-group">
                    <label for="email">Email ó Teléfono</label>
                    <input v-model="email" type="text" class="form-control" >
                    <small class="text-muted">(Para teléfono , agregue el código del país)</small>
                </div>

                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input v-model="password" type="password" class="form-control">
                </div>

                <div class="row justify-content-center mt-3">
                    <div class="col-6 p-1">
                        <button @click="ingresar()" class="btn btn-danger btn-block">Iniciar Sesión</button>
                    </div>
                </div>

                <div class="text-center mt-5">
                    <p>No tienes una cuenta? <RouterLink to="/register" class="btn btn-link">Registrate</RouterLink></p>
                </div>
            </div>
        </div>

        

    </div>

</template>

<script setup>
    import { RouterLink, useRouter } from "vue-router";
    import axios from "axios";
    import { ref } from "vue";

    const email = ref('');
    const password = ref('');
    const router = useRouter();

    let urlBase = 'http://pedidoshamilo.test/api';

    const ingresar = async () => {
        if(email.value == '' || password.value == ''){
            alert ('Ingrese sus credenciales');
            return;
        }

        try {
            const {data} = await axios.post(urlBase + '/login', {
                                email: email.value,
                                password: password.value
                            },{
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                },
                            });

        let usuario = data.usuario;
        let token = data.token;

        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('token', token);
        router.push({path: '/inicio'});

        } catch (error) {
            console.log(error)
        }
    }
    

</script>

<style scoped>
    .image{
        height: auto;
        width: 100%;
    }
    @media (min-width: 1024px) {
    .image{
        height: 30%;
        width: 30%;
    }
    }
    .btn-block{
        width: 100%;
    }
</style>