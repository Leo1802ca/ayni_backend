// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // 🔥 Importamos las variables del .env

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // 🔥 Usamos la clave secreta desde el entorno

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/api/checkout_sessions', async (req, res) => {
  const { product } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100, // Stripe trabaja en céntimos
          },
          quantity: 1,
        },
      ],
      success_url: 'https://tuweb.com/success',
      cancel_url: 'https://tuweb.com/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating session' });
  }
});

// Puedes añadir app.listen aquí si quieres levantar el servidor localmente:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Cambio mínimo para forzar redeploy

