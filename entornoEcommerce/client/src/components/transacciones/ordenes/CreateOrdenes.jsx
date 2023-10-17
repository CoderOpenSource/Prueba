import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function CreateOrdenes() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [estado, setEstado] = useState(ESTADOS_POSIBLES[0][0]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [productosEnOrden, setProductosEnOrden] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState(null);
  const [productoDetalles, setProductoDetalles] = useState([]);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState('');
  useEffect(() => {
    axios.get('http://192.168.1.27/users/usuarios-cliente/')
      .then(response => {
        setUsuarios(response.data);
        if(response.data.length > 0) {
          setUsuarioSeleccionado(response.data[0].id.toString());
        }
      }).catch(console.error);
    axios.get('http://192.168.1.27/productos/productos/').then(response => setProductos(response.data)).catch(console.error);
  }, []);
useEffect(() => {
  // Esto se ejecutará cuando productoDetalles cambie
  if (productoDetalles.length > 0) {
    setDetalleSeleccionado(productoDetalles[0].id.toString());
  }
}, [productoDetalles]);
const agregarProductoDetalleAOrden = () => {
    const detalle = productoDetalles.find(d => d.id.toString() === detalleSeleccionado);
    if (detalle && cantidad > 0 && cantidad <= detalle.cantidad) {
        setProductosEnOrden(prevProductos => [...prevProductos, {
            productodetalle: detalleSeleccionado,
            cantidad: cantidad,
        }]);
        setCantidad(1); // resetear la cantidad después de agregar un producto
    } else {
        setError("La cantidad ingresada es inválida.");
    }
};



   const handleProductoChange = (e) => {
    setProductoSeleccionado(e.target.value);

    // Cargando los detalles del producto
    axios.get(`http://192.168.1.27/productos/productosdetalle/`)
      .then(response => {
        // Filtrar los detalles del producto basado en el producto seleccionado
        const detalles = response.data.filter(detalle => detalle.producto.id.toString() === e.target.value);
        setProductoDetalles(detalles);
      })
      .catch(console.error);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  console.log("Usuario seleccionado:", usuarioSeleccionado); // Imprimir el usuario seleccionado para depuración

    const formData = {
      usuario: usuarioSeleccionado,
      estado: estado,
      productos: productosEnOrden,
    };
console.log("formData:", formData);

    // Aquí puedes enviar tu formulario a tu backend
    // Si tu backend espera una estructura específica, asegúrate de transformar formData como sea necesario
    axios.post(`http://192.168.1.27/transacciones/ordenes/`, formData)
      .then(response =>
      navigate(`/dashboard/transacciones/ordenes`))
      .catch(error => {
        console.error("Error al crear la nueva orden:", error);
        setError("Hubo un error al crear la orden. Por favor intenta nuevamente.");
      });
  };

  return (
  <div style={styles.container}>
    <div style={styles.card}>
      <h2 style={styles.title}>Crear Nueva Orden</h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Usuario:</label>
          <select value={usuarioSeleccionado} onChange={(e) => setUsuarioSeleccionado(e.target.value)} style={styles.whiteInput}>
            {usuarios.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Estado:</label>
          <select value={estado} onChange={(e) => setEstado(e.target.value)} style={styles.whiteInput}>
            {ESTADOS_POSIBLES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Productos:</label>
          <select value={productoSeleccionado} onChange={handleProductoChange} style={styles.whiteInput}>
            {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Detalles del Producto:</label>
          <select value={detalleSeleccionado} onChange={(e) => setDetalleSeleccionado(e.target.value)} style={styles.whiteInput}>
            {productoDetalles.map(detalle => (
              <option key={detalle.id} value={detalle.id}>
                {`${detalle.color.nombre} - ${detalle.tamaño.nombre} - Cantidad disponible: ${detalle.cantidad}`}
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

      <button type="button" onClick={agregarProductoDetalleAOrden} style={styles.saveButton}>
  ➕ Añadir Producto
</button>


        <ul>
  {productosEnOrden.map((prod, index) => (
    <li key={index}>
      Detalle ID: {prod.detalle} - Cantidad: {prod.cantidad}
    </li>
  ))}
</ul>


        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.saveButton} type="submit">💾 Guardar</button>
      </form>
    </div>
  </div>
);
}

const ESTADOS_POSIBLES = [
    ['pendiente', 'Pendiente'],
    ['procesando', 'Procesando'],
    ['enviado', 'Enviado'],
    ['entregado', 'Entregado'],
    ['cancelado', 'Cancelado'],
];
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

export default CreateOrdenes;