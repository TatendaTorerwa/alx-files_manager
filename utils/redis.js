import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });

    this.client.on('connect', () => {
      console.log('Redis client connected to the server');
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
