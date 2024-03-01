<template>
    <div>
        <NavBar />
    </div>
    <div>
        <h1 class="text-center">Pagina proyecto del {{ alumno_a }}</h1>
    </div>
    <div class="row justify-content-center">
        <div class="text-center">
            <button class="btn btn-primary btn-lg m-2" @click="navegarA('/clientes')">Gestión <br>Clientes</button>
            <button class="btn btn-primary btn-lg m-2" @click="navegarA('/articulos')">Gestión <br> Artículos</button>
        </div><br>
        <div class="text-center">
            <button class="btn btn-primary btn-lg m-2" @click="navegarA('/ventas')">Gestión <br> Ventas</button>
            <button class="btn btn-primary btn-lg m-2 center-text" id="contacto" @click="navegarA('/contacto')"><br>Contacto</button>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
    name: 'PaginaInicio',
    components: {
        NavBar
    },
    data() {
        return {
            alumno_a: 'Adrian Casais'
        }
    },
    methods: {
        navegarA(ruta) {
            // Utiliza el router para navegar a la ruta especificada
            this.$router.push(ruta);
        }
    },
    mounted() {
        console.log('Componente PaginaInicio.vue cargado');
    }
}
</script>

<style>

</style>