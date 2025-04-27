const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Ruta principal
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Ayni funcionando correctamente 🎉' });
});

// Ejemplo ruta productos
app.get('/productos', (req, res) => {
  const productos = [
    { id: 1, nombre: 'Vela artesanal', precio: 15 },
    { id: 2, nombre: 'Taza de cerámica', precio: 25 },
    { id: 3, nombre: 'Bandeja de madera', precio: 30 }
  ];
  res.json(productos);
});

app.listen(PORT, () => {
  console.log(`API funcionando en el puerto ${PORT}`);
});
