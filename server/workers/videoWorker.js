const { videoQueue } = require('../services/videoService');
const { exec } = require('child_process');
const fs = require('fs');
const Video = require('../models/videoModel'); 

videoQueue.process(async (job) => {
  const { lessonId, videoPath, outputPath } = job.data;

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  const hlsPath = `${outputPath}/index.m3u8`;

  const ffmpegCommand = `ffmpeg -i "${videoPath}" -codec:v libx264 -codec:a aac \
  -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" "${hlsPath}"`;

  try {
    await new Promise((resolve, reject) => {
      exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`FFmpeg error: ${stderr}`);
          return reject(error);
        }
        console.log('FFmpeg processing complete');
        resolve();
      });
    });

    const videoUrl = `http://localhost:5000/uploads/courses/${lessonId}/index.m3u8`;
    Video.updateStatus(lessonId, 'completed', (err) => {
      if (err) {
        console.error('Error updating video status:', err);
      }
    });

    Video.updateVideoUrl(lessonId, videoUrl, (err) => {
      if (err) {
        console.error('Error updating video URL:', err);
      }
    });

  } catch (error) {
    console.error('Video processing failed:', error);
    Video.updateStatus(lessonId, 'failed', (err) => {
      if (err) {
        console.error('Error updating video status:', err);
      }
    });
  }
});
