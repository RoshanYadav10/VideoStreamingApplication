const Queue = require('bull');
const redisClient = require('../models/redisClient');

const videoQueue = new Queue('video-processing', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});

// Define job events
videoQueue.on('completed', (job) => {
  console.log(`Job completed: ${job.id}`);
});

videoQueue.on('failed', (job, error) => {
  console.error(`Job failed: ${job.id}, error: ${error.message}`);
});

// Add a job to the queue
const addVideoToQueue = async (videoData) => {
  await videoQueue.add(videoData);
};

module.exports = { videoQueue, addVideoToQueue };
