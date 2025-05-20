const db = require('../config/db'); 

const Playlist = {
  findByUserId: (userId, callback) => {
    const query = 'SELECT * FROM playlists WHERE user = ?';
    db.query(query, [userId], callback);
  },

  
  create: (playlistData, callback) => {
    const query = 'INSERT INTO playlists (name, type, user,price) VALUES (?, ?, ?,?)';
    db.query(query, [playlistData.name, playlistData.type, playlistData.user,playlistData.price], callback);
  },

  findById: (playlistId, callback) => {
    const query = 'SELECT * FROM playlists WHERE id = ?';
    db.query(query, [playlistId], callback);
  },

  updateById: (playlistId, playlistData, callback) => {
    const query = 'UPDATE playlists SET name = ?, type = ? WHERE id = ?';
    db.query(query, [playlistData.name, playlistData.type, playlistId], callback);
  },

  deleteById: (playlistId, callback) => {
    const query = 'DELETE FROM playlists WHERE id = ?';
    db.query(query, [playlistId], callback);
  },
};

module.exports = Playlist;
