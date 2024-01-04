import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
function CreateSucursales() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [latitud, setLatitud] = useState(''); // Nueva variable de estado para latitud
    const [longitud, setLongitud] = useState(''); // Nueva variable de estado para longitud
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const sucursalData = {
            nombre,
            direccion,
            telefono,
            latitud, // Incluir latitud en los datos de la sucursal
            longitud,
        };

        axios.post('http://143.244.183.182/sucursales/sucursales/', sucursalData)
            .then(response => {
              Swal.fire({
                title: 'Éxito!',
                text: 'Sucursal creada con éxito.',
                icon: 'success',
                timer: 3000
              });
                navigate('/dashboard/sucursales/sucursales/');
            })
            .catch(err => {
                console.error("Error al crear la nueva sucursal:", err);
                setError("Hubo un error al crear la sucursal. Por favor intenta nuevamente.");
            });
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Crear Nueva Sucursal</h2>

                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Nombre:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Dirección:</label>
                        <input
                            type="text"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Teléfono:</label>
                        <input
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Latitud:</label>
                        <input
                            type="text"
                            value={latitud}
                            onChange={(e) => setLatitud(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    {/* Campo para la longitud */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Longitud:</label>
                        <input
                            type="text"
                            value={longitud}
                            onChange={(e) => setLongitud(e.target.value)}
                            style={styles.input}
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
  input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: 'white',
        color: 'black',
        fontSize: '16px',
    },
};
export default CreateSucursales;