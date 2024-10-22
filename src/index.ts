import express, { json, urlencoded } from 'express';
import productsRouter from './routes/products';
import authRouter from './routes/auth';

const port = 3000;

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
  res.send('hello world');
});

//routes
app.use('/products', productsRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Ecommerce app listening on port ${port}`);
});
