import FrameWithBorder from "../components/registerFrame";
import eclipse1 from "../svgs/Ellipse1.svg";
import eclipse2 from "../svgs/Ellipse2.svg";

const SignupComponent = () => {
  return (
    <div className="bg-customblack flex flex-col bg-black min-h-fit relative mt-5 ">
      <p
        className="hidden sm:block absolute text-white ml-[173px] mt-[430px] font-sans "
        style={{
          fontFamily: "'Noto Sans', sans-serif",
          fontSize: "96px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
          color: "white",
        }}
      >
        Roll the Carpet.!
      </p>
      {/* SVG at the top, hidden on small screens */}
      <img
        src={eclipse1}
        alt="Eclipse 1"
        className="hidden sm:block absolute mr-80 top-4 right-5"
      />

      <svg
        className="hidden sm:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[570px]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="2"
        viewBox="0 0 950 2"
        fill="none"
      >
        <line
          x1="0"
          y1="1"
          x2="1000"
          y2="1"
          stroke="#4D4D4D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="12 12"
        />
      </svg>

      <svg
        className="hidden sm:block absolute  ml-[180px] mt-[530px] "
        xmlns="http://www.w3.org/2000/svg"
        width="244"
        height="80"
        viewBox="0 0 244 80"
        fill="none"
      >
        <text
          x="50%"
          y="50%"
          fill="#FFF"
          font-family="'Noto Sans', sans-serif"
          font-size="32"
          font-style="italic"
          font-weight="600"
          dominant-baseline="middle"
          text-anchor="middle"
        >
          Skip the lag?
        </text>

        <rect
          x="2"
          y="2"
          width="240"
          height="76"
          stroke="white"
          stroke-width="4"
        />
      </svg>

      {/* SVG at the bottom, remains in position on larger screens, hidden on small screens */}
      <img
        src={eclipse2}
        alt="Eclipse 2"
        className=" hidden sm:block absolute mt-[700px] right-9 "
      />

      <div className="flex-grow flex justify-center items-center ">
        <div className=" flex flex-col items-center justify-center sm:absolute sm:right-0 sm:top-0 lg:p-16 md:p-12 sm:p-8 p-4 sm:m-auto ">
          <FrameWithBorder />
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
