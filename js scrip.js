const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Sirve archivos estáticos como index.html

// Ruta para checkout (procesar pedido)
app.post('/checkout', (req, res) => {
    const { cart } = req.body;
    // Simula procesamiento (en producción, integra pagos como Stripe)
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    console.log('Pedido recibido:', cart, 'Total:', total);
    
    // Guarda en un archivo JSON (temporal)
    fs.appendFileSync('orders.json', JSON.stringify({ cart, total, date: new Date() }) + '\n');
    
    res.json({ message: 'Pedido procesado exitosamente. Total: $' + total });
});

// Ruta para contacto
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Mensaje de contacto:', { name, email, message });
    res.json({ message: 'Mensaje enviado. Te contactaremos pronto.' });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
