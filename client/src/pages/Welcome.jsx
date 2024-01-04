import NavBar from '../components/NavBar';
import MainView from './ecommerce/MainView'; // Importa el nuevo componente
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { MainContent } from "../components/StyledComponents";
import ResultsPage from "./ecommerce/ResultsPage";
import ProductDetail from "./ecommerce/ProductDetail";
import ResultsPageHombre from "./ecommerce/ResultsPageHombre";
import ResultsPageMujer from "./ecommerce/ResultsPageMujer";
import Catalogo from "./ecommerce/catalogo";
import Ofertas from "./ecommerce/Ofertas";
import UserProfile from "./ecommerce/UserProfile";
import UserEdit from "./ecommerce/UserEdit";
import CartView from "./ecommerce/ProductosCarrito";
import PaymentComponent from "./ecommerce/PaymentComponent";
function Welcome() {
    return (
        <div style={styles.container}>
            <NavBar />
            <MainContent>
                <Routes>
                    <Route path="/" element={<MainView />} /> {/* Ruta para MainView */}
                    <Route path="products/results/" element={<ResultsPage />} /> {/* Ruta para ResultsPage */}
                    <Route path="products/productdetail/:productId" element={<ProductDetail />} />
                    <Route path="products/hombre" element={<ResultsPageHombre />} />4
                    <Route path="products/mujer" element={<ResultsPageMujer />} />
                    <Route path="products/" element={<Catalogo />} />
                    <Route path="products/ofertas" element={<Ofertas />} />
                    <Route path="user/profile/:id" element={<UserProfile />} />
                    <Route path="user/:id/edit" element={<UserEdit />} />
                    <Route path="productos/carrito" element={<CartView />} />
                    <Route path="carrito/compras" element={<PaymentComponent />} />
                    {/* ... puedes añadir más rutas aquí ... */}
                </Routes>
            </MainContent>
        </div>
    );
}
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    width: '100vw',
    backgroundColor: '#F4F4F4', // Fondo suavemente gris para dar un aspecto más premium
    color: '#333', // Color de texto oscuro para contraste
    fontFamily: "'Open Sans', sans-serif", // Open Sans es una fuente popular para ecommerce
    boxSizing: 'border-box',

  },
  nav: {
    backgroundColor: '#FFFFFF', // Barra de navegación blanca
    padding: '1rem',
    borderBottom: '1px solid #E0E0E0', // Una sutil línea para definir el nav
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  navItem: {
    paddingRight: '2rem'
  },
  link: {
    color: '#007BFF', // Color azul estándar para enlaces
    textDecoration: 'none',
    fontWeight: '600', // Letra un poco más gruesa para los enlaces
  },
  header: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E0E0E0',
  },
  title: {
    margin: '1rem 0',
    fontSize: '2.5rem',
    fontWeight: '700', // Título más audaz
  },
  description: {
    margin: '1rem 0',
    fontSize: '1.2rem',
    lineHeight: '1.6',
  },
  sliderSection: {
    boxSizing: 'border-box',
    justifyContent: 'center',
    width: '100%',
    padding: '1rem',
    alignItems: 'center',
    overflow: 'hidden',
    maxWidth: '100%',
  },
  sliderImage: {
    width: '100%',
    maxWidth: '90%',
    margin: 'auto',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  listContainer: {
    display: 'inline-block',
    textAlign: 'left',
  },
  main: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #E0E0E0',
    borderBottom: '1px solid #E0E0E0',
  },
  subtitle: {
    fontSize: '1.5rem',
    margin: '1rem 0',
    fontWeight: '600',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '2rem',
    margin: '0 auto',
  },
  footer: {
    marginTop: 'auto',
    padding: '1rem',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #E0E0E0',
    textAlign: 'center',
  },

};

export default Welcome;
