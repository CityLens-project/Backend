import Redis from "ioredis";

export class RedisCacheProvider {
  client;

  constructor(config) {
    this.client = new Redis({
      port: config.port,
      host: config.host,
      password: config.password,
      lazyConnect: true,
      maxLoadingRetryTime: 3,
    });

    // this.client = new Redis(config.url, {
    //   maxRetriesPerRequest: 3,
    //   retryStrategy(times) {
    //     return Math.min(times * 500, 3000);
    //   },
    // });

    this.client
      .connect()
      .catch((err) => console.log("fail to connect to redis", err.message));
  }

  async set(key, value, ttl) {
    return this.client.set(key, value, "EX", ttl);
  }

  async get(key) {
    return this.client.get(key);
  }

  async del(key) {
    return this.client.del(key);
  }
}
