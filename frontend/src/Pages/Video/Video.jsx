import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import PlayVideo from "../../Components/PlayVideo/PlayVideo";
import Recommended from "../../Components/Recommended/Recommended";
import "./Video.css";

const Video = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        const response = await axios.get(`http://localhost:5000/api/videos/${lessonId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const videoData = response.data;
        console.log(response.data);

        if (videoData.playlistType !== "free" && !videoData.userPaidForPlaylist) {
          Swal.fire({
            title: "This playlist is not free!",
            text: `You need to pay ₹${videoData.playlistPrice} to access it.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Proceed to Payment",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/payment", {
                state: {
                  playlistId: videoData.playlistId,
                  playlistPrice: videoData.playlistPrice,
                },
              });
            } else {
              navigate("/");
            }
          });
        } else {
          setSelectedVideo(videoData); 
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    fetchVideoDetails();
  }, [lessonId, navigate]);

  if (!selectedVideo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="play-container">
      <PlayVideo video={selectedVideo} />
      <Recommended />
    </div>
  );
};

export default Video;
