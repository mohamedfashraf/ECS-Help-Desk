import "../components/styles/regframe.css";
import Clouds from "../svgs/Clouds.svg";
import desk from "../svgs/desk.svg"; // Import the desk SVG
import pulb from "../svgs/bulb.svg"; // Make sure this path is correct
import Navbar from "./LandingNav"; // Import the Navbar component
import EcsLayers from "../svgs/EcsLayers.svg"; // Make sure this path is correct
import logo1 from "../svgs/logo1.png"; // Make sure this path is correct
function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gradient-bg">
      {/* Text Content Positioned Independently */}
      <Navbar /> {/* Use the Navbar component */}
      <div
        style={{
          position: "absolute",
          top: "200px",
          left: "35%",
          transform: "translateX(-50%)",
          color: "#FFF",
          fontFamily: "Jost",
          fontSize: "64px",
          fontWeight: 600,
          lineHeight: "87px",
          letterSpacing: "-0.75px",
          textTransform: "capitalize",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          We 
          <span style={{ margin: "0 20px" }}>Provide</span>
          {/* Inline SVG here */}
 <img
            src={pulb}
            alt="Desk"
            style={{ width: "100px", height: "auto" }} // Adjust the style as needed
          />            {/* SVG content */}

            
        </span>
        Smart Business
        <br />
        Solutions
      </div>
      {/* Subtitle Text Content */}
      <div
        style={{
          position: "absolute",
          top: "480px", // Adjust this as needed
          left: "35.5%",
          transform: "translateX(-50%)",
          color: "#FFF",
          fontFamily: "Jost",
          fontSize: "20px", // Smaller font size for the subtitle
          fontWeight: 100, // Lighter font weight
          lineHeight: "20px", // Adjusted line height
        }}
      >
        Grow your Business With Us Best Business Solutions
      </div>
      {/* First SVG Image */}
      <img
        src={Clouds}
        alt="Clouds"
        style={{ width: "1220px", height: "490px", marginLeft: "100px" }}
      />
      {/* Centered Content */}
      <div
        style={{
          width: "100%", // Container takes full width
          flexShrink: 0,
          display: "flex", // Use Flexbox for centering
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
        }}
      >
        {/* First SVG element */}
        <svg
          width="100%" // Set SVG width to 100% to fill the container
          height="auto" // Set height to auto to maintain aspect ratio
          viewBox="0 0 1918 600" // Adjust viewBox as needed
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG Path */}
          <path
            d="M0 740.189L1920 739.689L1920 81.6885C1878 61.6885 1822 50.1885 1744.5 50.1885C1510 64.1885 1386.12 93.7072 1188.5 233.188C1098.5 301.688 976.5 276.835 933 233.188C785 84.6885 668.5 82.6885 581 111.688C241 262.688 70.3608 -24.3967 0 1.68833C0.000102997 138.188 0 740.189 0 740.189Z"
            fill="black"
          />
        </svg>
        <img
          src={EcsLayers}
          alt="Overlay"
          style={{
            position: "absolute",
            width: "500px", // Adjust size as needed
            top: "900px", // Adjust position as needed
            left: "40%", // Adjust position as needed
            transform: "translate(-50%, -50%)", // Center the SVG
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "60%",
            transform: "translateY(-50%)",
          }}
        >
          <img
            src={desk}
            alt="Desk"
            style={{ width: "650px", height: "auto" }} // Adjust the style as needed
          />
        </div>
      </div>
      {/* Footer with a horizontal line and carousel */}
      <footer className="w-full py-4 bg-black text-white flex flex-col items-center">
        <hr className="w-1/2 border-t border-gray-700" />{" "}
        {/* Horizontal line */}
        <div className="my-4">
          {/* Carousel placeholder */}
          <div className="flex justify-center items-center space-x-4">
            {/* Replace these divs with actual company logos */}
            <div className="h-12 w-40 rounded-md flex justify-center items-center">
              <img
                src={logo1}
                alt="Desk"
                style={{ width: "auto", height: "auto" }} // Adjust the style as needed
              />
            </div>
            <div className="h-12 w-40 rounded-md flex justify-center items-center">
              <img
                src={logo1}
                alt="Desk"
                style={{ width: "auto", height: "auto" }} // Adjust the style as needed
              />{" "}
            </div>
            <div className="h-12 w-40 rounded-md flex justify-center items-center">
              <img
                src={logo1}
                alt="Desk"
                style={{ width: "auto", height: "auto" }} // Adjust the style as needed
              />
            </div>
            <div className="h-12 w-40 rounded-md flex justify-center items-center">
              <img
                src={logo1}
                alt="Desk"
                style={{ width: "auto", height: "auto" }} // Adjust the style as needed
              />{" "}
            </div>
            <div className="h-20 w-40 rounded-md flex justify-center items-center">
              <img
                src={logo1}
                alt="Desk"
                style={{ width: "auto", height: "auto" }} // Adjust the style as needed
              />{" "}
            </div>
            {/* Add more logos as needed */}
          </div>
        </div>
        <div className="text-center"></div>
      </footer>
    </div>
  );
}

export default App;
