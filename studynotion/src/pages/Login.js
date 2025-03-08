import React from "react";
import Template from "./Template";



function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image src={"https://raw.githubusercontent.com/The-StudyNotion/StudyNotion-V1/refs/heads/main/Client/src/Asset/Image/login.webp"}
      formType="login"
    />
  )
}

export default Login;