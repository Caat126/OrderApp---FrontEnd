<template>

    <MenuComponent />

    <!-- contenido -->
    <div class="container">
        <div class="row justify-content-center mt-3">
            <div v-for="negocio in negocios" :key="negocio" class="col-md-4 col-12">
                <div @click="verProductos(negocio.id)" class="card text-white shadow mb-2">
                    <img :src="negocio.imagen" class="card-img" alt="...">
                    <div class="card-img-overlay text-center">
                        <h5 class="card-title mt-5">{{negocio.nombre}}</h5>
                        <p class="card-text">{{negocio.descripcion}}</p>
                    </div>
                </div>
            </div>
            <div class="col-12 text-center m-5">
                <button @click="cargarMas" class="btn btn-light">Cargas Más</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import MenuComponent from '@/components/MenuComponent.vue'

import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

let urlBase = 'http://pedidoshamilo.test/api';

const negocios = ref([]);
const siguienteUrl = ref(null);
const router = useRouter();
const token = ref('');

onMounted(() => {
    cargarDatos();
    token.value = localStorage.getItem('token');
    if(token.value == null || token.value == '' || token.value == undefined){
        router.push({path: '/'});
    }
});

const cargarDatos = async () => {
    try {
        const {data} = await axios.get(urlBase + '/negocios');
        negocios.value = data.data;
        siguienteUrl.value = data.next_page_url;
    } catch (error) {
        console.log(error)
    }
}

const cargarMas = async () => {
    if(siguienteUrl.value == null || siguienteUrl.value == ''){
        alert('No hay mas negocios');
        return
    }
    try {
        const {data} = await axios.get(siguienteUrl.value);
        negocios.value.push(...data.data);
        siguienteUrl.value = data.next_page_url;
    } catch (error) {
        console.log(error)
    }
}

const verProductos = (negocio_id) => {
    router.push({path: '/productos/' + negocio_id})
}


</script>

<style scoped>
.card-img-overlay {
    background-color: rgba(0, 0, 0, 0.4);
}

img {
    height: 200px;
    object-fit: cover;
    width: 100%;
}
</style>