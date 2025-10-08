import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", data);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error during registration");
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} placeholder="Name" />
        {errors.name && <p>Name is required</p>}

        <input {...register("email", { required: true })} placeholder="Email" />
        {errors.email && <p>Email is required</p>}

        <input {...register("password", { required: true, minLength: 6 })} type="password" placeholder="Password" />
        {errors.password && <p>Password must be 6+ characters</p>}

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
