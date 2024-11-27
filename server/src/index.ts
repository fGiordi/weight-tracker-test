import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Hardcoded credentials
const VALID_EMAIL = 'test@example.com';
const VALID_PASSWORD = 'password123';

// Login endpoint
app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log('req', req.body)

  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    res.status(200).json({ 
      message: 'Login successful',
      
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app as default };
