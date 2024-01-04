import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ImageSlider from './ImageSlider'; // Asegúrate de importar tu componente ImageSlider
import Comments from './Comments'; // Asegúrate de importar Comments correctamente
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
Modal.setAppElement('#root');
import { useAuth } from '../../components/AuthContext';
function ProductVariantCard({ variant }) {
  const [quantity, setQuantity] = useState(1); // Estado para manejar la cantidad
    const { user } = useAuth();
    const USER_ID = user.id; // Reemplaza 'YOUR_USER_ID' con el ID del usuario actual
     console.log(variant.id);
     console.log(USER_ID);
     const handleAddToCart = async () => {
        try {
            let carritoId = null;
    
            // Obtener todos los carritos
            const carritosResponse = await axios.get(`http://143.244.183.182/transacciones/carritos/`);
            console.log(carritosResponse);
    
            // Verificar si alguno pertenece al USER_ID
            const carritoUsuario = carritosResponse.data.find(carrito => carrito.usuario === USER_ID);
            
            if (carritoUsuario) {
                carritoId = carritoUsuario.id; // Si se encuentra, usar el ID de este carrito
            } else {
                // Si no se encuentra ningún carrito, crea uno nuevo
                const newCarritoResponse = await axios.post(`http://143.244.183.182/transacciones/carritos/`, {
                    usuario: USER_ID
                });
                carritoId = newCarritoResponse.data.id; // Usar el ID del nuevo carrito
            }
    
            // Añadir un nuevo producto al carrito
            await axios.post(`http://143.244.183.182/transacciones/carrito_detalle/`, {
                carrito: carritoId,
                productodetalle: variant.id, // manteniendo el antiguo
                productodetalle_id: variant.id,
                cantidad: quantity
            });
    
            alert('Producto añadido al carrito exitosamente!');
    
        } catch (error) {
            console.error('Hubo un error al añadir el producto al carrito', error);
            console.log('Detalles del error:', error.response);
        }
    };
    






    return (
        <div style={{
            backgroundColor: '#1E272E', // Color de fondo de la tarjeta
            borderRadius: '10px', // Bordes redondeados
            padding: '20px', // Espaciado interno de la tarjeta
            marginBottom: '30px', // Espaciado externo de la tarjeta
            marginTop: '80px', // Margen superior
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={variant.imagen2D} alt={variant.producto.nombre} style={{ width: '200px', height: '200px', borderRadius: '10px' }} />
                    <div style={{ marginLeft: '20px', flex: 1 }}>
                        <h3 style={{ color: '#ffffff' }}>{variant.producto.nombre}</h3>
                        <p style={{ color: '#ffffff' }}>Color: {variant.color.nombre}</p>
                        <p style={{ color: '#ffffff' }}>Tamaño: {variant.tamaño.nombre}</p>
                        {/* Aquí puedes agregar más atributos como el precio, la cantidad disponible, etc. */}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Input para la cantidad */}
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        style={{ margin: '0 0 10px 0', width: '60px' }} // Añadido margen inferior
                    />

                    {/* Botón para añadir al carrito */}
                    <button
                        onClick={handleAddToCart}
                        style={{
                            backgroundColor: '#f00',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '5px' }} />
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}




function ProductDetail() {

const [modalIsOpen, setModalIsOpen] = useState(false);
const initialComments = [
    {user: "Usuario 1", comment: "¡Gran producto!"},
    {user: "Usuario 2", comment: "Muy satisfecho con mi compra."}
];
const [productVariants, setProductVariants] = useState([]); // Nuevo estado para manejar las variantes del producto

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const styles = {
        productDetail: {
            display: 'flex',
            flexDirection: 'row',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        imageContainer: {
            flexBasis: '60%',
        },
        infoContainer: {
            flexBasis: '35%',
            marginLeft: '4px',
        },
        image: {
            width: '100%',
            height: 'auto',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#f00',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };
useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://143.244.183.182/productos/productos/${productId}/`);
                setProduct(response.data);
            } catch (error) {
                console.error('Hubo un error al obtener los detalles del producto', error);
            }
        };

        fetchProductDetails();
         const fetchProductVariants = async () => {
            try {
                const response = await axios.get('http://143.244.183.182/productos/productosdetalle/');
                const filteredVariants = response.data.filter(variant => variant.producto.id === Number(productId));
                setProductVariants(filteredVariants);
            } catch (error) {
                console.error('Hubo un error al obtener las variantes del producto', error);
            }
        };
         fetchProductVariants();
    }, [productId]);
    if (!product) return <p>Cargando detalles del producto...</p>;
      const imageUrls = product.imagenes.map(image => image.ruta_imagen);

    return (
        <div style={styles.productDetail}>
            <div style={styles.imageContainer}>
                <ImageSlider images={imageUrls} />
                {/* Aquí puedes agregar un componente para mostrar y agregar comentarios */}
            </div>

            <div style={styles.infoContainer}>
                <h1>{product.nombre}</h1>
                <p>Precio: ${product.precio}</p>
                <h3>Descripción:</h3>
    <p>{product.descripcion}</p>
 <button style={styles.button} onClick={() => setModalIsOpen(true)}> {/* Aquí cambia a setModalIsOpen(true) */}
                    Ver Detalles de Variantes
                </button>
                <Comments initialComments={initialComments} />
                <Modal
    isOpen={modalIsOpen}
    onRequestClose={() => setModalIsOpen(false)}
    style={{
        content: {
            position: 'absolute',
            top: '40px',
            right: '40px',
            bottom: '40px',
            left: '40%',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
        }
    }}
>
    <button
        onClick={() => setModalIsOpen(false)}
        style={{
            position: 'absolute',
            right: '10px',
            top: '50px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            color: '#1E272E', // Asegurarte de que el color sea visible contra el fondo
            zIndex: 2, // Asegurarte de que el botón esté sobre otros elementos
        }}
    >
        &times; {/* Este es un símbolo de "X" */}
    </button>

    {productVariants.map(variant => (
            <ProductVariantCard key={variant.id} variant={variant} />
        ))}
    </Modal>

            </div>
        </div>
    );
}

export default ProductDetail;
