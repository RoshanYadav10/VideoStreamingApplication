import React, { useEffect, useState } from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo2 from '../../assets/logo2.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload1.png';
import notification_icon from '../../assets/notification.png';
import profile_icon from '../../assets/jammy.png';

const Navbar = ({ setSidebar }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setEmail(payload.email); // assuming the token payload includes email
      } catch (err) {
        console.error('Invalid token:', err);
        setEmail('');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = '/login';
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const handleUpload = () => {
    window.location.href = '/upload';
  };

  const isLoggedIn = Boolean(localStorage.getItem('jwtToken'));

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img
          className="menu-icon"
          onClick={() => setSidebar((prev) => !prev)}
          src={menu_icon}
          alt="menu icon"
        />
        <img
          className="logo"
          src={logo2}
          alt="logo"
          onClick={handleLogoClick}
        />
      </div>

      <div className="nav-middle">
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <img src={search_icon} alt="search icon" />
        </div>
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <>
            <img src={upload_icon} alt="upload icon" onClick={handleUpload} />
            <img src={notification_icon} alt="notification icon" />
            <img src={profile_icon} className="user-icon" alt="profile icon" />
            <span className="user-email">{email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => (window.location.href = '/login')}
            className="login-btn"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
