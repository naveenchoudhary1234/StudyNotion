import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../services/operation/authApi";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
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
      <label className="relative w-full">
        <p className="mb-1 text-sm font-medium text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
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
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100 hover:text-blue-200 transition-all duration-200">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-lg bg-yellow-50 py-2 px-4 font-medium text-richblack-900 hover:bg-yellow-100 transition-all duration-200"
      >
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;