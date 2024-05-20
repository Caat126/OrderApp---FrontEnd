<template>

    <div class="container">

        <div class="text-center my-2 py-2">
            <img src="/login.png" alt="" class="rounded image">
        </div>

        <div class="row justify-content-center">
            <div class="col-md-6 col-12">
                <div class="text-center">
                    <h3>Hamilo Pedidos</h3>
                    <p>Verificar</p>
                </div>

                <div style="display: flex; flex-direction: row; justify-content: center">
                    <v-otp-input
                        ref="otpInput"
                        input-classes="otp-input"
                        :conditionalClass="['one', 'two', 'three', 'four']"
                        separator=""
                        inputType="letter-numeric"
                        :num-inputs="6"
                        v-model:value="otp"
                        :should-auto-focus="true"
                        :should-focus-order="true"
                        @on-complete="completado()"
                        :placeholder="['*', '*', '*', '*', '*', '*']"
                    />
                </div>

                <div class="row justify-content-center mt-3">
                    <div class="col-6 p-1">
                        <button @click="verificar()" class="btn btn-danger btn-block">Verificar</button>
                    </div>
                </div>

                <div class="text-center mt-5">
                    <p>No tienes una cuenta? <RouterLink to="/register" class="btn btn-link">Registrate</RouterLink>
                    </p>
                </div>
            </div>
        </div>



    </div>

</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import VOtpInput from "vue3-otp-input";
import { onMounted, ref } from "vue";
import InstanceType from 'vue3-otp-input'
import axios from "axios";

const otpInput = ref < InstanceType < typeof VOtpInput > null > (null);

let urlBase = 'http://pedidoshamilo.test/api';
const router = useRouter();

const otp = ref('');
const token = ref('');

onMounted(() => {
    token.value = localStorage.getItem('token');
    if(token.value == null || token.value == '' || token.value == undefined){
        router.push({path: '/register'});
    }
})

const completado = () => {
    console.log(otp.value)
}

const verificar = async () => {
    if(otp.value == ''){
        alert('Ingresa el codigo de verificación')
        return;
    }
    token.value = localStorage.getItem('token');
    
    try {
        const {data} = await axios.post(urlBase + '/verificar', {otp: otp.value},{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + token.value,
            }
        });
        // console.log(data)
        let usuario = data.usuario;
        localStorage.setItem('usuario', JSON.stringify(usuario));
        if(usuario.verificado == true){
            router.push({path: '/inicio'});
        }
    } catch (error) {
        console.log(error)
    }
}

</script>

<style scoped>
.image {
    height: auto;
    width: 100%;
}

@media (min-width: 1024px) {
    .image {
        height: 30%;
        width: 30%;
    }
}

.btn-block {
    width: 100%;
}
</style>

<style>
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 5px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  text-align: center;
}/* Background colour of an input field with value */.otp-input.is-complete {
  background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>