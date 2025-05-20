import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreatePlaylist.css";

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistType, setPlaylistType] = useState("free");
  const [price, setPrice] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get("http://localhost:5000/api/get-playlists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("jwtToken");
      const requestData = {
        name: playlistName,
        type: playlistType,
      };

      if (playlistType === "paid") {
        requestData.price = price; 
      }

      const response = await axios.post("http://localhost:5000/api/create-playlist", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Playlist created successfully!");
      setLoading(false);
      setPlaylistName("");
      setPrice(""); 
      setPlaylistType("free"); 

      const fetchResponse = await axios.get("http://localhost:5000/api/get-playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaylists(fetchResponse.data);
    } catch (error) {
      console.error("Error creating playlist:", error);
      setLoading(false);
      alert("Error creating playlist");
    }
  };

  return (
    <div className="create-playlist-container">
      <h2>Create Playlist</h2>
      <form onSubmit={handleSubmit} className="create-playlist-form">
        <div className="form-group">
          <label>Playlist Name</label>
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="Enter playlist name"
            required
          />
        </div>

        <div className="form-group">
          <label>Playlist Type</label>
          <select
            value={playlistType}
            onChange={(e) => setPlaylistType(e.target.value)}
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {playlistType === "paid" && (
          <div className="form-group">
            <label>Price (INR)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price in INR"
              required={playlistType === "paid"} 
            />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Playlist"}
        </button>
      </form>

      <div className="playlist-list">
        <h3>Your Playlists</h3>
        {playlists.length > 0 ? (
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <strong>{playlist.name}</strong> - {playlist.type === "free" ? "Free" : `Paid (₹${playlist.price || 0})`}
              </li>
            ))}
          </ul>
        ) : (
          <p>No playlists created yet.</p>
        )}
      </div>
    </div>
  );
};

export default CreatePlaylist;
