import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UploadVideo.css";

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null); // Added state for thumbnail
  const [videoName, setVideoName] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const navigate = useNavigate();

  // Fetch playlists from the backend
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
        alert("Error fetching playlists");
      }
    };
    fetchPlaylists();
  }, []);

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadStatus("");

    const formData = new FormData();
    formData.append("file", videoFile); 
    formData.append("thumbnail", thumbnailFile); 
    formData.append("name", videoName);
    formData.append("description", videoDescription);
    formData.append("genre", selectedGenre);
    formData.append("playlistId", selectedPlaylist);

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.lessonId) {
        setUploadStatus(`Video uploaded successfully with Thumbnail. Lesson ID: ${response.data.lessonId}`);
      }

      setLoading(false);
      setVideoFile(null);
      setThumbnailFile(null);
      setVideoName("");
      setVideoDescription("");
      setSelectedGenre("");
      setSelectedPlaylist("");
    } catch (error) {
      console.error("Error uploading video:", error);
      setLoading(false);
      setUploadStatus("Error uploading video.");
      alert("Error uploading video.");
    }
  };

  const navigateToCreatePlaylist = () => {
    navigate("/create-playlist");
  };

  return (
    <div className="upload-video-container">
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit} className="upload-video-form">
        <div className="form-group">
          <label>Video Name</label>
          <input
            type="text"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
            placeholder="Enter video name"
            required
          />
        </div>

        <div className="form-group">
          <label>Video Description</label>
          <textarea
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            placeholder="Enter video description"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Video Genre</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            required
          >
            <option value="">Select Genre</option>
            <option value="gaming">Gaming</option>
            <option value="automobiles">Automobiles</option>
            <option value="education">Education</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="technology">Technology</option>
            <option value="music">Music</option>
            <option value="blog">Blog</option>
            <option value="news">News</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Select Playlist (Optional)</label>
          <select
            value={selectedPlaylist}
            onChange={(e) => setSelectedPlaylist(e.target.value)}
          >
            <option value="">Select Playlist</option>
            {playlists.map((playlist) => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.name} ({playlist.type})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>

      {uploadStatus && <div className="upload-status">{uploadStatus}</div>}

      <div className="create-playlist-option">
        <p>Don't have a playlist yet? </p>
        <button onClick={navigateToCreatePlaylist}>Create Playlist</button>
      </div>
    </div>
  );
};

export default UploadVideo;
