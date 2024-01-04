import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight, faShoppingCart, faSearch, faUser,
    faStore, faClipboardList, faBars
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [hoverLink, setHoverLink] = useState(null);
    const [submenuTimeout, setSubmenuTimeout] = useState(null);

    const menuRef = useRef(null);
    const menuIconRef = useRef(null);

    useEffect(() => {
        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    const handleClickOutside = event => {
        if (
            menuRef.current && !menuRef.current.contains(event.target) &&
            !menuIconRef.current.contains(event.target)
        ) {
            setShowMenu(false);
        }
    };

    const [hoverStatus, setHoverStatus] = useState({
    current: null, // Actual elemento con hover (puede ser 'hombres', 'mujeres', etc.)
    previous: null // Elemento anterior con hover
});

const handleMouseEnter = (category) => {
    if (submenuTimeout) clearTimeout(submenuTimeout);
    setHoverStatus((prev) => ({
        current: category,
        previous: prev.current
    }));
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
        <FontAwesomeIcon icon={faStore} style={styles.logoIcon} />
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
      <Link
        to="/hombres"
        style={hoverLink === 'hombres' ? { ...styles.dropdownLink, ...styles.dropdownLinkHover } : styles.dropdownLink}
      >
        Hombre
        <FontAwesomeIcon icon={faChevronRight} style={styles.arrowIcon} />
      </Link>

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
      <Link
        to="/mujeres"
        style={hoverLink === 'mujeres' ? { ...styles.dropdownLink, ...styles.dropdownLinkHover } : styles.dropdownLink}
      >
        Mujer
        <FontAwesomeIcon icon={faChevronRight} style={styles.arrowIcon} />
      </Link>

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
      <div style={styles.navCenter}>
        <p style={styles.searchText}>Buscar...</p>
        <div style={styles.searchContainer}>
          <input type="text" placeholder="Buscar productos..." style={styles.searchInput} />
          <button style={styles.searchButton}>
            <FontAwesomeIcon icon={faSearch} style={styles.icon} />
          </button>
        </div>
      </div>
      <div style={styles.navRight}>
        <Link to="/cart" style={styles.link}>
          <FontAwesomeIcon icon={faShoppingCart} style={styles.cartIcon} />
          <span style={styles.cartCount}>0</span>
        </Link>
        <Link to="/orders" style={styles.link}>
          <FontAwesomeIcon icon={faClipboardList} style={styles.icon} />
          <span style={styles.linkText}>Mis Pedidos</span>
        </Link>
        <div style={styles.profileIcon}>
          <FontAwesomeIcon icon={faUser} style={styles.icon} />
        </div>
      </div>
    </nav>
  );
};

const styles = {
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
  logoIcon: {
    fontSize: "30px",
    color: "#fff"
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
    backgroundColor: "#333"
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
    backgroundColor: "#333",
    color: "#fff"
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

};

export default NavBar;
