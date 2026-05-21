"use client";

import React from 'react';
import Link from 'next/link';
import CyberRain from "@/components/CyberRain";


const SignupPage = () => {
  return (
    <div className="min-h-screen bg-cyber-black text-white font-sans flex flex-col justify-center items-center relative overflow-hidden">
      {/* Cyber Rain Background */}
      <div className="absolute inset-0 -z-10 opacity-50 overflow-hidden">
        <CyberRain />
      </div>
      
      {/* Glowing Orbs */}

      <div className="absolute top-[-100px] left-1/4 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-100px] right-1/4 w-[600px] h-[600px] bg-electric-purple/10 rounded-full blur-3xl" />

      {/* Back to Home */}
      <Link href="/" className="absolute top-8 left-8 text-white/70 hover:text-white flex items-center gap-2 transition-colors z-20">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>

      <div className="relative z-10">
        <style>{`
          .form {
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 350px;
            padding: 20px;
            border-radius: 20px;
            position: relative;
            background-color: #1a1a1a;
            color: #fff;
            border: 1px solid #333;
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);
          }

          .title {
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -1px;
            position: relative;
            display: flex;
            align-items: center;
            padding-left: 30px;
            color: #00bfff;
          }

          .title::before {
            width: 18px;
            height: 18px;
          }

          .title::after {
            width: 18px;
            height: 18px;
            animation: pulse 1s linear infinite;
          }

          .title::before,
          .title::after {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            border-radius: 50%;
            left: 0px;
            background-color: #00bfff;
          }

          .message, 
          .signin {
            font-size: 14.5px;
            color: rgba(255, 255, 255, 0.7);
          }

          .signin {
            text-align: center;
          }

          .signin a:hover {
            text-decoration: underline royalblue;
          }

          .signin a {
            color: #00bfff;
          }

          .flex {
            display: flex;
            width: 100%;
            gap: 6px;
          }

          .form label {
            position: relative;
          }

          .form label .input {
            background-color: #333;
            color: #fff;
            width: 100%;
            padding: 20px 05px 05px 10px;
            outline: 0;
            border: 1px solid rgba(105, 105, 105, 0.397);
            border-radius: 10px;
          }

          .form label .input + span {
            color: rgba(255, 255, 255, 0.5);
            position: absolute;
            left: 10px;
            top: 0px;
            font-size: 0.9em;
            cursor: text;
            transition: 0.3s ease;
          }

          .form label .input:placeholder-shown + span {
            top: 12.5px;
            font-size: 0.9em;
          }

          .form label .input:focus + span,
          .form label .input:valid + span {
            color: #00bfff;
            top: 0px;
            font-size: 0.7em;
            font-weight: 600;
          }

          .input {
            font-size: medium;
          }

          .submit {
            border: none;
            outline: none;
            padding: 10px;
            border-radius: 10px;
            color: #fff;
            font-size: 16px;
            transition: .3s ease;
            background-color: #00bfff;
            cursor: pointer;
          }

          .submit:hover {
            background-color: #00bfff96;
            box-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
          }

          @keyframes pulse {
            from {
              transform: scale(0.9);
              opacity: 1;
            }

            to {
              transform: scale(1.8);
              opacity: 0;
            }
          }
        `}</style>

        <form className="form">
          <p className="title">Register </p>
          <p className="message">Signup now and get full access to our app. </p>
          <div className="flex">
            <label>
              <input className="input" type="text" placeholder=" " required />
              <span>Firstname</span>
            </label>
            <label>
              <input className="input" type="text" placeholder=" " required />
              <span>Lastname</span>
            </label>
          </div>  
          <label>
            <input className="input" type="email" placeholder=" " required />
            <span>Email</span>
          </label> 
          <label>
            <input className="input" type="password" placeholder=" " required />
            <span>Password</span>
          </label>
          <label>
            <input className="input" type="password" placeholder=" " required />
            <span>Confirm password</span>
          </label>
          <button className="submit" type="button">Submit</button>
          <p className="signin">Already have an acount ? <a href="#">Signin</a> </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
