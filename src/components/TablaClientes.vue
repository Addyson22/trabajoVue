<template>
    <div>
        <!--barra de navegacion-->
        <navBar />
    </div>
    <br />
    <div class="row">
        <h3 class="text-center font-weight-bold">Gestión Clientes</h3>
    </div>
    <hr /> <!--formulario-->
    <div class="container-fluid">
        <div class="row" id="map_section">
            <div class="col-12 col-m-6 col-lg-8 mx-auto">
                <form class="form-inline">
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">DNI/NIE:</span>
                        <input v-model="dni" type="text" class="form-control form-control-sm" id="dni" name="dni"
                            @blur="validarDniNie">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Nombre:</span>
                        <input v-model="nombre" type="text" class="form-control" id="nombre" name="nombre">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Apellidos:</span>
                        <input v-model="apellido" type="text" class="form-control" id="apellido" name="apellido">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Email:</span>
                        <input v-model="email" type="text" class="form-control" id="email" name="email">
                    </div>
                    <!--Botones-->
                    <div class="text-center">
                        <button type="button" class="btn btn-primary m-2" @click="mostrarConfirmacionEliminar">Guardar</button>
                        <button type="button" class="btn btn-secondary" @click="limpiar()">Limpiar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <h2 class="text-primary text-center">Listado de Clientes</h2>
    <div id="listadoClientes" class="mx-3">
        <table class=" container table table-primary">
            <thead>
                <tr>
                    <th>DNI</th>
                    <th>Apellido</th>
                    <th>Nombre</th>
                    <th>E-mail</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="cliente in clientes" :key="cliente.id" class="table-success">
                    <td>{{ cliente.dni }}</td>
                    <td>{{ cliente.apellido }}</td>
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.email }}</td>
                    <td>
                        <button class="btn btn-danger" @click="modificarCliente(cliente.id)"><i class="bi bi-trash"></i></button>
                        <span style="margin-left: 8px;"></span>
                        <button class="btn btn-primary ml-2"><i class="bi bi-pencil"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import NavBar from '@/components/NavBar.vue';
import Swal from 'sweetalert2';
export default {
    name: 'TablaClientes',
    components: {
        NavBar,
    },
    data() {
        return {
            clientes: [],
            clientesSeleccionado: null,
            dni: '',
            nombre: '',
            apellido: '',
            email: '',
        }
    },
    mounted() {
        this.obtenerClientes();
    },
    methods: {
        async obtenerClientes() {
            try {
                //Ahora hacemos una solicitud direcamente al servidor JSON
                const response = await fetch('http://localhost:3000/clientes'); //Cambia el puerto si es diferente

                if (!response.ok) {
                    throw new Error('No se pudieron obtener los datos del servidor.');
                }

                //Asignamos los clientes a la variable del componente
                this.clientes = await response.json();
            } catch (error) {
                console.error('Error al obtener los clientes: ', error);
                //Puedes agregar manejo de errores aqui, por ejemplo, mostrar un mensaje al usuario
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron obtener los datos del servidor.',
                });
            }
        },
    },

    //funcion para eliminar el cliente
    async eliminarCliente(clienteId) {
        //mostrar ventana de confirmacion
        const confirmacion = await this.mostrarConfirmacionEliminar();

        //verificar si se confirmó la eliminacion
        if (confirmacion) {
            //Realizar la logica de eliminacion
            const index = this.clientes.findIndex(cliente => cliente.id === clienteId);

            if (index !== -1) {
                //this.clientes.splice(index, 1);
                await fetch(`http://localhost:3000/clientes/${clienteId}`)
                //Mostrar alerta de exito
                this.mostrarAlerta('Cliente eliminado correctamente', 'success')
            } else {
                //Mostrar alerta de error si el cliente no existe
                this.mostrarAlerta('Cliente no encontrado', 'error')
            }
        }
    },

    //alta un usuario cliente
    async postUsuario(usuario) {
        try {
            const response = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                body: JSON.stringify(usuario),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            });

            const usuarioCreado = await response.json();
            this.usuarios = [...this.usuarios, usuarioCreado];
        } catch (error) {
            console.error(error);
        }
    },

    async guardarCliente() {
        try {
            const validacionDniNie = this.validarDnieNie(); //Validar DNI/NIE

            if (validacionDniNie) { //Crear el cliente con los datos del forulario
                const cliente = {
                    dni: this.dni.trim().toUpperCase(),
                    nombre: this.nombre.trim(),
                    apellido: this.apellido.trim(),
                    email: this.email.trim(),
                };

                let url = 'http://localhost:3000/clientes';
                let metodo = 'POST';

                //Si hay un cliente seleccionado, es una actualización (PUT)
                if (this.clienteSeleccionado) {
                    url += `/${this.clienteSeleccionado.id}`;
                    metodo = 'PUT';
                }

                //Realizar la solicitud al servidor JSON
                const response = await fetch(url, {
                    method: metodo,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cliente),
                });

                if (!response.ok) {
                    throw new Error('Error al guardar el cliente en el servidor.')
                }

                //Limpiar el formulario y obtener la lista actualizada de clientes
                this.limpiar();
                this.obtenerClientes();
                //Mostrar mensaje de éxito
                const mensaje = this.clienteSeleccionado ? 'Cliente modificado correctamente.' : 'Cliente guardado correctamente.';
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: mensaje,
                });
            } else {
                //Mostrar alerta de validacion
                this.mostrarAlerta('DNI o NIE no válido', 'error')
            }
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

    validarDniNie() {
        const dniNie = this.dni.trim().toUpperCase(); // Convierte a mayúsculas para simplificar la validación
        // Expresión regular para validar DNI y NIE
        const regexDniNie = /^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;

        if (!regexDniNie.test(dniNie)) {
            this.mostrarAlerta('DNI o NIE no válido', 'error');
            return false;
        }

        //Validar el digito de control
        const valor = dniNie.replace(/[XYZ]/, (letra) => {
            return letra === 'X' ? '0' : (letra === 'Y' ? '1' : (letra === 'Z' ? '2' : letra));
        });

        const numero = parseInt(valor.slice(0, 9), 10);
        let letraCalculada = 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(numero % 23);

        if (letraCalculada !== dniNie.charAt(8)) {
            this.mostrarAlerta('DNI o NIE no válido', 'error');
            this.dni = ''; //Limpiar el campo si el DNI o NIE no es válido
        }

        //Devolver true si la validación es exitosa
        return true;
    },

    //función para modificar el cliente que llama a la función limpiar y guardarCliente
    modificarCliente(clienteId) {
        const cliente = this.clientes.find(cliente => cliente.id === clienteId);

        if (cliente) {
            this.clienteSeleccionado = cliente; //Asegurate de actualiar clienteSeleccionado
            this.dni = cliente.dni;
            this.nombre = cliente.nombre;
            this.apellido = cliente.apellido;
            this.email = cliente.email;
            this.mostrarAlerta('Datos del cliente listos para modificar', 'info');
        } else {
            this.mostrarAlerta('Cliente no encontrado', 'error');
        }
    },

    //funcion Limpiar campos del formulario
    limpiar() {
        //Logica para limpiar los campos del formulario
        this.nombre = '';
        this.apellido = '';
        this.dni = '';
        this.email = '';
    },

    async mostrarConfirmacionEliminar() {
        // Mostrar ventana de confirmación
        const confirmacion = await Swal.fire({
            title: '¿Estás seguro de que deseas eliminar este cliente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
                container: 'custom-alert-container',
                popup: 'custom-alert',
                confirmButton: 'custom-alert-button',
                cancelButton: 'custom-alert-button',
            },
        });

        return confirmacion.isConfirmed;
    },

}


</script>
  
<style></style>
  