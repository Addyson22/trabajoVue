<template>
    <h1>Lista Tareas</h1>
    <div>
        <input type="text" v-model="tarea">
        <button @click="agregarTarea">añadir</button>
        <p>Estadisticas, Numero total de tareas {{ tareas.length }}</p>
        <ul>
            <li v-for="(tarea, index) in tareas" :key="index" class="flex">
                <input type="checkbox" @change="marcarCompleta(index)">
                <p :class="claseCompletada(index)">{{ tarea.text + ", creada:" + tarea.fechaInicio + (tarea.completa
                    ?
                    ", finalizada: " + tarea.fechaFin : "") }}</p>
                <button @click="eliminarTarea(index)">eliminar</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "ListaTareas",
    data() {
        return {
            tareas: [],
            tarea: ""
        }
    },
    methods: {
        agregarTarea() {
            this.tareas.push({
                text: this.tarea,
                completa: false,
                fechaInicio: new Date().toLocaleString(),
                fechaFin: ""
            })
            this.tarea = ""
        },
        eliminarTarea(index) {
            this.tareas.splice(index, 1)
        },
        marcarCompleta(index) {
            this.tareas[index].completa = this.tareas[index].completa ? false : true
            this.tareas[index].fechaFin = this.tareas[index].completa ? new Date().toLocaleString() : ""
        },
        claseCompletada(index) {
            return this.tareas[index].completa ? "completada" : "";
        }
    }
}
</script>

<style scoped>
.completada {
    color: red;
}

.flex {
    display: flex;
    align-content: center;
}
</style>