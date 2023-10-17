import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateReserva() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [productoDetalle, setProductoDetalle] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState(null);
const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Consulta para obtener usuarios
    axios.get('http://192.168.0.16/users/usuarios-cliente/')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(err => {
        console.error("Error al obtener los usuarios:", err);
      });

    // Consulta para obtener detalles de productos
    axios.get('http://192.168.0.16/productos/productosdetalle/')
      .then(response => {
        setProductos(response.data);
      })
      .catch(err => {
        console.error("Error al obtener los productos:", err);
      });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('usuario', usuario);
    formData.append('producto_detalle', productoDetalle);
    formData.append('cantidad', cantidad);

    axios.post(`http://192.168.0.16/reservas/reservas/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(response => {
        navigate(`/dashboard/reservas/`);
    })
    .catch(err => {
        console.error("Error al crear la nueva reserva:", err);
        setError("Hubo un error al crear la reserva. Por favor intenta nuevamente.");
    });
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Crear Nueva Reserva</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
        <label style={styles.label}>Usuario:</label>
        <select
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={styles.whiteInput}
        >
          {usuarios.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Producto Detalle:</label>
        <select
          value={productoDetalle}
          onChange={(e) => setProductoDetalle(e.target.value)}
          style={styles.whiteInput}
        >
          {productos.map(p => <option key={p.id} value={p.id}>{p.detail}</option>)}
        </select>
      </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Cantidad:</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
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
  }
};

export default CreateReserva;