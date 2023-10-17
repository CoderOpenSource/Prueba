import React, { useState } from 'react';

export function TareasCreate() {
  const [tarea, setTarea] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Tarea creada: ${tarea}`);
    setTarea('');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Nueva Tarea
          <input
            type="text"
            value={tarea}
            onChange={(e) => setTarea(e.target.value)}
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>Crear Tarea</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f0f0f0'
  },
  form: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)'
  },
  label: {
    display: 'block',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginBottom: '10px'
  },
  button: {
    padding: '10px 15px',
    background: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
