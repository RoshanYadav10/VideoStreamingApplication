const Playlist = require('../models/playlistModel'); 
const authMiddleware = require('../middleware/authMiddleware'); 

exports.createPlaylist = async (req, res) => {
  const { name, type,price } = req.body;

  if (!name || !type || !price) {
    return res.status(400).json({ message: "Playlist name and type are required" });
  }

  try {
   
    const newPlaylist = {
      name,
      type,
      user: req.user.id, 
      price
    };
    console.log(newPlaylist.price)
    
    Playlist.create(newPlaylist, (error, result) => {
      if (error) {
        console.log(error)
        return res.status(500).json({ message: "Error creating playlist", error });
      }
      res.status(201).json(result); 
    });
  } catch (error) {
    console.error("Error in creating playlist:", error);
    res.status(500).json({ message: "Error creating playlist" });
  }
};

exports.getPlaylists = async (req, res) => {
  try {
    Playlist.findByUserId(req.user.id, (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Error fetching playlists", error });
      }
      res.status(200).json(result); 
    });
  } catch (error) {
    console.error("Error in fetching playlists:", error);
    res.status(500).json({ message: "Error fetching playlists" });
  }
};

exports.getPlaylistById = async (req, res) => {
  const { id } = req.params;

  try {
    Playlist.findById(id, (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Error fetching playlist", error });
      }
      if (!result) {
        return res.status(404).json({ message: "Playlist not found" });
      }
      res.status(200).json(result); 
    });
  } catch (error) {
    console.error("Error in fetching playlist by ID:", error);
    res.status(500).json({ message: "Error fetching playlist" });
  }
};

exports.updatePlaylist = async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: "Playlist name and type are required" });
  }

  try {
    const updatedPlaylist = {
      name,
      type,
    };

    Playlist.updateById(id, updatedPlaylist, (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Error updating playlist", error });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Playlist not found" });
      }
      res.status(200).json({ message: "Playlist updated successfully", updatedPlaylist });
    });
  } catch (error) {
    console.error("Error in updating playlist:", error);
    res.status(500).json({ message: "Error updating playlist" });
  }
};

exports.deletePlaylist = async (req, res) => {
  const { id } = req.params;

  try {
    Playlist.deleteById(id, (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Error deleting playlist", error });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Playlist not found" });
      }
      res.status(200).json({ message: "Playlist deleted successfully" });
    });
  } catch (error) {
    console.error("Error in deleting playlist:", error);
    res.status(500).json({ message: "Error deleting playlist" });
  }
};
