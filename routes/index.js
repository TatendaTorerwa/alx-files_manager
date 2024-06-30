import express from 'express';
import AppController from '../controllers/AppController';

const router = express.Router();

// App Controller

// should return if Redis is alive and if the DB is alive
router.get('/status', (req, res) => {
  AppController.getStatus(req, res);
});

// should return the number of users and files in DB
router.get('/stats', (req, res) => {
  AppController.getStats(req, res);
});

// User Controller

// should create a new user in DB
router.post('/users', (req, res) => {
  UsersController.postNew(req, res);
  });

export default router;