import express from 'express';
import { config } from 'dotenv';

config();

const app = express();

const PUBLIC_ROOT = `${__dirname}/../../public`;

app.use(express.static(PUBLIC_ROOT));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(`${PUBLIC_ROOT}/index.html`);
});

app.get('/api/test', (req, res) => {
  const testData = {
    name: 'てすとマン',
    age: 40,
    profile: 'もう生き遅れてしまった中年男性。しかし家庭を持つ夢は諦めていない',
  };
  res.send(testData);
});

type Post = {
  userName: string;
  age: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post<any, any, Post>('/api/post/test', (req, res) => {
  res.send(req.body);
});

const PORT = parseInt(process.env.SERVER_PORT || '8080', 10);
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} へ急げ！`);
});
