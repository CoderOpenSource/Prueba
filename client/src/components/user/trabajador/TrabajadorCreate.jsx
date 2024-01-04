import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TrabajadorCreate() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState(''); // Nuevo estado para contraseña
  const [newAvatar, setNewAvatar] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('first_name', firstName);
    formData.append('email', email);
    formData.append('telefono', telefono);
    formData.append('password', password);
    if (newAvatar) {
        formData.append('foto_perfil', newAvatar);
    }

    axios.post(`http://143.244.183.182/users/usuarios-Trabajador/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(response => {
        navigate(`/dashboard/users/usuarios-Trabajador/`);
    })
    .catch(err => {
        console.error("Error al crear el nuevo usuario:", err);
        setError("Hubo un error al crear el usuario. Por favor intenta nuevamente.");
    });
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setNewAvatar(file);
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Crear Nuevo Trabajador</h2>

        <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre de usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.whiteInput}
          />
        </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={styles.whiteInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Teléfono:</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              style={styles.whiteInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.whiteInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.whiteInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Foto de Perfil:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={styles.uploadButton}
            />
            {newAvatar &&
              <div style={styles.right}>
                <img src={URL.createObjectURL(newAvatar)} alt="Nuevo Avatar" style={styles.avatar} />
              </div>
            }
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

export default TrabajadorCreate;