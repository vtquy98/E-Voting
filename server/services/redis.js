import redis from 'redis';
import bluebird from 'bluebird';
bluebird.promisifyAll(redis);

const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});
client.on('error', e => console.error('Redis Error:', e));

module.exports = client;
