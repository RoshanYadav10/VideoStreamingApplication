import Queue from 'bull';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import db from '../config/db.js';

// Create a Bull queue
const videoQueue = new Queue('video processing', {
    redis: {
        host: 'localhost',
        port: 6379,
    },
});

// Process the video upload jobs
videoQueue.process(async (job) => {
    const { lessonId, videoPath } = job.data;
    const outputPath = path.join(__dirname, '..', 'uploads', 'courses', lessonId);
    const hlsPath = path.join(outputPath, 'index.m3u8');

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;

    return new Promise((resolve, reject) => {
        exec(ffmpegCommand, async (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return reject(new Error(`Video processing failed: ${error.message}`));
            }

            const videoUrl = `http://localhost:8000/uploads/courses/${lessonId}/index.m3u8`;

            // Update the video URL in the database
            const sql = 'UPDATE videos SET video_url = ? WHERE lesson_id = ?';
            await db.query(sql, [videoUrl, lessonId]);

            console.log(`Video processed: ${videoUrl}`);
            resolve(videoUrl);
        });
    });
});

// Listen for completed jobs
videoQueue.on('completed', (job, result) => {
    console.log(`Video processing completed: ${job.id}`);
});

// Listen for failed jobs
videoQueue.on('failed', (job, err) => {
    console.error(`Job failed: ${job.id} with error: ${err}`);
});

// Set the number of retries and backoff strategy for failed jobs
videoQueue.on('failed', (job, err) => {
    const maxRetries = 3; // Maximum number of retries
    const backoffTime = 5000; // Backoff time in milliseconds

    if (job.attemptsMade < maxRetries) {
        console.log(`Retrying job ${job.id}... Attempt: ${job.attemptsMade + 1}`);
        videoQueue.add(job.data, {
            attempts: maxRetries, // Set maximum attempts for retrying
            backoff: {
                type: 'fixed',
                delay: backoffTime,
            },
        });
    } else {
        console.error(`Job ${job.id} has failed after ${maxRetries} attempts`);
    }
});

export default videoQueue;
