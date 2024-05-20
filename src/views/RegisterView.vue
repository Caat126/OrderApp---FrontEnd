<template>

    <div class="container">

        <div class="align-middle text-center my-2 py-2">
        <img src="/register.png" alt="" class="rounded image">
        </div>

        <div class="row justify-content-center">
            <div class="col-md-6 col-12">
                <div class="text-center">
                    <h3>Hamilo Pedidos</h3>
                    <p>Registrate</p>
                </div>

                <div class="form-group">
                    <label for="name">Nombre completo</label>
                    <input v-model="name" type="text" class="form-control" >
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input v-model="email" type="email" class="form-control" >
                </div>

                <div class="form-group">
                    <label for="telefono">Teléfono</label>
                    <input v-model="telefono" type="text" class="form-control" >
                </div>

                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input v-model="password" type="password" class="form-control">
                </div>

                <div class="form-group">
                    <label for="password_confirmation">Confirmar contraseña</label>
                    <input v-model="password_confirmation" type="password" class="form-control">
                </div>

                <div class="row justify-content-center mt-3">
                    <div class="col-6 p-1">
                        <button @click="registrar()" class="btn btn-danger btn-block">Registrate</button>
                    </div>
                </div>

                <div class="text-center mt-5">
                    <p>Ya tienes una cuenta? <RouterLink to="/login" class="btn btn-link">Iniciar Sesion</RouterLink></p>
                </div>
            </div>
        </div>


    </div>

</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";

let urlBase = 'http://pedidoshamilo.test/api';

const name = ref('');
const email = ref('');
const telefono = ref('');
const password = ref('');
const password_confirmation = ref('');

const router = useRouter();

const registrar = async () => {
    if(name.value == '' || email.value == '' || telefono.value == '' || password.value == '' || password_confirmation.value == ''){
        alert ('Todos los campos son obligatorios');
        return
    }

    try {
        const {data} = await axios.post(urlBase + '/register', {
                        name: name.value,
                        email: email.value,
                        telefono: telefono.value,
                        password: password.value,
                        password_confirmation: password_confirmation.value
                    },{
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    });
        let usuario = data.usuario;
        let token = data.token;

        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('token', token);

        router.push({path: '/verificar'})
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