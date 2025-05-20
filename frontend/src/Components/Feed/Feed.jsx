import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Feed.css";

const Feed = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedVideos");
        setVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="feed-container">
      <h2 className="feed-title">Explore Videos</h2>
      <div className="feed">
        {videos.length > 0 ? (
          videos.map((video) => (
            <Link to={`/video/${video.lessonId}`} key={video.lessonId} className="video-card">
              <div className="thumbnail-wrapper">
                <img
                  src={video.thumbnail || "https://via.placeholder.com/320x180"}
                  alt={video.name}
                  className="video-thumbnail"
                />
              </div>
              <div className="video-details">
                <h3 className="video-title">{video.name}</h3>
                <p className="video-description">{video.description}</p>
                <p className="video-meta">
                  {video.status} • {new Date(video.uploadDate).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-videos">No videos available.</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
