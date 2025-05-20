const { addVideoToQueue } = require('../services/videoService');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const Video = require('../models/videoModel');
const fs=require('fs');

const getCompletedVideosByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    Video.findCompletedVideosByUser(userId, (err, results) => {
      if (err) {
        console.error('Error fetching videos:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (!results.length) {
        return res.status(404).json({ message: 'No completed videos found.' });
      }

      res.status(200).json({ videos: results });
    });
  } catch (error) {
    console.error('Error fetching completed videos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getCompletedVideosByAllUser = async (req, res) => {
  try {
    Video.findCompletedVideosByAllUsers((err, results) => {
      if (err) {
        console.error('Error fetching videos:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (!results.length) {
        return res.status(404).json({ message: 'No completed videos found.' });
      }

      res.status(200).json({ videos: results });
    });
  } catch (error) {
    console.error('Error fetching completed videos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const uploadVideo = async (req, res) => {
  try {
    const lessonId = uuidv4();
    const videoFile = req.files.file ? req.files.file[0] : null;
    const thumbnailFile = req.files.thumbnail ? req.files.thumbnail[0] : null;

    if (!videoFile || !thumbnailFile) {
      return res.status(400).json({ message: 'Video and thumbnail are required.' });
    }

    const videoPath = videoFile.path;

    const outputPath = path.join(__dirname, '../uploads/courses', lessonId);
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    const thumbnailExtension = path.extname(thumbnailFile.originalname);
    const thumbnailFileName = `thumbnail-${lessonId}${thumbnailExtension}`;
    const thumbnailOutputPath = path.join(outputPath, thumbnailFileName);
    fs.renameSync(thumbnailFile.path, thumbnailOutputPath);

    const thumbnailUrl = `http://localhost:5000/uploads/courses/${lessonId}/${thumbnailFileName}`;

    const videoData = {
      name: req.body.name,
      description: req.body.description,
      genre: req.body.genre,
      playlistId: req.body.playlistId || null,
      path: videoPath,
      thumbnail: thumbnailUrl, 
      userId: req.user.id || null,
      status: 'queued',
      lessonId,
      video_url: null,
    };

    Video.create(videoData, (err) => {
      if (err) {
        console.error('Error saving video details:', err);
        return res.status(500).json({ message: 'Error saving video details' });
      }

      addVideoToQueue({ lessonId, videoPath, outputPath });

      res.status(200).json({
        message: 'Video and thumbnail uploaded successfully. Processing in background.',
        lessonId,
      });
    });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getVideoByLessonId = (req, res) => {
  const { lessonId } = req.params;
  const userId = req.user.id;

  Video.findByLessonId(lessonId, userId, (err, results) => {
    if (err) {
      console.error("Error fetching video:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Video not found." });
    }

    res.status(200).json(results[0]); 
  });
};



module.exports = { uploadVideo, getCompletedVideosByUser,getCompletedVideosByAllUser,getVideoByLessonId };
