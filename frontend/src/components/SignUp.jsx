import FrameWithBorder from "./registerFrame";
import eclipse1 from "../svgs/Ellipse1.svg";
import eclipse2 from "../svgs/Ellipse2.svg";

const SignupComponent = () => {
  return (
    <div className="bg-custom-black min-h-screen">
    
      {/* SVG Background */}
      <div className="p-8 absolute inset-y ml-[83%] mt-[42%]">
        <img src={eclipse2} alt="ecblipse1" />
      </div>
      <div className="p-8 absolute inset-y ml-[63%]">
        <img src={eclipse1} alt="ecblipse1" />
      </div>
      <div className="p-16 absolute mt-[3%] inset-y right-10">
        <FrameWithBorder />
      </div>
      
    </div>
  );
};

export default SignupComponent;
