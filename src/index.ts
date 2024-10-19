import express, { json, urlencoded } from 'express';
import productsRouter from './routes/products';

const port = 3000;

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
  res.send('hello world');
});

//routes
app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`Ecommerce pp listening on port ${port}`);
});
