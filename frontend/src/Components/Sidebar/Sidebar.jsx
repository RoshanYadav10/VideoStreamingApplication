import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import home from '../../assets/home.png';
import game_icon from '../../assets/game_icon.png';
import automobiles from '../../assets/automobiles.png';
import sports from '../../assets/sports.png';
import entertainment from '../../assets/entertainment.png';
import tech from '../../assets/tech.png';
import music from '../../assets/music.png';
import blogs from '../../assets/blogs.png';
import news from '../../assets/news.png';
import jammy from '../../assets/news.png';
import uploads from '../../assets/upload1.png'; 
import { useNavigate } from "react-router-dom"; 

const Sidebar = ({ sidebar }) => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserEmail(payload.email);
    }
  }, []);

  const navigateToUploads = () => {
    navigate("/my-upload");
  };

  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
      <div className="shortcut-links">
        <div className="side-link" onClick={() => navigate("/")}>
          <img src={home} alt="Home" /> <p>Home</p>
        </div>
        <div className="side-link"><img src={game_icon} alt="Gaming" /> <p>Gaming</p></div>
        <div className="side-link"><img src={automobiles} alt="Automobiles" /> <p>Automobiles</p></div>
        <div className="side-link"><img src={sports} alt="Sports" /> <p>Sports</p></div>
        <div className="side-link"><img src={entertainment} alt="Entertainment" /> <p>Entertainment</p></div>
        <div className="side-link"><img src={tech} alt="Technology" /> <p>Technology</p></div>
        <div className="side-link"><img src={music} alt="Music" /> <p>Music</p></div>
        <div className="side-link"><img src={blogs} alt="Blogs" /> <p>Blogs</p></div>
        <div className="side-link"><img src={news} alt="News" /> <p>News</p></div>
        <hr />
        <div className="side-link" onClick={navigateToUploads}>
          <img src={uploads} alt="Uploads" /> <p>My Uploads</p>
        </div>
      </div>

      <div className="subscribed-list">
        <h3>Subscribe</h3>
        <div className="side-link">
          <img src={jammy} alt="Roshan Classes" /> <p>Roshan Classes</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
