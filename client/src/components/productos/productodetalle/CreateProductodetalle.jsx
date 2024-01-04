import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Autocomplete from './AutoComplete';

import Swal from 'sweetalert2';
function CreateProductoDetalle() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [colores, setColores] = useState([]);
  const [tamaños, setTamaños] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedTamaño, setSelectedTamaño] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [imagen2D, setImagen2D] = useState(null);
  const [estado, setEstado] = useState('disponible');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch productos, colores, y tamaños for dropdown selection
    axios.all([
      axios.get('http://137.184.190.92/productos/productos/'),
      axios.get('http://137.184.190.92/productos/colores/'),
      axios.get('http://137.184.190.92/productos/tamaños/')
    ]).then(axios.spread((productosData, coloresData, tamañosData) => {
      setProductos(productosData.data);
      setColores(coloresData.data);
      setTamaños(tamañosData.data);
    })).catch(err => {
      console.error("Error fetching data:", err);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedProducto);
    console.log(selectedColor);
    console.log('tamaño id: ',selectedTamaño);
    const formData = new FormData();
    formData.append('producto_id', selectedProducto);
    formData.append('color_id', selectedColor);
    formData.append('tamaño_id', selectedTamaño);
    formData.append('cantidad', cantidad);
    formData.append('imagen2D', imagen2D);
    formData.append('estado', estado);

    axios.post(`http://137.184.190.92/productos/productosdetalle/`, formData)
      .then(response => {
        Swal.fire({
          title: 'Éxito!',
          text: 'Producto Detalle creado con éxito.',
          icon: 'success',
          timer: 3000
        });
          navigate(`/dashboard/productos/productosdetalle/`);
      })
      .catch(err => {
          console.error("Error al crear el nuevo detalle de producto:", err);
          setError("Hubo un error al crear el detalle de producto. Por favor intenta nuevamente.");
      });
  }

  const handleFileChange = (e) => {
    setImagen2D(e.target.files[0]);
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Crear Nuevo Detalle de Producto</h2>

        <form onSubmit={handleSubmit}>
          <Autocomplete onSelected={(productId) => setSelectedProducto(productId)} />

          <div style={styles.formGroup}>
            <label style={styles.label}>Color:</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              style={styles.whiteInput}
            >
              <option value="" disabled>Selecciona un color</option>
              {colores.map(color => (
                <option key={color.id} value={color.id}>
                  {color.nombre}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Tamaño:</label>
            <select
              value={selectedTamaño}
              onChange={(e) => setSelectedTamaño(e.target.value)}
              style={styles.whiteInput}
            >
              <option value="" disabled>Selecciona un tamaño</option>
              {tamaños.map(tamaño => (
                <option key={tamaño.id} value={tamaño.id}>
                  {tamaño.nombre}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Cantidad:</label>
            <input
              type="number"
              min="0"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              style={styles.whiteInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Imagen 2D:</label>
            <input
              type="file"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Estado:</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              style={styles.whiteInput}
            >
              <option value="disponible">Disponible</option>
              <option value="no_disponible">No Disponible</option>
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
// Asegúrate de exportar el nuevo componente:
export default CreateProductoDetalle;
