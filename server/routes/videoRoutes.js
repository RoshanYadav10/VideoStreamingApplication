const express = require('express');
const multer = require('multer');
const { uploadVideo, getCompletedVideosByUser,getCompletedVideosByAllUser, getVideoByLessonId } = require('../controllers/videoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, './uploads');
    } else if (file.mimetype.startsWith('image/')) {
      cb(null, './uploads');
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post(
  '/upload',
  authMiddleware,
  upload.fields([
    { name: 'file', maxCount: 1 }, 
    { name: 'thumbnail', maxCount: 1 },
  ]),
  uploadVideo
);

router.get('/myuploads', authMiddleware, getCompletedVideosByUser);
router.get('/feedVideos',getCompletedVideosByAllUser)
router.get('/videos/:lessonId',authMiddleware, getVideoByLessonId);


module.exports = router;
