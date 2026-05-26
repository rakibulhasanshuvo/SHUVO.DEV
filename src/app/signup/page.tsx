"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CyberRain from "@/components/CyberRain";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setErrorMsg("");
    setSuccess(false);

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Email and password are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      console.error("Supabase Auth error:", err);
      setErrorMsg(err.message || "Failed to compile admin registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white font-satoshi flex flex-col justify-center items-center relative overflow-hidden">
      {/* Cyber Rain Background */}
      <div className="absolute inset-0 -z-10 opacity-50 overflow-hidden">
        <CyberRain />
      </div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-[-100px] left-1/4 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-100px] right-1/4 w-[600px] h-[600px] bg-electric-purple/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Home */}
      <Link href="/" className="absolute top-8 left-8 text-white/70 hover:text-white flex items-center gap-2 transition-colors z-20">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>

      <div className="relative z-10 w-full max-w-[380px] px-4">
        <style>{`
          .form {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;
            padding: 24px;
            border-radius: 24px;
            position: relative;
            background-color: #0b0b0d;
            color: #fff;
            border: 1px solid rgba(235, 22, 22, 0.15);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(235, 22, 22, 0.05);
          }

          .title {
            font-size: 26px;
            font-weight: 800;
            letter-spacing: -0.5px;
            position: relative;
            display: flex;
            align-items: center;
            padding-left: 28px;
            color: #ffffff;
            font-family: var(--font-cabinet, sans-serif);
          }

          .title::before {
            width: 14px;
            height: 14px;
          }

          .title::after {
            width: 14px;
            height: 14px;
            animation: pulse 1.2s linear infinite;
          }

          .title::before,
          .title::after {
            position: absolute;
            content: "";
            height: 12px;
            width: 12px;
            border-radius: 50%;
            left: 0px;
            background-color: #eb1616;
          }

          .message, 
          .signin {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
            font-weight: 500;
          }

          .signin {
            text-align: center;
            margin-top: 6px;
          }

          .signin a:hover {
            color: #eb1616;
            text-decoration: underline;
          }

          .signin a {
            color: rgba(255, 255, 255, 0.8);
            font-weight: bold;
            transition: color 0.2s;
          }

          .flex {
            display: flex;
            width: 100%;
            gap: 10px;
          }

          .form label {
            position: relative;
            width: 100%;
          }

          .form label .input {
            background-color: #030303;
            color: #fff;
            width: 100%;
            padding: 18px 10px 6px 12px;
            outline: 0;
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            transition: border-color 0.3s;
          }

          .form label .input:focus {
            border-color: rgba(235, 22, 22, 0.4);
          }

          .form label .input + span {
            color: rgba(255, 255, 255, 0.4);
            position: absolute;
            left: 12px;
            top: 4px;
            font-size: 0.8em;
            cursor: text;
            transition: 0.3s ease;
            pointer-events: none;
          }

          .form label .input:placeholder-shown + span {
            top: 12px;
            font-size: 0.85em;
          }

          .form label .input:focus + span,
          .form label .input:not(:placeholder-shown) + span {
            color: #eb1616;
            top: 2px;
            font-size: 0.65em;
            font-weight: bold;
          }

          .input {
            font-size: 13px;
          }

          .submit {
            border: none;
            outline: none;
            padding: 12px;
            border-radius: 12px;
            color: #fff;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            transition: .3s ease;
            background-color: #eb1616;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(235, 22, 22, 0.2);
          }

          .submit:hover:not(:disabled) {
            background-color: #c71212;
            box-shadow: 0 4px 15px rgba(235, 22, 22, 0.3);
          }

          .submit:disabled {
            opacity: 0.5;
            cursor: not-allowed;
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

        <form className="form" onSubmit={handleRegisterSubmit}>
          <p className="title">Register</p>
          <p className="message">Signup now to configure the administrative portfolio dashboard.</p>
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-bold">
              ⚠ {errorMsg}
            </div>
          )}

          {success && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold">
              ✓ Admin compilation success! Redirecting...
            </div>
          )}

          <div className="flex">
            <label>
              <input 
                className="input" 
                type="text" 
                placeholder=" " 
                required 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <span>Firstname</span>
            </label>
            <label>
              <input 
                className="input" 
                type="text" 
                placeholder=" " 
                required 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <span>Lastname</span>
            </label>
          </div>  
          
          <label>
            <input 
              className="input" 
              type="email" 
              placeholder=" " 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
          </label> 
          
          <label>
            <input 
              className="input" 
              type="password" 
              placeholder=" " 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
          </label>
          
          <label>
            <input 
              className="input" 
              type="password" 
              placeholder=" " 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span>Confirm password</span>
          </label>
          
          <button className="submit" type="submit" disabled={loading}>
            {loading ? "Compiling..." : "Submit"}
          </button>
          
          <p className="signin">Already have an account? <Link href="/dashboard">Signin</Link></p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
