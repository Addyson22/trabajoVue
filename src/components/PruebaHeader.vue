<template>
    <div>
        <!--barra de navegacion-->
        <navBar />
    </div>
    <br />
    <div class="row">
        <h3 class="text-center font-weight-bold">Gestión Tareas</h3>
    </div>
    <hr /> <!--formulario-->
    <div class="container-fluid">
        <div class="row" id="map_section">
            <div class="col-12 col-m-6 col-lg-8 mx-auto">
                <form class="form-inline">
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Nombre:</span>
                        <input v-model="nombre" type="text" class="form-control form-control-sm" id="nombre" name="nombre">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Descripcion:</span>
                        <input v-model="descripcion" type="text" class="form-control" id="descripcion" name="descripcion">
                    </div>
                    <!--Calendario para cargar fecha-->
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Fecha:</span>
                        <input ref="fechaAlta" v-model="fecha" type="text" class="form-control"
                            placeholder="Seleccionar fecha">
                        <button @click="abrirCalendario" class="btn btn-outline-secondary" type="button">
                            <i class="bi bi-calendar"></i>
                        </button>
                    </div>
                    <!--select para seleccionar sala-->
                    <div class="input-group mb-3 w-25">
                        <label class="input-group-text custom-span" for="salaSelect">Sala:</label>
                        <select class="form-select" v-model="sala" id="salaSelect">
                            <option value="" disabled selected>Sala de Reunión</option>
                            <option value="Sala 1">Sala 1</option>
                            <option value="Sala 2">Sala 2</option>
                            <option value="Sala 3">Sala 3</option>
                        </select>
                    </div>
                    <!--Checkbox para equipos adicionales-->
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span" style="margin-right: 20px;">Equipamiento:</span>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="equipoVideoconferencia" v-model="equipos"
                                value="Equipo Videoconferencia">
                            <label class="form-check-label" for="equipoVideoconferencia">Equipo Videoconferencia</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="televisor" v-model="equipos"
                                value="Televisor">
                            <label class="form-check-label" for="televisor">Televisor</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="pizarraDigital" v-model="equipos"
                                value="Pizarra Digital">
                            <label class="form-check-label" for="equipoVideoconferencia">Pizarra Digital</label>
                        </div>
                    </div>
                    <!--radio button-->
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span" style="margin-right: 10px;">Prioridad:</span>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="prioridadAlta" value="alta"
                                v-model="prioridad">
                            <label class="form-check-label" for="prioridadAlta">Alta</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="prioridadMedia" value="media"
                                v-model="prioridad">
                            <label class="form-check-label" for="prioridadMedia">Media</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="prioridadBaja" value="baja"
                                v-model="prioridad">
                            <label class="form-check-label" for="prioridadBaja">Baja</label>
                        </div>
                    </div>
                    <!--Cambiar el input por un textarea-->
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Observaciones:</span>
                        <textarea v-model="observaciones" class="form-control" id="descripcion" name="descripcion"
                            placeholder="Descripcion Tarea (max256 caracteres)" maxlength="256"></textarea>
                    </div>
                    <!--Botones-->
                    <div class="text-center">
                        <button type="button" class="btn btn-primary m-2" @click="guardarTarea">Guardar</button>
                        <button type="button" class="btn btn-secondary" @click="modificarTarea">Modificar</button>
                        <button type="button" class="btn btn-secondary" @click="limpiarTarea">Limpiar</button>
                    </div>
                    <!--input para el archivo-->
                    <div class="custom-file">
                        <div class="input-group mb-3 w-50">
                            <input type="file" placeholder="Selecciona un archivo" class="custom-file-input" id="archivo"
                                name="archivo" accept=".pdf, .jpg, .jpeg" @change="handleFileChange" ref="fileInput">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!--tabla de datos el resto seria igual que antes-->
    <div class="row justify-content-center mt-4">
        <div class="col-md-8 bg-light">
            <div class="row justify-content-center text-primary p-2">
                <h5 class="text-center font-weight-bold">Listado Tareas</h5>
            </div>
            <div class="table-responsive">
                <table class="table table-stripped table-bordered">
                    <thead class="table-info">
                        <tr class="text-center">
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Fecha Alta</th>
                            <th>Sala Reunion</th>
                            <th>Equipamiento</th>
                            <th>Prioridad</th>
                            <th>Gestion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tarea in tareas" :key="tarea._id">
                            <td class="text-center">{{ tarea._id }}</td>
                            <td>{{ tarea.nombre }}</td>
                            <td>{{ tarea.descripcion }}</td>
                            <td class="text-center">{{ tarea.fecha }}</td>
                            <td class="text-center">{{ tarea.sala }}</td>
                            <td class="text">{{ tarea.equipos ? tarea.equipos.join(', ') : '' }}</td>
                            <td class="text-center">{{ tarea.prioridad }}</td>
                            <td class="text-center">
                                <div>
                                    <button class="btn btn-warning m-2" @click="modificarTarea(tarea.id)">
                                        <i class="bi bi-pencil"></i></button>
                                    <span style="margin-left: 8px;"></span>
                                    <button class="btn btn-danger m-2" @click="eliminarTarea(tarea.id)">
                                        <i class="bi bi-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2';
import NavBar from './NavBar.vue';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
//import Swal from 'sweetalert2';
export default {
    name: 'TablaTareas',
    components: {
        NavBar,
    },
    data() {
        return {
            nombre: '',
            descripcion: '',
            fecha: '',
            sala: '',
            equipos: [], //array para equipos pueden ser varios
            prioridad: 'alta',
            tareas: [],
            observaciones: '',
            show: false
        };
    },

    created() {
        this.obtenerTareas();
    },

    mounted() {
        const fechaAlta = this.$refs.fechaAlta;
        flatpickr(fechaAlta, {

        });
    },
    methods: {
        async obtenerTareas() {
            try {
                const res = await fetch('http://localhost:5000/tareas');
                if (!res.ok) {
                    const message = `An error has occurred: ${res.status}`;
                    throw new Error(message);
                }
                this.tareas = await res.json();
                console.log(this.tareas);
            } catch (error) {
                console.error(error);
            }
        },

        cargarTarea(tarea) {
            this.nombre = tarea.nombre;
            this.descripcion = tarea.descripcion;
            this.fecha = tarea.fecha;
            this.sala = tarea.sala;
            this.equipos = tarea.equipos;
            this.prioridad = tarea.prioridad;
            this.observaciones = tarea.observaciones
            this.tareaSeleccionada = tarea;
        },

        async modificarTarea() {
            try {
                // Obtener la tarea seleccionada
                const tarea = this.tareaSeleccionada;

                // Actualizar los campos de la tarea seleccionada con los nuevos valores del formulario
                tarea.nombre = this.nombre;
                tarea.descripcion = this.descripcion;
                tarea.fecha = this.fecha;
                tarea.sala = this.sala;
                tarea.equipos = this.equipos;
                tarea.prioridad = this.prioridad;
                tarea.observaciones = this.observaciones;

                // Enviar la solicitud PUT con la tarea actualizada al servidor
                const res = await fetch(`http://localhost:5000/tareas/${tarea._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tarea)
                });

                if (!res.ok) {
                    throw new Error(`An error has occurred: ${res.status}`);
                }

                // Actualizar la lista de tareas después de modificar la tarea
                await this.obtenerTareas();

                // Limpiar los campos del formulario después de modificar la tarea
                this.limpiarCampos();

                // Mostrar mensaje de éxito
                await Swal.fire({
                    icon: 'success',
                    title: 'Tarea modificada',
                    text: 'La tarea se ha modificado correctamente.'
                });

                // Limpiar la tarea seleccionada después de la modificación
                this.tareaSeleccionada = null;
            } catch (error) {
                console.error(error);
                // Mostrar mensaje de error
                await Swal.fire({
                    icon: 'error',
                    title: 'Error al modificar la tarea',
                    text: 'Ha ocurrido un error al intentar modificar la tarea. Por favor, inténtalo de nuevo.'
                });
            }
        },

        limpiarCampos() {
            //Limpiar los campos del formulario
            this.nombre = "";
            this.descripcion = "";
            this.fecha = "";
            this.sala = null;
            this.equipos = [];
            this.prioridad = "alta";
            this.observaciones = '';
            this.archivo = null;
            this.$refs.fileInput.value = null;

            //Mostrar mensaje de exito con SweetAlert
            Swal.fire({
                icon: 'info',
                title: 'Campos limpiados',
                text: 'Los campos del formuario se han limpiado correctamente'
            })
        },

        limpiarTarea() {
            this.nombre = "";
            this.descripcion = "";
            this.fecha = "";
            this.sala = null;
            this.equipos = [];
            this.prioridad = "alta";
            this.observaciones = '';
            this.$refs.fileInput.value = null;
        },

        async guardarTarea() {
            try {
                console.log(this.nombre, this.descripcion, this.fecha, this.sala, this.prioridad, this.equipos);
                //Crea un objeto FormData para enviar los datos de la tarea y el archivo al servidor
                const formData = new FormData();
                formData.append('nombre', this.nombre);
                formData.append('descripcion', this.descripcion);
                formData.append('fecha', this.fecha);
                formData.append('sala', this.sala);
                formData.append('nombre', this.nombre);
                this.equipos.forEach(equipo => {
                    formData.append('equipos', equipo);
                });
                formData.append('prioridad', this.prioridad);
                formData.append('observaciones', this.observaciones);
                formData.append('nombre', this.nombre);
                formData.append('archivo', this.archivo);

                //Verificar si la prioridad esta entre los valores permitidos
                if (['alta', 'media', 'baja'].includes(this.prioridad)) {
                    const res = await fetch('http://localhost:5000/tareas', {
                        method: 'POST',
                        /*
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(nuevaTarea)*/
                    });
                    await Swal.fire({
                        icon: 'success',
                        title: '¡Tarea guardada!',
                        text: 'La nueva tarea se ha guardado correctamente'
                    });
                    if (!res.ok) {
                        const message = `An error has occured: ${res.status}`;
                        throw new Error(message);
                    }

                    //Actualizar la lista de tareas despues de guardar la nueva tarea
                    await this.obtenerTareas();
                }
                //Limpiar los campos del formulario despues de guardar la tarea
                this.limpiarTarea();
            } catch (error) {
                console.error('Error al guardar el cliente: ', error);
                //Mostrar mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al guardar el cliente en el servidor.',
                });
            }
        },
        abrirCalendario() {
            const fechaAlta = this.$refs.fechaAlta;
            if (fechaAlta._flatpickr) {
                fechaAlta._flatpickr.open();
            }
        },

        handleFileChange(event) {
            this.archivo = event.target.files[0];
            console.log(this.archivo)
        }
    },
};
</script>
  
<style></style>
  