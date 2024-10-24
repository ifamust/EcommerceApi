import express, { json, urlencoded } from 'express';
import productsRouter from './routes/products/index.js';
import ordersRouter from './routes/orders/index.js';
import authRouter from './routes/auth/index.js';
import serverless from 'serverless-http';
const port = 3000;

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
  res.send('hello world');
});

//routes
app.use('/auth', authRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);

if (process.env.NODE_ENV === 'dev') {
  app.listen(port, () => {
    console.log(`Ecommerce app listening on port ${port}`);
  });
}

//for serverless deployment
export const handler = serverless(app);
