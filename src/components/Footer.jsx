import React from 'react';
import './styles/Footer.css';

const Footer = () => (
  <footer className="footer">
    <div>©2024 XELANEPO</div>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/Search">App</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
    <div className="social-icons">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <img src="/facebook.png" alt="Facebook" />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <img src="/instagram.png" alt="Instagram" />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
        <img src="/linkedin.png" alt="LinkedIn" />
      </a>
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
        <img src="/youtube.png" alt="Youtube" />
      </a>
    </div>

  </footer>
);

export { Footer };