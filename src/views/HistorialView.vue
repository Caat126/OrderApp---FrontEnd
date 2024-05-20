<template>

    <MenuComponent />

    <div class="container">
        <h2 class="text-center mt-3">Historial</h2>

        <div class="row justify-content-center">
            <div v-for="item in historial" :key="item" class="col-12 col-md-7 m-1">
                <div class="card">
                    <div class="card-body text-sm">
                        <p>
                            <b>Monto Total: </b> {{ item.total }} <br>           
                            <b>Negocio: </b> {{ item.negocio.nombre }} <br>
                            <b>Comentario: </b> {{ item.comentario }} <br>
                            <b>Fecha: </b> {{ item.fecha }} <br>
                            <b>Estado: {{ item.estado }}</b> <br>            
                        </p>
                        <div>
                            <table width="100%" class="border-light">
                                <tr class="bg-light">
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                </tr>
                                <tr v-for="detalle in item.detalles" :key="detalle">
                                    <td>{{  detalle.producto.nombre }}</td>
                                    <td>{{  detalle.cantidad }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import MenuComponent from '@/components/MenuComponent.vue';
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';

const historial = ref([]);

const token = ref('');
const usuario = ref({});
let urlBase = 'http://pedidoshamilo.test/api';
const router = useRouter();

onMounted(() => {
    token.value = localStorage.getItem('token');
    usuario.value = JSON.parse(localStorage.getItem('usuario'));

    if(token.value == null || token.value == '' || token.value == undefined
    || usuario.value == null || usuario.value == '' || usuario.value == undefined
    ){
        router.push({path: '/'});
    }
    cargarDatos();
});

    const cargarDatos = async () => {
        try {
            const {data} = await axios.get(urlBase + '/pedidos/historial/' + usuario.value.id);
            historial.value = data.datos;
        } catch (error) {
            console.log(error)
        }
    }

</script>

<style scoped>

</style>