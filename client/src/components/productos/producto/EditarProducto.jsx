import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditarProducto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [descuentoPorcentaje, setDescuentoPorcentaje] = useState('');
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    const [imagenesExistentes, setImagenesExistentes] = useState([]);
    const [error, setError] = useState(null);
    const [subcategoria, setSubcategoria] = useState(''); // Nuevo estado para subcategorías
    const [subcategorias, setSubcategorias] = useState([]); // Nuevo estado para lista de subcategorías


    useEffect(() => {
        axios.get('http://143.244.183.182/productos/categorias/')
            .then(response => {
                setCategorias(response.data);
            })
            .catch(err => {
                console.error("Error al obtener categorías:", err);
                setError("Hubo un error al obtener las categorías. Por favor intenta nuevamente.");
            });
        axios.get(`http://143.244.183.182/productos/imagenesproducto/`)
            .then(response => {
                const todasLasImagenes = response.data;
                const imagenesDelProducto = todasLasImagenes.filter(img => img.producto === parseInt(id));
                setImagenesExistentes(imagenesDelProducto.map(img => ({ url: img.ruta_imagen, id: img.id })));
            })
            .catch(err => {
                console.error("Error al obtener las imágenes:", err);
                setError("Hubo un error al obtener las imágenes. Por favor intenta nuevamente.");
            });

        axios.get(`http://143.244.183.182/productos/productos/${id}/`)
            .then(response => {
                const producto = response.data;
                setNombre(producto.nombre);
                setDescripcion(producto.descripcion);
                setPrecio(producto.precio);
                setDescuentoPorcentaje(producto.descuento_porcentaje);
                setCategoria(producto.categoria || '');
                setSubcategoria(producto.subcategoria || '');
            })
            .catch(err => {
                console.error("Error al obtener el producto:", err);
                setError("Hubo un error al obtener el producto. Por favor intenta nuevamente.");
            });


    }, [id]);
    useEffect(() => {
    if (categoria) {
        axios.get(`http://143.244.183.182/productos/subcategorias/`)
        .then(response => {
            const allSubcategorias = response.data;
            const filteredSubcategories = allSubcategorias.filter(sub => sub.categoria.id === categoria);
            setSubcategorias(filteredSubcategories);
        })
        .catch(err => {
            console.error("Error al obtener subcategorías:", err);
            setError("Hubo un error al obtener las subcategorías. Por favor intenta nuevamente.");
        });
    } else {
        setSubcategorias([]);
    }
}, [categoria]); // <-- Añade categoria como dependencia

    const handleRemove = (imagen) => {
    setImagenesExistentes(prevImgs => prevImgs.filter(img => img.id !== imagen.id));

    axios.delete(`http://143.244.183.182/productos/imagenesproducto/${imagen.id}/`)
    .then(response => {
        console.log('Imagen eliminada con éxito');
    })
    .catch(err => {
        console.error("Error al eliminar la imagen:", err);
        setError("Hubo un error al eliminar la imagen. Por favor intenta nuevamente.");
    });
}


    const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('descuento_porcentaje', descuentoPorcentaje);
    formData.append('categoria', categoria);
    formData.append('subcategoria', subcategoria);

    axios.put(`http://143.244.183.182/productos/productos/${id}/`, formData)
    .then(response => {
        if (imagenes.length) {
            handleUploadImages();  // Si hay imágenes para cargar, llámalo
        } else {
            navigate(`/dashboard/productos/productos/`); // Si no hay imágenes, navega de regreso
        }
    })
    .catch(err => {
        console.error("Error al actualizar el producto:", err);
        setError("Hubo un error al actualizar el producto. Por favor intenta nuevamente.");
    });
}
const handleUploadImages = () => {
    const requests = imagenes.map((image) => {
        const formData = new FormData();
        formData.append('ruta_imagen', image.file);
        formData.append('producto', id);
        return axios.post(`http://143.244.183.182/productos/imagenesproducto/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    });

    Promise.all(requests)
    .then(() => {
        navigate(`/dashboard/productos/productos/`);
    })
    .catch(err => {
        console.error("Error al cargar las imágenes:", err);
        setError("Hubo un error al cargar las imágenes. Por favor intenta nuevamente.");
    });
}





    const handleImagenesChange = (event) => {
    const files = Array.from(event.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)  // crea una URL temporal para la vista previa
    }));
    setImagenes(prevImages => [...prevImages, ...files]);
}
const handleRemovePreview = (imagenToRemove) => {
    setImagenes(prevImgs => prevImgs.filter(img => img !== imagenToRemove));

    // Limpia la URL temporal para liberar memoria
    URL.revokeObjectURL(imagenToRemove.preview);
}


    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Crear Nuevo Producto</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Nombre:</label>
                        <input
                          type="text"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          style={styles.whiteInput}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Descripción:</label>
                        <textarea
                          value={descripcion}
                          onChange={(e) => setDescripcion(e.target.value)}
                          style={styles.whiteInput}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Precio:</label>
                        <input
                          type="text"
                          value={precio}
                          onChange={(e) => setPrecio(e.target.value)}
                          style={styles.whiteInput}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Descuento (%):</label>
                        <input
                          type="text"
                          value={descuentoPorcentaje}
                          onChange={(e) => setDescuentoPorcentaje(e.target.value)}
                          style={styles.whiteInput}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Categoría:</label>
                        <select
                          value={categoria}
                          onChange={(e) => setCategoria(e.target.value)}
                          style={styles.whiteInput}
                        >
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
            <label style={styles.label}>Subcategoría:</label>
            <select
              value={subcategoria}
              onChange={(e) => setSubcategoria(e.target.value)}
              style={styles.whiteInput}
            >
                <option value="">Seleccione una subcategoría</option>
                {subcategorias.map(subcat => (
                    <option key={subcat.id} value={subcat.id}>{subcat.nombre}</option>
                ))}
            </select>
        </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Imágenes Existentes:</label>
                        <div className="imagenes-existentes">
                            {imagenesExistentes.map((imagen, index) => (
                                <div key={imagen.id} style={styles.imagenContenedor}>
                                    <img src={imagen.url} alt={`Imagen ${index}`} style={styles.imagePreview} />
                                    <button onClick={() => handleRemove(imagen)} style={styles.removeImageButton}>Eliminar</button>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Seleccionar Imágenes:</label>
                        <input
                          type="file"
                          multiple
                          onChange={handleImagenesChange}
                          style={styles.submitButton}
                        />
                    </div>
                    <div style={styles.formGroup}>
    <label style={styles.label}>Vista Previa de Imágenes Seleccionadas:</label>
    <div className="imagenes-seleccionadas">
        {imagenes.map((imagen, index) => (
            <div key={index} style={styles.imagenContenedor}>
                <img src={imagen.preview} alt={`Imagen ${index}`} style={styles.imagePreview} />
                <button onClick={() => handleRemovePreview(imagen)} style={styles.removeImageButton}>Eliminar</button>
            </div>
        ))}
    </div>
</div>


                    <button type="submit" style={styles.submitButton}>Actualizar Producto</button>
                </form>
            </div>
        </div>
    );
}

const styles = {
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
    width: '500px',
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
    submitButton: {
    marginTop: '25px',
    backgroundColor: 'white',
    color: '#002855',
    border: 'none',
    borderRadius: '7px',
    cursor: 'pointer',
    padding: '8px 16px',
    fontSize: '18px',
  },
    imagenContenedor: {
        display: 'inline-block',
        position: 'relative',
        margin: '5px'
    },
    removeImageButton: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    textAlign: 'center',
    lineHeight: '20px',
    cursor: 'pointer'
  },
    imagePreview: {
        maxHeight: '100px',
        maxWidth: '100px',
    }
};

export default EditarProducto;
