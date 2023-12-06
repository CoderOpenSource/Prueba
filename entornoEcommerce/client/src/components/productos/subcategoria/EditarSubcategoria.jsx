import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditarSubcategoria() {
  const { id } = useParams();
  const [subcategoria, setSubcategoria] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching the subcategory data
    axios.get(`http://165.227.68.145/productos/subcategorias/${id}/`)
      .then(response => {
        setSubcategoria(response.data);
      })
      .catch(error => {
        console.error("Error al obtener los datos de la subcategoria:", error);
      });

    // Fetching the categories data
    axios.get('http://165.227.68.145/productos/categorias/')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error("Error al obtener los datos de las categorias:", error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://165.227.68.145/productos/subcategorias/${id}/`, subcategoria)
      .then(response => {
        navigate(`/dashboard/productos/subcategorias/`);
      })
      .catch(error => {
        console.error("Error al actualizar los datos de la subcategoria:", error);
        alert("Hubo un error al actualizar. Por favor intenta nuevamente.");
      });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubcategoria(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  if (!subcategoria || categorias.length === 0) return <p>Cargando...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Editar Subcategoría</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre:</label>
            <input type="text" name="nombre" value={subcategoria.nombre} onChange={handleInputChange} style={styles.whiteInput} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Categoría:</label>
            <select
                name="categoria"
                value={subcategoria.categoria.id}
                onChange={handleInputChange}
                style={styles.whiteInput}>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.saveButton} type="submit">
            💾 Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh',
    paddingTop: '50px'
  },
  card: {
    padding: '30px',
    borderRadius: '15px',
    backgroundColor: '#002855',
    color: 'white',
    width: '400px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    fontSize: '18px',
    marginBottom: '5px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  saveButton: {
    marginTop: '25px',
    backgroundColor: 'white',
    color: '#002855',
    border: 'none',
    borderRadius: '7px',
    cursor: 'pointer',
    padding: '8px 16px',
    fontSize: '18px',
  },
  whiteInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '16px',
  },
};

export default EditarSubcategoria;
