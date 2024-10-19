import express from 'express';
import productsRouter from './routes/products';

const port = 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

//routes
app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`Ecommerce pp listening on port ${port}`);
});
