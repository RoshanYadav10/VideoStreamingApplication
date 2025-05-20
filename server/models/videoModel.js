const db = require('../config/db');

const Video = {
  create: (videoData, callback) => {
    const query = `
      INSERT INTO videos 
      (name, description, genre, playlistId, path, thumbnail, userId, status, lessonId, video_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      videoData.name,
      videoData.description,
      videoData.genre,
      videoData.playlistId || null,
      videoData.path,
      videoData.thumbnail, 
      videoData.userId,
      videoData.status || 'queued', 
      videoData.lessonId,
      videoData.video_url || null,
    ];
    db.query(query, params, callback);
  },

  findByUserId: (userId, callback) => {
    const query = 'SELECT * FROM videos WHERE userId = ?';
    db.query(query, [userId], callback);
  },

  findCompletedVideosByUser: (userId, callback) => {
    const query = 'SELECT * FROM videos WHERE userId = ? AND status = "completed"';
    db.query(query, [userId], callback);
  },
  findCompletedVideosByAllUsers: (callback) => {
    const query = 'SELECT * FROM videos WHERE status = "completed"';
    db.query(query, callback);
  },
  findByLessonId: (lessonId, userId, callback) => {
  const query = `
    SELECT 
      videos.*, 
      playlists.type AS playlistType, 
      playlists.price AS playlistPrice,
      CASE 
        WHEN playlists.id IS NULL THEN TRUE
        WHEN playlists.type = 'free' THEN TRUE
        ELSE EXISTS (
          SELECT 1 
          FROM payments 
          WHERE payments.userId = ? 
            AND payments.playlistId = playlists.id
        )
      END AS userPaidForPlaylist
    FROM 
      videos 
    LEFT JOIN 
      playlists 
    ON 
      videos.playlistId = playlists.id
    WHERE 
      videos.lessonId = ?;
  `;

  db.query(query, [userId, lessonId], callback);
},

  
  
  

  updateStatus: (videoId, status, callback) => {
    const query = 'UPDATE videos SET status = ? WHERE lessonId = ?';
    db.query(query, [status, videoId], callback);
  },

  updateVideoUrl: (videoId, videoUrl, callback) => {
    const query = 'UPDATE videos SET video_url = ? WHERE lessonId = ?';
    db.query(query, [videoUrl, videoId], callback);
  }
};

module.exports = Video;
