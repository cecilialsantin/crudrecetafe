import React, { useState, useEffect, useRef } from 'react';
import Logout from './auth/Logout';
import { useAuth } from './auth/authContext';
import axios from 'axios';
import configurl from '../configurl';

function FormularioReceta() {
  const { user } = useAuth();
  const formRef = useRef(null); // Crear una referencia para el formulario

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ingredientes, setIngredientes] = useState([{ ingrediente: '', cantidad: '' }]);
  const [recetas, setRecetas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idRecetaEditando, setIdRecetaEditando] = useState(null);

  useEffect(() => {
    fetchRecetas();
  }, []);

  const fetchRecetas = async () => {
    try {
      const response = await axios.get(`${configurl.apiUrl}/recetas`);
      setRecetas(response.data);
      console.log('Recetas obtenidas:', response.data);
    } catch (error) {
      console.error('Error fetching recetas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nombre, descripcion, ingredientes };
    if (editando) {
      try {
        await axios.put(`${configurl.apiUrl}/recetas/${idRecetaEditando}`, data);
        setEditando(false);
        setIdRecetaEditando(null);
      } catch (error) {
        console.error('Error updating receta:', error);
      }
    } else {
      try {
        await axios.post(`${configurl.apiUrl}/recetas`, data);
      } catch (error) {
        console.error('Error creating receta:', error);
      }
    }
    setNombre('');
    setDescripcion('');
    setIngredientes([{ ingrediente: '', cantidad: '' }]);
    fetchRecetas();
  };

  const handleAddIngrediente = () => {
    setIngredientes([...ingredientes, { ingrediente: '', cantidad: '' }]);
  };

  const handleIngredienteChange = (index, field, value) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index][field] = value;
    setIngredientes(newIngredientes);
  };

  const handleEdit = (receta) => {
    setNombre(receta.nombre);
    setDescripcion(receta.descripcion);
    setIngredientes(receta.ingredientes || [{ ingrediente: '', cantidad: '' }]);
    setEditando(true);
    setIdRecetaEditando(receta.id);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' }); // Desplazarse al formulario
      }
    }, 0);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${configurl.apiUrl}/recetas/${id}`);
      fetchRecetas();
    } catch (error) {
      console.error('Error deleting receta:', error);
    }
  };

  return (
    <div className="container">

      <div className="text-center my-4 bg-pink p-3 border border-3 rounded border-info">
        <h1 className="p-1 text-grey">
          <img 
            src="./logo.png" 
            alt="Logo de Recetas" 
            style={{ width: '80px', margin: '10px', borderRadius: '50%' }} 
          />
          G20_C24255 - Carga de recetas
        </h1>
        <div className="container text-center p-2 d-inline-block mx-auto">
        {user ? (
          <>
            <h5>Bienvenido, {user.username}</h5>
            <Logout />
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      </div>
     

      <form ref={formRef} onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label text-info">Nombre de la receta</label>
          <input
            type="text"
            className="form-control border border-info"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la receta"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-info">Descripción</label>
          <textarea
            className="form-control border border-info"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label text-success">Ingredientes</label>
          {ingredientes.map((ingrediente, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="text"
                className="form-control border border-success"
                value={ingrediente.ingrediente}
                onChange={(e) => handleIngredienteChange(index, 'ingrediente', e.target.value)}
                placeholder="Ingrediente"
                required
              />
              <input
                type="number"
                className="form-control border border-success"
                value={ingrediente.cantidad}
                onChange={(e) => handleIngredienteChange(index, 'cantidad', e.target.value)}
                placeholder="Cantidad (gramos)"
                required
              />
            </div>
          ))}
          <button type="button" className="btn btn-success" onClick={handleAddIngrediente}>+</button>
        </div>
        <button type="submit" className="btn btn-info">{editando ? 'Actualizar receta' : 'Guardar receta'}</button>
      </form>

      <h2 className="mt-5 p-1 text-center text-info bg-light border border-3 rounded border-info">Listado de Recetas</h2>
      <div className="row">
        {recetas.map((receta) => (
          <div key={receta.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{receta.nombre}</h5>
                <p className="card-text">{receta.descripcion}</p>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Ingrediente</th>
                      <th scope="col">Cantidad (gramos)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(receta.ingredientes || []).map((ingrediente) => (
                      <tr key={ingrediente.id}>
                        <td>{ingrediente.ingrediente}</td>
                        <td>{ingrediente.cantidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(receta)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(receta.id)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormularioReceta;
