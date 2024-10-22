import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT || 3002;

const corsOptions = {
  origin: `${process.env.FRONT_END_URL}`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'This is backend' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

