import express, { Express, Request, Response, Application } from 'express';
import dbConnect from './db/dbconnect';
import "dotenv/config";
import UserRoute from "./routes/userRoute"
import AdminRoute from "./routes/adminRoute"
import CartRoute from "./routes/cartRoute"
import OrderRoute from "./routes/orderRoute"
import ProductRoute from "./routes/productRoute"
import { paymentSettled } from './services/paymentSettled';

const app: Application = express();
const port = process.env.PORT;

app.use(express.json())
app.use(UserRoute)
app.use(AdminRoute)
app.use(ProductRoute)
app.use(CartRoute)
app.use(OrderRoute)


app.get('/', (req: Request, res: Response) => {
  res.send('Ecommerce API backend');
});

dbConnect().then(() => {
  app.listen(port, () => {
    console.log(`server is listening on ${port}`);
  })
}).catch((error) => {
  console.log(`Error connnecting to the database ${error}`)
})

paymentSettled;




