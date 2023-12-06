import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserEdit from './UserEdit';
function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { id } = useParams();  // Obtener el ID del usuario directamente desde useParams
  useEffect(() => {
    axios.get(`http://165.227.68.145/users/usuarios/${id}/`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos del usuario:", error);
      });
  }, [id]);  // Dependencia actualizada a 'id'

  // Si los datos aún no se han cargado, muestra un loader o mensaje
  if (!userData) {
    return <p>Cargando...</p>;
  }
  const roleMapping = {
    1: 'Admin',
    2: 'Trabajador',
    3: 'Cliente'
};
const handleEditClick = () => {
    navigate(`/dashboard/users/usuarios/${id}/edit`);
};
return (
  <div style={styles.container}>
    <div style={styles.card}>
      <img src={userData.foto_perfil} alt={`${userData.first_name}'s profile`} style={styles.image} />
      <h1>{userData.first_name} {userData.last_name}</h1>
      <p>Email: {userData.email}</p>
      <p>Role: {roleMapping[userData.groups[0]] || 'No definido'}</p>
      <p>Teléfono: {userData.telefono}</p>
      <button style={styles.editButton} onClick={handleEditClick}>
    ✏️ Editar
</button>
    </div>
  </div>
);
}
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Cambio para que quede más pegado arriba
    height: '100vh',
    paddingTop: '50px' // Espacio desde la parte superior
  },
  card: {
    padding: '30px', // Más padding para agrandar el card
    borderRadius: '15px', // Bordes un poco más redondeados
    backgroundColor: '#002855', // Azul oscuro
    color: 'white',
    width: '400px', // Ancho mayor
    textAlign: 'center',
  },
  image: {
    width: '150px', // Foto de perfil más grande
    height: '150px',
    borderRadius: '50%',
    marginBottom: '30px', // Más espacio debajo de la imagen
  },
  editButton: {
    marginTop: '25px',
    backgroundColor: 'white',
    color: '#002855', // El mismo color azul oscuro para el texto del botón
    border: 'none',
    borderRadius: '7px',
    cursor: 'pointer',
    padding: '8px 16px' // Un poco más de padding para el botón
  }
};

export default UserProfile;

