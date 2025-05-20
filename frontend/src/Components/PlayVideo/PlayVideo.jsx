import React from "react";
import "./PlayVideo.css";
import like1 from "../../assets/like1.png";
import dislike1 from "../../assets/dislike1.png";
import share11 from "../../assets/share11.jpg";
import jammy from "../../assets/jammy.png";
import user_profile from "../../assets/user_profile.jpg";
import { VideoPlayer } from "../VideoPlayer";  

const PlayVideo = ({ video }) => {
  return (
    <div className="play-video">
      <div className="video-player-container">
        <VideoPlayer
          options={{
            controls: true,
            responsive: true,
            fluid: true,
            sources: [
              {
                src: video.video_url, 
                type: "application/x-mpegURL",
              },
            ],
          }}
          onReady={(player) => {
            console.log("Player is ready:", player);
          }}
        />
      </div>
      <h2>{video.name}</h2>
      <h4>{video.description}</h4>

      <div className="play-video-info">
        <p>{video.views} views &bull; {new Date(video.uploadDate).toLocaleDateString()}</p>
        <div>
          <span><img src={like1} alt="" />{video.likes}</span>
          <span><img src={dislike1} alt="" />{video.dislikes}</span>
          <span><img src={share11} alt="" />Share</span>
        </div>
      </div>

      <hr />

      <div className="publisher">
        <img src={jammy} alt="" />
        <div>
          <p>{video.publisher}</p>
          <span>{video.publisherSubscribers} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>{video.description}</p>
        <hr />
        <h4>100 Comments</h4>
        <div className="comment">
          <img src={user_profile} alt="" />
          <div>
            <h3>Ketan <span> 1 day ago</span></h3>
            <p>Awesome video! I learned a lot.</p>
            <div className="comment-action">
              <img src={like1} alt="" />
              <span>250</span>
              <img src={dislike1} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
