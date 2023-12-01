import FrameWithBorder from "./registerFrame";
import eclipse1 from "../svgs/Ellipse1.svg";
import eclipse2 from "../svgs/Ellipse2.svg";

const SignupComponent = () => {
  return (
    <div className="bg-customblack flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className=" relative">
          {" "}
          {/* This is the container */}
          <div className="absolute top-0 right-0">
            <div className="p-16 mt-[1000px]">
              <FrameWithBorder />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
