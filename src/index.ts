import express, { Express, Request, Response, Application } from 'express';
import dbConnect from './db/dbconnect';
import "dotenv/config";
import UserRoute from "./routes/UserRoute"


const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Ecommerce API backend');
});

app.use(express.json())
app.use(UserRoute)

dbConnect().then(() => {
  app.listen(port, () => {
    console.log(`server is listening on ${port}`);
  })
})




