import SignInFrame from "../components/signInFrame";
import eclipse3 from "../svgs/Ellipse3.svg";
import eclipse4 from "../svgs/Ellipse4.svg";

const LoginComponent = () => {
  return (
    <div className=" flex flex-col min-h-fit relative mt-5 ">
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
        Welcome Back .!{" "}
      </p>
      {/* SVG at the top, hidden on small screens */}
      <img
        src={eclipse3}
        alt="Eclipse 3"
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="12 12"
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
          fontFamily="'Noto Sans', sans-serif"
          fontSize="32"
          fontStyle="italic"
          fontWeight="600"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          Skip the lag?
        </text>

        <rect
          x="2"
          y="2"
          width="240"
          height="76"
          stroke="white"
          strokeWidth="4"
        />
      </svg>

      {/* SVG at the bottom, remains in position on larger screens, hidden on small screens */}
      <img
        src={eclipse4}
        alt="Eclipse 4"
        className=" hidden sm:block absolute mt-[700px] right-9 "
      />

      <div className="flex-grow flex justify-center items-center ">
        <div className=" flex flex-col items-center justify-center sm:absolute sm:right-0 sm:top-0 lg:p-16 md:p-12 sm:p-8 p-4 sm:m-auto ">
          <SignInFrame />
        </div>
      </div>
    </div>
  );
};

//

export default LoginComponent;