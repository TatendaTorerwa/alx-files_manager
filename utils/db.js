import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

/**
 * Represents a MongoDB client.
 */

class DBClient {
  /**
   * Creates a new DBClient instance.
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.connect(); // Start connecting
  }

  async connect() {
    try {
      await this.client.connect(); // Await the connection
      console.log('MongoDB connected successfully');

      this.client.on('error', (error) => {
        console.error('MongoDB connection error:', error);
      });
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    try {
      const db = this.client.db();
      const userCollection = db.collection('users');
      return userCollection.countDocuments();
    } catch (error) {
      console.error('Error retrieving user count:', error);
      return 0; // Handle the error gracefully
    }
  }

  async nbFiles() {
    try {
      const db = this.client.db();
      const fileCollection = db.collection('files');
      return fileCollection.countDocuments();
    } catch (error) {
      console.error('Error retrieving file count:', error);
      return 0; // Handle the error gracefully
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
