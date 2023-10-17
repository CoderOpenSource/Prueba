import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateCategoria() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      nombre: nombre
    };

    axios.post(`http://192.168.67.85/productos/categorias/`, formData)
      .then(response => {
          navigate(`/dashboard/productos/categorias`);
      })
      .catch(err => {
          console.error("Error al crear la nueva categoría:", err);
          setError("Hubo un error al crear la categoría. Por favor intenta nuevamente.");
      });
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Crear Nueva Categoría</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre:</label>
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

export default CreateCategoria;
