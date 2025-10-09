import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, data);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", { required: true })} placeholder="Email" />
        {errors.email && <p>Email is required</p>}

        <input {...register("password", { required: true })} type="password" placeholder="Password" />
        {errors.password && <p>Password is required</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
