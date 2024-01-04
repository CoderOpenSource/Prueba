import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserEdit() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  useEffect(() => {
    // Traemos los datos del usuario
    axios.get(`http://143.244.183.182/users/usuarios/${id}/`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('first_name', user.first_name);
    formData.append('email', user.email);
    formData.append('telefono', user.telefono);
    formData.append('password', password);
    if (newAvatar) {
        formData.append('foto_perfil', newAvatar);
    }

    axios.put(`http://143.244.183.182/users/usuarios/${id}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(response => {
        navigate(`/dashboard/users/usuarios/${user.id}`);
    })
    .catch(error => {
    console.error("Error:", error.response.data);
        console.error("Error al actualizar los datos del usuario:", error);
        alert("Hubo un error al actualizar. Por favor intenta nuevamente.");
    });
}


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setNewAvatar(file);
  }

  if (!user) return <p>Cargando...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Editar Datos</h2>

        {user.foto_perfil && <img src={user.foto_perfil} alt="Foto de Perfil Actual" style={styles.currentAvatar} />}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre:</label>
            <input type="text" name="first_name" value={user.first_name} onChange={handleInputChange} style={styles.whiteInput} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Teléfono:</label>
            <input type="text" name="telefono" value={user.telefono || ''} onChange={handleInputChange} style={styles.whiteInput} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input type="email" name="email" value={user.email} onChange={handleInputChange} style={styles.whiteInput} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Cambiar Foto de Perfil:</label>
            {user.foto_perfil &&
              <p>Actualmente:
                <a href={user.foto_perfil} target="_blank" rel="noopener noreferrer" style={styles.link} title={user.foto_perfil}>
                  {user.foto_perfil}
                </a>
              </p>
            }
            <input type="file" accept="image/*" onChange={handleAvatarChange} style={styles.uploadButton} />
            {newAvatar &&
              <div style={styles.right}>
                <img src={URL.createObjectURL(newAvatar)} alt="Nuevo Avatar" style={styles.avatar} />
              </div>
            }

          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Contraseña:</label>
            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} style={styles.whiteInput} />
            <p style={styles.warning}>Para actualizar sus datos debe ingresar su contraseña</p>
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
    warning: {
    color: '#FF9800', // Color naranja para la advertencia
    fontSize: '12px',
    marginTop: '5px',
    marginBottom: '20px',
  },
    link: {
  display: 'inline-block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '360px' // Asegúrate de ajustar este valor para que se adapte al ancho del formulario
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
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
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
    border: '1px solid #ccc',  // un pequeño borde para definir el input
    backgroundColor: 'white',
    color: 'black',
    fontSize: '16px',
  },
  uploadButton: {
    display: 'inline-block', // Esto permitirá que no ocupe todo el ancho
    padding: '8px 16px',
    borderRadius: '7px',
    cursor: 'pointer',
    background: '#002855', // Color de fondo azul oscuro
    color: 'white',  // Letras blancas
    border: 'none',
    fontSize: '16px',
    textAlign: 'center',
    marginTop: '5px',
    outline: 'none',
    appearance: 'none',  // Para remover el estilo por defecto en algunos navegadores
    WebkitAppearance: 'none', // Para navegadores basados en WebKit
    MozAppearance: 'none', // Para Firefox
  },
  currentAvatar: {
  width: '150px', // Aumentado de 100px a 150px
  height: '150px', // Aumentado de 100px a 150px
  borderRadius: '50%',
  marginBottom: '15px'
},
  right: {
    textAlign: 'right',
    marginTop: '10px',
  },
};

export default UserEdit;