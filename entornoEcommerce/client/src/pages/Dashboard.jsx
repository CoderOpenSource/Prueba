import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../components/AuthContext';
import UserProfile from '../components/user/UserProfile';
import UserEdit from '../components/user/UserEdit';
import ListaTrabajadores from '../components/user/trabajador/ListaTrabajadores';
import TrabajadorEdit from '../components/user/trabajador/TrabajadorEdit';
import TrabajadorCreate from '../components/user/trabajador/TrabajadorCreate';
import ListaCliente from '../components/user/cliente/ListaCliente';
import ClienteEdit from '../components/user/cliente/ClienteEdit';
import ClienteCreate from '../components/user/cliente/ClienteCreate';
import ListaProductos from '../components/productos/producto/ListaProductos';
import CreateProducto from '../components/productos/producto/CreateProducto';
import ListaCategorias from '../components/productos/categoria/ListaCategoria';
import ListaSubcategorias from '../components/productos/subcategoria/ListaSubcategoria';
import CreateSubcategoria from '../components/productos/subcategoria/CreateSubcategoria';
import CreateCategoria from '../components/productos/categoria/CreateCategoria';
import ListaColores from '../components/colores/ListaColores';
import CreateColores from '../components/colores/CreateColores';
import EditarProducto from '../components/productos/producto/EditarProducto';
import CreateTamaños from '../components/tamaños/CreateTamaños';
import ListaTamaños from '../components/tamaños/ListaTamaños';
import CreateProductoDetalle from '../components/productos/productodetalle/CreateProductodetalle';
import ListaProductoDetalle from '../components/productos/productodetalle/ListaProductodetalle';
import ListaOrdenes from '../components/transacciones/ordenes/ListarOrdenes';
import CreateOrdenes from '../components/transacciones/ordenes/CreateOrdenes';

import ListarInventarios from '../components/sucursales/ListarInventarios';
import ListarSucursales from '../components/sucursales/ListarSucursales';
import CreateSucursales from '../components/sucursales/CreateSucursales';
import CreateInventarios from '../components/sucursales/CreateInventarios';
import ListarReservas from '../components/reservas/ListarReservas';
import CreateReserva from '../components/reservas/CreateReserva';
import {
  DashboardContainer,
  SidePanel,
  MainContent,
  Nav,
  AvatarContainer,
  AvatarButton,
  DropdownMenu,
  DropdownItem,
  ContentWrapper,
  HamburgerIcon,
  AdminPanelText,
  UserGreetings,
  UserAvatar,
  UserName,
  UserStatus,
  MenuOptionItem,
  OptionLink,
  MenuOptionList,
  MenuContainer,
} from '../components/StyledComponents';

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const [sidePanelWidth, setSidePanelWidth] = useState("250px");
  const { user, logout } = useAuth();
  console.log(isOpen);
  const toggleMenu = (label) => {
    if (activeMenu === label) {
      setActiveMenu('');
    } else {
      setActiveMenu(label);
    }
  };

  const toggleUserMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogout = async () => {
    try {
      logout();
      await navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

useEffect(() => {
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.width = '100%'; // Corregido aquí
  document.body.style.height = '100vh';
  document.body.style.overflow = 'hidden';
  document.body.style.backgroundColor = 'white'; // Fondo blanco para body

  // Esto es para asegurarte de que el html también tenga fondo blanco y ocupe todo el espacio.
  document.documentElement.style.backgroundColor = 'white';
  document.documentElement.style.height = '100%';

  return () => {
    document.body.style.margin = '';
    document.body.style.padding = '';
    document.body.style.width = '';
    document.body.style.height = '';
    document.body.style.overflow = '';
    document.body.style.backgroundColor = '';
    document.documentElement.style.height = '';
    document.documentElement.style.backgroundColor = '';
  };
}, []);
useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuRef, buttonRef]);
const toggleAvatarMenu = () => {
    setIsOpen(!isOpen);
};
  function goToUserProfile() {
    setIsOpen(!isOpen);
    navigate(`/dashboard/users/usuarios/${user.id}`);
  }
  function goToTrabajadorList() {
    navigate(`/dashboard/users/usuarios-Trabajador/`);
  }
  function goToClienteList() {
    navigate(`/dashboard/users/usuarios-cliente/`);
  }
  function goToProductosList()
  {
    navigate('/dashboard/productos/productos');
  }
  function goToCategoriasList()
  {
    navigate('/dashboard/productos/categorias');
  }
  function goToProductosList()
  {
    navigate('/dashboard/productos/productos');
  }
  function goToTamañosList()
  {
    navigate('/dashboard/productos/tamaños');
  }
  function goToColoresList()
  {
    navigate('/dashboard/productos/colores');
  }
  function goToSubcategoriasList()
  {
    navigate('/dashboard/productos/subcategorias');
  }
  function goToProductoDetalleList()
  {
    navigate('/dashboard/productos/productosdetalle');
  }
  function goToOrdenesList()
  {
    navigate('/dashboard/transacciones/ordenes');
  }
  function goToSucursalesList()
  {
    navigate('/dashboard/sucursales/sucursales');
  }
  function goToInventariosList()
  {
    navigate('/dashboard/sucursales/inventarios');
  }
  function goToReservasList()
  {
    navigate('/dashboard/reservas/reservas');
  }
const menuData = [
    {
      label: 'Gestionar Productos',
      options: [
        {
          label: 'Gestionar Categoria',
          action: () => { goToCategoriasList() }
        },
         {
          label: 'Gestionar Subcategoria',
          action: () => { goToSubcategoriasList() }
        },
        {
          label: 'Gestionar Productos',
          action: () => { goToProductosList() }
        },
        {
          label: 'Gestionar Tamaño',
          action: () => { goToTamañosList() }
        },
        {
          label: 'Gestionar Color',
          action: () => { goToColoresList()}
        },
        {
          label: 'Gestionar Producto Detalle',
          action: () => { goToProductoDetalleList() }
        },
        {
          label: 'Gestionar Imagenes',
          action: () => { console.log('Accion para Opción 2 Valoraciones'); }
        },
        {
          label: 'Gestionar Modelo3d',
          action: () => { console.log('Accion para Opción 2 Valoraciones'); }
        },
      ],
    },
    {
      label: 'Gestionar Transacciones',
      options: [
        {
          label: 'Gestionar Ordenes',
          action: () => { goToOrdenesList() }
        },
      ],
    },
    {
      label: 'Gestionar Sucursales',
      options: [
        {
          label: 'Gestionar Sucursales',
          action: () => { goToSucursalesList() }
        },
        {
          label: 'Gestionar Inventario',
          action: () => { goToInventariosList() }
        },
      ],
    },
    {
      label: 'Gestionar Reservas',
      options: [
        {
          label: 'Gestionar Reservas',
          action: () => { goToReservasList() }
        },
      ],
    },
  ];

  const renderOptions = (options) => {
  return (
    <MenuOptionList>
      {options.map((option, index) => (
        <MenuOptionItem key={index}>
          <OptionLink onClick={(e) => { e.preventDefault(); option.action(); }}>
            {option.label}
          </OptionLink>
        </MenuOptionItem>
      ))}
    </MenuOptionList>
  );
};

  const renderMenuOptions = () => {
    if (user.role === 'Admin') {
      return (
        <>
          <OptionLink onClick={goToTrabajadorList}>Gestionar Trabajador</OptionLink>
          <OptionLink onClick={goToClienteList}>Gestionar Cliente</OptionLink>
        </>
      );
    } else if (user.role === 'Trabajador') {
      return <OptionLink onClick={goToClienteList}>Gestionar Cliente</OptionLink>
    }
  };
const currentDate = new Date();
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const formattedTime = `${hours}:${minutes}`;
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  return (
  <DashboardContainer>
    <Nav>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
  <AdminPanelText>Admin Panel</AdminPanelText>
  <HamburgerIcon onClick={() => setSidePanelWidth(sidePanelWidth === "250px" ? "0px" : "250px")}>
    <div />
    <div />
    <div />
  </HamburgerIcon>
</div>
      <AvatarContainer>
      <AvatarButton onClick={toggleAvatarMenu} ref={buttonRef}>
        <span role="img" aria-label="Profile Icon">👤</span>
        <UserName>{user?.first_name}</UserName>
      </AvatarButton>
      <DropdownMenu $isOpen={isOpen} ref={menuRef}>
        <DropdownItem onClick={goToUserProfile}>
          <span role="img" aria-label="Profile Icon">👤</span> Profile
        </DropdownItem>
        <DropdownItem onClick={logout}>
          <span role="img" aria-label="Logout Icon">🚪</span> Logout
        </DropdownItem>
      </DropdownMenu>
    </AvatarContainer>
    </Nav>
    <ContentWrapper>
  <SidePanel width={sidePanelWidth} style={{ paddingLeft: '20px' }}>
  { user && (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}> {/* Añadido marginBottom para separación con los items siguientes */}
        <img src={user.foto_perfil} alt="Avatar del usuario" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
        <div style={{ marginLeft: '15px' }}>
          <p style={{ margin: '0', marginBottom: '5px' }}>Hola, crack</p> {/* Reducido marginBottom para que esté más pegado al estado "Online" */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'green', marginRight: '5px' }}></span>
            <span>Online</span>
          </div>
        </div>

      </div>
      <div style={{ marginTop: '10px' }}>
    <span style={{ fontSize: '24px' }}>{formattedTime}</span>
    <div style={{ marginTop: '5px' }}>
        <span>{formattedDate}</span>
    </div>
</div>
      <div style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '20px' }}></div>
              <button onClick={toggleUserMenu}style={{ marginBottom: "10px" }}>Gestionar Usuarios</button>
              {isMenuVisible && renderMenuOptions()}
              <div>
              {menuData.map((menu, index) => (
                <MenuContainer key={index}>
                  <button onClick={() => toggleMenu(menu.label)}>
                    {menu.label}
                  </button>
                  {activeMenu === menu.label && renderOptions(menu.options)}
                </MenuContainer>
              ))}
            </div>

            </>
          )}
        </SidePanel>


      <MainContent>
        <Routes>
        <Route path="/users/usuarios/:id" element={<UserProfile />} />
        <Route path="/users/usuarios/:id/edit" element={<UserEdit />} />
        <Route path="/users/usuarios-Trabajador/" element={<ListaTrabajadores />} />
        <Route path="/users/usuarios-Trabajador/:id/edit" element={<TrabajadorEdit />} />
        <Route path="/users/usuarios-Trabajador/create" element={<TrabajadorCreate />} />
        <Route path="/users/usuarios-cliente/" element={<ListaCliente />} />
        <Route path="/users/usuarios-cliente/create" element={<ClienteCreate />} />
        <Route path="/users/usuarios-cliente/:id/edit" element={<ClienteEdit />} />
        <Route path="/productos/productos/" element={<ListaProductos />} />
        <Route path="/productos/productos/create" element={<CreateProducto />} />
        <Route path="/productos/categorias/" element={<ListaCategorias />} />
        <Route path="/productos/subcategorias/" element={<ListaSubcategorias />} />
        <Route path="/productos/subcategorias/create" element={<CreateSubcategoria />} />
        <Route path="/productos/categorias/create" element={<CreateCategoria />} />
        <Route path="/productos/colores/" element={<ListaColores />} />
        <Route path="/productos/colores/create" element={<CreateColores />} />
        <Route path="/productos/productos/:id/edit" element={<EditarProducto />} />
        <Route path="/productos/tamaños/" element={<ListaTamaños />} />
        <Route path="/productos/tamaños/create" element={<CreateTamaños />} />
        <Route path="/productos/productosdetalle/" element={<ListaProductoDetalle />} />
        <Route path="/productos/productosdetalle/create" element={<CreateProductoDetalle />} />
        <Route path="/transacciones/ordenes/" element={<ListaOrdenes />} />
        <Route path="/transacciones/ordenes/create" element={<CreateOrdenes />} />
        <Route path="/sucursales/sucursales/" element={<ListarSucursales />} />
        <Route path="/sucursales/sucursales/create" element={<CreateSucursales />} />
        <Route path="/sucursales/inventarios/" element={<ListarInventarios />} />
        <Route path="/sucursales/inventarios/create" element={<CreateInventarios />} />
        <Route path="/reservas/reservas/" element={<ListarReservas />} />
        <Route path="/reservas/reservas/create" element={<CreateReserva />} />
    </Routes>
      </MainContent>
    </ContentWrapper>
  </DashboardContainer>
);

}

export default Dashboard;
