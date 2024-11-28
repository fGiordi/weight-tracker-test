import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from './db';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Hardcoded credentials
const VALID_EMAIL = 'test@example.com';
const VALID_PASSWORD = 'password123';

// Login endpoint
app.post('/login', (req: Request, res: Response) => {
 try {
    const { email, password } = req.body;
    console.log('req', req.body)
  
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      res.status(200).json({ 
        message: 'Login successful',
        
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
 } catch (error) {
    console.log('error on login', error)
 }
});

// Weight endpoints
app.get('/weights', (req, res) => {
    try {
        const weights = db.weights.findAll();
        res.json(weights);
    } catch(e) {
        console.log('error on get weights', e)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/weights', (req, res) => {
    try {
        const { value } = req.body;
        if (value === undefined || value <= 0) {
            return res.status(400).json({ error: 'Invalid weight value. It must be a positive number.' });
        }
        const weight = db.weights.create({ value });
        res.status(201).json(weight);
    } catch (e) {
        console.error('Error creating weight:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/weights/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { value } = req.body;

        const numericId = parseInt(id);

        if (typeof value !== 'number' || value <= 0) {
            return res.status(400).json({ error: 'Invalid weight value. It must be a positive number.' });
        }

        const weight = db.weights.update(numericId, { value });
        if (!weight) {
            return res.status(404).json({ error: 'Weight not found.' });
        }

        res.json(weight);
    } catch (e) {
        console.error('Error updating weight:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/weights/:id', (req, res) => {
    try {
      const { id } = req.params;
      const numericId = parseInt(id);
      const success = db.weights.delete(numericId);
      
      if (!success) {
        return res.status(404).json({ error: 'Weight not found' });
      }
  
      res.status(204).send();
    } catch (e) {
      console.error('Error deleting weight:', e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app as default };
