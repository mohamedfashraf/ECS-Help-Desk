import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const MFAtotp = () => {
  const [inputValues, setInputValues] = useState({
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  });
  const [error, setError] = useState(""); // State to handle errors
  const navigate = useNavigate();
  const { verifyMFA } = useContext(AuthContext); // Assuming verifyMFA is a method in AuthContext to verify MFA code

  const inputRefs = Array.from({ length: 6 }, () => useRef(null));
  const focusNextInput = (index) => {
    if (index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const focusPreviousInput = (index) => {
    if (index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });

    if (value && index < 5) {
      focusNextInput(index);
    }
  };

  const handleKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      !inputValues[`code${index + 1}`] &&
      index > 0
    ) {
      focusPreviousInput(index);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const mfaCode = Object.values(inputValues).join("");

    try {
      const result = await verifyMFA(mfaCode); // Verify the MFA code
      if (result && result.isSuccess) {
        navigate("/dashboard");        // Store the new token
      } else {
        setError("Invalid MFA code. Please try again."); // Set error message
      }
    } catch (error) {
      setError(error.message || "An error occurred during verification");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email ba**@dipainhouse.com</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-16">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="w-16 h-16">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name={`code${index + 1}`}
                      id={`code${index + 1}`}
                      value={inputValues[`code${index + 1}`]}
                      onChange={(e) => handleInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={inputRefs[index]}
                      maxLength={1}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col space-y-5">
                <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                  Verify Account
                </button>

                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                  <p>Didn't receive code?</p>{" "}
                  <a
                    className="flex flex-row items-center text-blue-600"
                    href="#"
                  >
                    Resend
                  </a>
                </div>
              </div>
            </div>
            {error && <div className="text-red-500">{error}</div>}{" "}
            {/* Display error message if any */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MFAtotp;
