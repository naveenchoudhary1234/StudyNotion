import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sendOtp } from "../services/operation/authApi";
import { setSignupData } from "../slices/authSlice";
import { ACCOUNT_TYPE } from "../utils/constants";
import Tab from "./Tab";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    };

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData));
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-richblack-800 rounded-lg shadow-lg">
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label className="w-full">
            <p className="mb-1 text-sm font-medium text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full px-4 py-2 rounded-lg bg-richblack-700 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>
          <label className="w-full">
            <p className="mb-1 text-sm font-medium text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full px-4 py-2 rounded-lg bg-richblack-700 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-sm font-medium text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full px-4 py-2 rounded-lg bg-richblack-700 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative w-full">
            <p className="mb-1 text-sm font-medium text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full px-4 py-2 rounded-lg bg-richblack-700 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative w-full">
            <p className="mb-1 text-sm font-medium text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded-lg bg-richblack-700 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-lg bg-yellow-50 py-2 px-4 font-medium text-richblack-900 hover:bg-yellow-100 transition-all duration-200"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;