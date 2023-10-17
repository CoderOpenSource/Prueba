import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from './AuthContext';
import {
    faChevronRight, faShoppingCart, faSearch, faUser,
    faStore, faClipboardList, faBars
} from "@fortawesome/free-solid-svg-icons";
import VideoCapture from "./ProbadorVirtual/VideoCapture";
const NavBar = () => {

const navigate = useNavigate();

const { user } = useAuth();
console.log(user);
   const handleCartClick = () => {
    navigate('/productos/carrito', { state: { userID: user?.id } });
};

const { isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [hoverLink, setHoverLink] = useState(null);
    const [submenuTimeout, setSubmenuTimeout] = useState(null);
    const menuRef = useRef(null);
    const menuIconRef = useRef(null);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
const handleProfileIconClick = () => {
    setShowUserMenu(!showUserMenu);
  };
    useEffect(() => {
        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);
    useEffect(() => {
    if (query) {
        axios.get(`http://192.168.0.151/productos/productos/?search=${query}`)
            .then(response => {
                setResults(response.data);
            })
            .catch(error => {
                console.error("Error fetching the products", error);
            });
    } else {
        setResults([]); // Esto limpiará los resultados cuando el query esté vacío.
    }
}, [query]);

    const handleClickOutside = event => {
        if (
            menuRef.current && !menuRef.current.contains(event.target) &&
            !menuIconRef.current.contains(event.target)
        ) {
            setShowMenu(false);
        }
    };
    function goToProductsSearch(product) {
    navigate(`/products/results/`, { state: { product } });
    setResults([]);
}

    const [hoverStatus, setHoverStatus] = useState({
    current: null, // Actual elemento con hover (puede ser 'hombres', 'mujeres', etc.)
    previous: null // Elemento anterior con hover
});
const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevenir el recargado de la página
    navigate('/products/results/', { state: { results } });
    setResults([]);
};
const handleMouseEnter = (category) => {
    if (submenuTimeout) clearTimeout(submenuTimeout);
    setHoverStatus((prev) => ({
        current: category,
        previous: prev.current
    }));
};
 const handleHombreClick = () => {
    navigate('/products/hombre');
    setShowMenu(false); // Esto hará que el menú desaparezca
};

const handleMujerClick = () => {
    navigate('/products/mujer');
    setShowMenu(false); // Esto hará que el menú desaparezca
};

const handleIconClick = () => {
    navigate('/');
  };
const handleMouseLeave = () => {
    const timeoutId = setTimeout(() => {
        setHoverStatus((prev) => ({
            current: null,
            previous: prev.current
        }));
    }, 200);
    setSubmenuTimeout(timeoutId);
}
  return (
    <nav style={styles.nav}>
      <div style={styles.navLeft}>
              <span style={styles.storeName}>STYLO STORE</span> {/* Agregado texto "STYLO STORE" aquí */}
        <FontAwesomeIcon icon={faStore} style={styles.logoIcon} onClick={handleIconClick} />
        <FontAwesomeIcon
    icon={faBars}
    style={styles.menuIcon}
    onClick={() => setShowMenu(!showMenu)}
    ref={menuIconRef}
/>

        {showMenu && (
  <div
    style={
      showMenu
        ? { ...styles.dropdownMenu, ...styles.dropdownMenuActive }
        : styles.dropdownMenu
    }
    ref={menuRef}
  >
    <p style={styles.menuTitle}>Categorías</p>

    <div
    onMouseEnter={() => handleMouseEnter('hombres')}
    onMouseLeave={handleMouseLeave}
    style={styles.dropdownLinkContainer}
>
      <div onClick={handleHombreClick} style={{
                    cursor: 'pointer',
                    ... (hoverLink === 'hombres' ? { ...styles.dropdownLink, ...styles.dropdownLinkHover } : styles.dropdownLink)
                }}>
                Hombre
                <FontAwesomeIcon icon={faChevronRight} style={styles.arrowIcon} />
            </div>

      {(hoverStatus.current === 'hombres' || hoverStatus.previous === 'hombres') && (
    <div style={styles.submenu}>
          <Link to="/hombres/pantalones" style={styles.submenuLink}>Pantalón</Link>
          <Link to="/hombres/pantalones" style={styles.submenuLink}>Camisas</Link>
          <Link to="/hombres/pantalones" style={styles.submenuLink}>Poleras</Link>
          {/* ... (otros enlaces de subcategoría) */}
        </div>
      )}
    </div>
     <div
    onMouseEnter={() => handleMouseEnter('mujeres')}
    onMouseLeave={handleMouseLeave}
    style={styles.dropdownLinkContainer}
>
<div onClick={handleMujerClick} style={{
                    cursor: 'pointer',
                    ... (hoverLink === 'mujer' ? { ...styles.dropdownLink, ...styles.dropdownLinkHover } : styles.dropdownLink)
                }}>
                Mujer
                <FontAwesomeIcon icon={faChevronRight} style={styles.arrowIcon} />
            </div>

      {(hoverStatus.current === 'mujeres' || hoverStatus.previous === 'mujeres') && (
    <div style={styles.submenu}>
          <Link to="/mujeres/pantalones" style={styles.submenuLink}>Pantalón</Link>
          <Link to="/mujeres/pantalones" style={styles.submenuLink}>Camisas</Link>
          <Link to="/muejeres/pantalones" style={styles.submenuLink}>Poleras</Link>
          {/* ... (otros enlaces de subcategoría) */}
        </div>
      )}
    </div>

    <p style={styles.menuTitle}>Ofertas</p>
    <Link
      to="/ofertas"
      style={hoverLink === 'ofertas' ? { ...styles.dropdownLink, ...styles.dropdownLinkHover } : styles.dropdownLink}
      onMouseEnter={() => setHoverLink('ofertas')}
      onMouseLeave={() => setHoverLink(null)}
    >
      Ver ofertas
    </Link>
          </div>
        )}
      </div>
      {/* Parte central del navbar (buscador) */}
            <div style={styles.navCenter}>
            <form onSubmit={handleSearchSubmit} style={styles.searchContainer}> {/* Agregado formulario aquí */}
                <input
                    style={styles.searchInput}
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Buscar productos..."
                />
                <button style={styles.searchButton} type="submit"> {/* Asegurarse de que el botón sea de tipo "submit" */}
                    <FontAwesomeIcon icon={faSearch} style={styles.icon} />
                </button>
            </form>

            <div style={results.length > 0 ? { ...styles.resultsContainer, display: 'block' } : styles.resultsContainer}>
    {results.map(product => (
        <div
            style={styles.productContainer}
            key={product.id}
            onClick={() => goToProductsSearch(product)} // Utilizar goToProductsSearch aquí
        >
            {product.nombre}
        </div>
    ))}
</div>

        </div>

      <div style={styles.navRight}>
        <div onClick={handleCartClick} style={styles.link}>
                <FontAwesomeIcon icon={faShoppingCart} style={styles.cartIcon} />
                <span style={styles.cartCount}>0</span>
            </div>
        <Link to="/orders" style={styles.link}>
          <FontAwesomeIcon icon={faClipboardList} style={styles.icon} />
          <span style={styles.linkText}>Mis Pedidos</span>
        </Link>
        <div style={styles.profileIcon} onClick={handleProfileIconClick}>
          <FontAwesomeIcon icon={faUser} style={styles.icon} />
          {showUserMenu && (
            <div style={styles.userMenu}>
              {isAuthenticated ? (
                <>
                  <div style={styles.userMenuItem} onClick={() => navigate(`user/profile/${user.id}`)}>
                    Ver perfil
                  </div>
                  <div style={styles.userMenuItem} onClick={logout}>
                    Cerrar sesión
                  </div>
                </>
              ) : (
                <div style={styles.userMenuItem} onClick={() => navigate('/login')}>
                  Iniciar sesión
                </div>
              )}
            </div>
          )}
        </div>
        <div>
        <div>
                    {showCamera && <VideoCapture />}
                    <p onClick={() => setShowCamera(true)}>Camara</p>
                </div>
        </div>
      </div>
    </nav>
  );
};

const styles = {
storeName: { // Estilo para el texto "STYLO STORE"
        color: '#fff', // Texto de color blanco
        marginLeft: '10px', // Margen a la izquierda para separarlo del icono
        fontSize: '24px', // Tamaño de la fuente
        fontWeight: 'bold', // Fuente en negritas
    },
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    height: '80px',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E272E",
    color: "#fff",
    padding: "10px 20px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
  },
  userMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: "#1E272E",
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px 0',
    zIndex: 1,
  },
  userMenuItem: {
    padding: '5px 15px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  logoIcon: {
    fontSize: "30px",
    color: "#fff",
    cursor: 'pointer',
  },
  navCenter: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    borderRadius: "5px",
    padding: "5px",
    // Puedes remover la siguiente línea si también quieres que el contenedor tenga fondo blanco
    backgroundColor: "#fff"
  },
  searchText: {
    color: "#fff",
    marginRight: "10px"
  },
  searchInput: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    width: "300px",
    backgroundColor: "#fff", // esto cambia el fondo a blanco
    color: "#000" // esto cambia el texto a negro
  },
  searchButton: {
    backgroundColor: "#1E272E",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer"
  },
  navRight: {
    display: "flex",
    alignItems: "center"
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    marginLeft: "20px",
    fontSize: "16px",
    display: "flex",
    alignItems: "center"
  },
  icon: {
    fontSize: "20px",
    marginRight: "5px",
    color: "#fff"
  },
  cartIcon: {
    fontSize: "20px",
    marginRight: "5px",
    color: "#fff"
  },
  cartCount: {
    backgroundColor: "#fff",
    color: "#1E272E",
    borderRadius: "50%",
    padding: "5px 10px",
    marginLeft: "5px",
    fontSize: "14px"
  },
  profileIcon: {
    backgroundColor: "#1E272E",
    color: "#fff",
    borderRadius: "50%",
    padding: "10px",
    marginLeft: "20px",
    fontSize: "20px",
    cursor: "pointer"
  },
  linkText: {
    marginLeft: "5px"
  },
  menuIcon: {
    fontSize: "20px",
    color: "#fff",
    marginLeft: "10px",
    cursor: "pointer"
  },
  dropdownMenu: {
    position: "absolute",
    top: "100px",
    left: "-100%",
    width: "220px", // Ancho incrementado para tener en cuenta el padding añadido
    height: "calc(100vh - 100px)", // Reducido para tener en cuenta el padding y evitar un scroll innecesario
    backgroundColor: "#1E272E",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    zIndex: 1,
    transition: "left 1s",
    borderRadius: "0 10px 10px 0", // Redondea sólo las esquinas superiores e inferiores derechas
    padding: "10px", // Padding añadido para dar más espacio
  },
  dropdownMenuActive: {

    left: "0", // Cuando está activo, el menú se desplaza a la posición 0 desde la izquierda
  },
menuTitle: {
    color: '#fff',
    fontWeight: 'bold',
    padding: '10px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },
  dropdownLinkContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  dropdownLink: {
    padding: '10px 20px', // Añadido padding a la izquierda para separar el texto del borde
    // ... otros estilos que ya tenías
  },

  arrowIcon: {
    marginLeft: '10px',
  },

   submenu: {
    position: 'absolute',
    top: '-10px', // Ajuste para que no quede debajo
    left: 'calc(100% + 10px)', // Añadido 10px para separarlo un poco del menú principal
    backgroundColor: "#1E272E",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    zIndex: 2,
    borderRadius: "10px", // Bordes redondeados
    padding: "10px", // Padding añadido
  },

  submenuLink: {
    color: '#fff',
    padding: '10px 20px',
    display: 'block',
    textDecoration: 'none',
    fontSize: '16px', // Aumentado tamaño de fuente
    fontWeight: '500', // Añadido peso al texto
    transition: 'background-color 0.3s', // Transición suave al pasar el ratón

    // Efecto al pasar el ratón
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    }
  },
  resultsContainer: {
    position: 'absolute',
    top: '100%', // Asegura que el contenedor aparezca debajo del input
    width: '400px',
    maxHeight: '200px',
    overflowY: 'auto',
    backgroundColor: '#1E272E', // Color de fondo oscuro
    color: 'white', // Texto blanco
    border: '1px solid #ccc',
    borderRadius: '5px', // Bordes redondeados
    zIndex: 2, // Asegúrese de que esté sobre otros elementos
    display: 'none', // Inicialmente escondido
},

productContainer: {
    padding: '20px 40px', // Aumentar el padding para más espacio
    borderBottom: '1px solid #eee', // Borde en la parte inferior para separar los elementos
    cursor: 'pointer', // Cursor pointer para indicar clickeabilidad
    borderRadius: '5px', // Bordes redondeados
    backgroundColor: '#1E272E', // Color de fondo oscuro
    color: 'white', // Texto blanco
    '&:hover': { // Efecto hover para cuando el mouse pase sobre un producto
        backgroundColor: '#e2e2e2', // Cambiar el color de fondo en el hover
        color: 'black', // Cambiar el color del texto a negro en el hover
    }
},



};

export default NavBar;

