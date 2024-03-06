import express from 'express';
const rutas = express.Router();
import multer from 'multer';

import tarea from '../models/tarea.mjs';

rutas.use(express.json());
const upload = multer({ dest: 'uploads/' });

//otra forma de crear rutas
rutas.get('/', async(req, res) => {
    const tareas = await tarea.find();
    res.json(tareas)
});

rutas.post('/', upload.single('archivo'), async(req, res) => {
    try {
        //Verificar si hay un archivo adjunto
        if (req.file) {
            console.log('Archivo recibido: ', req.file); //Registrar informacion sobre el archivo recibido
        } else {
            console.log('No se recibio ningun archivo.');
        }
        
      const nuevatarea = new tarea(req.body);
      
      await nuevatarea.save();
          console.log(nuevatarea);
          res.json({
          status: 'Tarea guardada'
        
        });
    } catch (error) {
    console.error('Error al guardar la tarea:', error);
    res.status(500).json({
        error: 'Error al guardar la tarea'
    });
  } 
  });

rutas.put('/:id', async(req, res) => {
    try {
        await tarea.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            status: 'Tarea actualizada'
        });
    } catch (error) {
        console.error('Error al actualizar la tarea', error);
        res.status(500).json({
            error: 'Error al actualizar la tarea'
        });
    }
});

rutas.delete('/:id', async(req, res) => {
    try {
        await tarea.findByIdAndDelete(req.params.id);
        res.json({
            status: 'Tarea eliminada'
        });
    } catch (error) {
        console.error('Error al eliminar la tarea', error);
        res.status(500).json({
            error: 'Error al eliminar la tarea'
        });
    }
});

export default rutas;