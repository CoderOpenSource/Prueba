import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw; // Asegúrate de que el contenedor ocupe todo el ancho de la vista
  background-color: #f4f4f7;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center; // Centra todos los elementos del formulario horizontalmente
`;
const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 1em;
  color: #333;
`;

const Card = styled.div`
  width: 500px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const Input = styled.input`
  width: 100%; // Cambiado a 100%
  padding: 15px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
`;

const Button = styled.button`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #218838;
  }
`;
const ProfileIcon = styled(FaUser)`
  color: #333;
  // Añade más estilos según lo necesites
`;
const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 10px; // Puedes ajustar este valor para centrarlo horizontalmente si es necesario.
  top: 40%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px; // Ajusta el tamaño según lo necesites.
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center; // Centra los ítems verticalmente
  justify-content: center; // Alinea los ítems horizontalmente
  gap: 10px; // Añade espacio entre los ítems
`;
function Login() {
  // Resto del componente
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth(); // Aquí obtienes el método login del contexto
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    console.log('Before sending request');
    const response = await fetch('http://192.168.0.16/users/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Response error data', errorData);
      throw new Error(errorData.message || 'Authentication failed!');
    }

    const data = await response.json();
    login(data.access, data.user_data, data.user_data.role);
    console.log(data.user_data.role);
    // Aquí verificamos el rol del usuario
    if (data.user_data.role === 'Cliente') {
      navigate('/');
    } else {
      navigate('/dashboard');

    }

  } catch (error) {
    console.log(password);
    console.error('Authentication error', error);
    setError(error.message || 'Authentication failed!');
  } finally {
    setIsLoading(false);
  }
};




  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.backgroundColor = '#f4f4f7';

    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <Container>
      <Card>
        <TitleContainer>
          <Title>Login</Title>
          <ProfileIcon size={30} />
        </TitleContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label><FaEnvelope /> Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </FormGroup>
          <FormGroup>
            <Label><FaLock /> Password</Label>
            <PasswordContainer> {/* Nuevo contenedor para el input y el icono */}
              <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

              <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Cambia el icono basado en el estado showPassword */}
              </EyeIcon>
            </PasswordContainer>
          </FormGroup>
          <Button type="submit">Iniciar Sesión</Button>
        </Form>
      </Card>
      {error && <p>{error}</p>}
    {isLoading && <p>Loading...</p>}
    </Container>
  );
}

export default Login;
