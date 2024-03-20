import React from 'react';
import "./TopBar.css"
import { FaGithub } from 'react-icons/fa'; // Assuming you're using react-icons for icons

interface TopBarProps {
  title: string;
  description: string;
  githubLink: string;
}

const TopBar: React.FC<TopBarProps> = ({ title, description, githubLink }) => {
  return (
    <div className="top-bar">
      <div className="project-info">
        <h1>{title}</h1>
        <h4>{description}</h4>
      </div>
      <div className="github-link">
        <a href={githubLink} target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} />
        </a>
      </div>
    </div>
  );
};

export default TopBar;
