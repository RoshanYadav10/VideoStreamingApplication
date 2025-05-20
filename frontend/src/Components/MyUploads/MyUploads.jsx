import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyUploads.css';
import VideoPlayer from '../VideoPlayer';

const MyUploads = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); 
        const response = await axios.get('http://localhost:5000/api/myuploads', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        console.log(response.data.videos);
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Error fetching uploaded videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video); 
  };

  return (
    <div className="my-uploads-page">
      <h1>My Uploads</h1>
      {loading ? (
        <p>Loading...</p>
      ) : videos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video.id} className="video-card" onClick={() => handleVideoSelect(video)}>
              <img
                src={video.thumbnail || 'https://via.placeholder.com/150'}
                alt={video.name}
                className="video-thumbnail"
              />
              <div className="video-info">
                <h3 className="video-title">{video.name}</h3>
                <p className="video-stats">
                  {video.description || 'No description'} - {new Date(video.uploadDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedVideo && (
        <div className="video-player-container">
          <h2>{selectedVideo.name}</h2>
          <VideoPlayer
            options={{
              controls: true,
              responsive: true,
              fluid: true,
              sources: [
                {
                  src: selectedVideo.video_url,
                  type: 'application/x-mpegURL',
                },
              ],
            }}
            onReady={(player) => {
              console.log('Player is ready:', player);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MyUploads;
