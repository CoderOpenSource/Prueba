import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateSubcategoria() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch categorias for dropdown selection
    axios.get('http://137.184.190.92/productos/categorias/')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(err => {
        console.error("Error fetching categorias:", err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      nombre: nombre,
      categoria: selectedCategoria  // Using the category ID for the foreign key
    };

    axios.post(`http://137.184.190.92/productos/subcategorias/`, formData)
      .then(response => {
          navigate(`/dashboard/productos/subcategorias`);
      })
      .catch(err => {
          console.error("Error al crear la nueva subcategoría:", err);
          setError("Hubo un error al crear la subcategoría. Por favor intenta nuevamente.");
      });
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Crear Nueva Subcategoría</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Categoría:</label>
            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(Number(e.target.value))}
              style={styles.whiteInput}
            >
              <option value="" disabled>Selecciona una categoría</option>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre de Subcategoría:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={styles.whiteInput}
            />
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
    width: '500px',
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
  whiteInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '16px',
  },
  uploadButton: {
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: '7px',
    cursor: 'pointer',
    background: '#002855',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    textAlign: 'center',
    marginTop: '5px',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
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
  imagesPreview: {
    marginTop: '10px',
    display: 'flex',
    flexWrap: 'wrap'
  },
  imagePreview: {
    width: '60px',
    height: '60px',
    borderRadius: '5px',
    margin: '5px',
    objectFit: 'cover'
  }
};
export default CreateSubcategoria;
