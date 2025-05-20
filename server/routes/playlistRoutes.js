const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Authentication middleware
const {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
} = require('../controllers/playlistController'); 

router.post('/create-playlist', authMiddleware, createPlaylist);

router.get('/get-playlists', authMiddleware, getPlaylists);

router.get('/get-playlist/:id', authMiddleware, getPlaylistById);

router.put('/update-playlist/:id', authMiddleware, updatePlaylist);

router.delete('/delete-playlist/:id', authMiddleware, deletePlaylist);

module.exports = router;
