import React, { useState } from "react";

function PageCustomizationSettings() {
  // State for storing selected colors
  const [sidebarColor, setSidebarColor] = useState("lightblue");
  const [backgroundColor, setBackgroundColor] = useState("white");

  // Event handlers for dropdown changes
  const handleSidebarColorChange = (e) => {
    setSidebarColor(e.target.value);
  };

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  return (
    <div>
      <div>
        <label>Sidebar Color: </label>
        <select value={sidebarColor} onChange={handleSidebarColorChange}>
          <option value="lightblue">Light Blue</option>
          <option value="lightgreen">Light Green</option>
          <option value="lightpink">Light Pink</option>
          {/* Add more color options as needed */}
        </select>
      </div>

      <div>
        <label>Background Color: </label>
        <select value={backgroundColor} onChange={handleBackgroundColorChange}>
          <option value="white">White</option>
          <option value="beige">Beige</option>
          <option value="lavender">Lavender</option>
          {/* Add more color options as needed */}
        </select>
      </div>

      {/* Apply the selected colors to a sample sidebar and background */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "200px",
            height: "300px",
            backgroundColor: sidebarColor,
          }}
        >
          Sidebar
        </div>
        <div style={{ flex: 1, backgroundColor: backgroundColor }}>
          Page Content
        </div>
      </div>
    </div>
  );
}

export default PageCustomizationSettings;
