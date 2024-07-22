import React from 'react';
import { headerStyles, logoStyles, profileStyles } from './Header.css';

const Header: React.FC = () => {
  return (
    <header className={headerStyles}>
      <div className={logoStyles}>Workspace</div>
      <div className={profileStyles}>CN</div>
    </header>
  );
};

export default Header;
