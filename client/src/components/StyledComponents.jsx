import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column; // Esto es necesario para que Nav esté en la parte superior
  height: 100vh;
  width: 100vw; // 100% del ancho del viewport
  background-color: white;
`;

export const ContentWrapper = styled.div`
  display: flex;
  height: calc(100vh - 60px); // Resta la altura del NavBar.
`;
export const HamburgerIcon = styled.div`
  width: 30px;
  height: 22px;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  display: flex;

  div {
    width: 100%;
    height: 4px;
    background-color: white;
  }
`;
export const SidePanel = styled.div`
  width: 250px;
  background-color: #1a2a3a;
  color: white;
  padding-top: 20px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  width: ${({ width }) => width};
`;

export const MainContent = styled.div`
  flex-grow: 1; // Asegurarse de que MainContent ocupa todo el espacio restante
  flex-basis: 0;
  padding: 20px;
  background-color: #ECF0F1;
  overflow-x: hidden;
  overflow-y: auto;
`;
export const AdminPanelText = styled.p`
  margin: 0;
  margin-right: 10px; // Ajusta este valor según tus preferencias
  padding: 0;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #1a2a3a;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  width: 100%; // Asegúrate de que el Nav ocupa el 100% del ancho
`;

export const AvatarContainer = styled.div`
  position: relative;
  margin-right: 40px; // añade margen a la derecha
  z-index: 10; // asegúrate de que esté por encima de otros elementos
`;

export const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

export const UserGreetings = styled.div`
  display: flex;
  align-items: center;
`;

export const UserName = styled.p`
  margin: 0;
  margin-right: 10px;
`;

export const UserStatus = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 0.8rem;
    margin-right: 5px;
  }

  .status-circle {
    width: 10px;
    height: 10px;
    background-color: green;
    border-radius: 50%;
  }
`;

export const AvatarButton = styled.button`
  background-color: transparent; // Cambiamos el fondo a transparente
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.2rem;
  margin-left: 10px;

  span[role="img"] {
    margin-right: 10px; // Espacio entre el ícono y el nombre
  }

  &:after {
    content: "▼"; // Agregamos la flecha hacia abajo
    margin-left: 5px;
  }
`;


export const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 50px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')}; // nota el $ antes de isOpen
  right: 10px; // Ajusta según la necesidad
  top: 55px; // Esto debería posicionarlo justo debajo del AvatarButton
`;

export const DropdownItem = styled.button`
  background-color: black;
  padding: 10px 20px;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
`;

export const MenuOptionList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const MenuOptionItem = styled.li`
  margin: 5px 0;
`;
export const MenuContainer = styled.div`
  margin-bottom: 10px;  /* Ajusta este valor según tus necesidades */
`;
export const OptionLink = styled.a`
  text-decoration: none;
  color: #fff;  // Cambiado a blanco
  padding: 5px 10px;
  display: block;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;  // Un color de fondo más claro al pasar el mouse, para diferenciarse del color de fondo normal
  }
`;
