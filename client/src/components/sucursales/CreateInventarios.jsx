import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function CreateInventarios() {
 const navigate = useNavigate();
  const [sucursal, setSucursal] = useState('');
  const [sucursales, setSucursales] = useState([]);
  const [productodetalle, setProductodetalle] = useState('');
  const [productosdetalles, setProductosdetalles] = useState([]);
  const [cantidad, setCantidad] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://137.184.190.92/sucursales/sucursales/') // Asegúrese de que esta URL esté correcta
    .then(response => {
      setSucursales(response.data);
    })
    .catch(err => {
      console.error("Error al obtener las sucursales:", err);
    });

    axios.get(`http://137.184.190.92/productos/productosdetalle/`) // Asegúrese de que esta URL esté correcta
    .then(response => {
      setProductosdetalles(response.data);
    })
    .catch(err => {
      console.error("Error al obtener los detalles del producto:", err);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      sucursal: sucursal,
      productodetalle: productodetalle,
      cantidad: cantidad,
    };

    axios.post('http://137.184.190.92/sucursales/inventarios/', formData)
    .then(response => {
      Swal.fire({
        title: 'Éxito!',
        text: 'Inventario de Producto creado con éxito.',
        icon: 'success',
        timer: 3000
      });
                navigate('/dashboard/sucursales/inventarios/');
            })
    .catch(err => {
      console.error("Error al crear el inventario:", err);
      setError("Hubo un error al crear el inventario. Por favor intenta nuevamente.");
    });
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Crear Nuevo Inventario</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Sucursal:</label>
            <select
              value={sucursal}
              onChange={(e) => setSucursal(e.target.value)}
              style={styles.whiteInput}
            >
              {sucursales.map(suc => (
                <option value={suc.id} key={suc.id}>
                  {suc.nombre} {/* Asegúrese de que 'nombre' es el campo correcto */}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Producto Detalle:</label>
            <select
              value={productodetalle}
              onChange={(e) => setProductodetalle(e.target.value)}
              style={styles.whiteInput}
            >
              {productosdetalles.map(productodet => (
                <option value={productodet.id} key={productodet.id}>
                  {productodet.producto.nombre}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Cantidad:</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
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
  link: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '360px'
  },
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
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginTop: '10px',
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
  currentAvatar: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginBottom: '15px'
  },
  right: {
    textAlign: 'right',
    marginTop: '10px',
  },
};
export default CreateInventarios;