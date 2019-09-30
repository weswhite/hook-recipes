import React from 'react';

const Toggle = ({ darkMode, setDarkMode }) => (
  <div className="dark-mode-toggle">
    🌞
    <span className="toggle-control">
      <input
        className="dmcheck"
        id="dmcheck"
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
      <label htmlFor="dmcheck" />
    </span>
    🌚
  </div>
);

export default Toggle;
