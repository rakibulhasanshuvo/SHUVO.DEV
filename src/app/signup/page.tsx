"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CyberRain from "@/components/CyberRain";

const SignupPage = () => {
  const [isLogin, setIsLogin] = useState(false); // Toggle state for Login / Register modes
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [inviteCode, setInviteCode] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setErrorMsg("");
    setSuccess(false);

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Email and password are required.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (!isLogin) {
      const expectedInviteCode = process.env.NEXT_PUBLIC_ADMIN_INVITE_CODE;
      if (!expectedInviteCode) {
        setErrorMsg("Admin registration is currently disabled (missing invite code configuration).");
        return;
      }
      if (inviteCode.trim() !== expectedInviteCode) {
        setErrorMsg("Invalid admin invite code.");
        return;
      }
    }

    setLoading(true);

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      
      if (isLogin) {
        // 1. Sign In Existing User
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (error) {
          throw new Error(error.message);
        }

        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        // 2. Sign Up New User
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
      }
    } catch (err: any) {
      console.error("Supabase Auth error:", err);
      setErrorMsg(err.message || `Failed to compile admin ${isLogin ? "login" : "registration"}.`);
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
        <form 
          className="flex flex-col gap-5 w-full p-8 rounded-3xl relative bg-[#0b0b0d]/90 text-white border border-[#00F0FF]/20 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.03)] backdrop-blur-xl" 
          onSubmit={handleAuthSubmit}
        >
          {/* Cyber Corner Marks */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-neon-cyan/40" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-neon-cyan/40" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-neon-cyan/40" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-neon-cyan/40" />

          <div className="flex items-center gap-3 pl-1 mb-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-cyan"></span>
            </span>
            <h2 className="font-cabinet font-extrabold text-2xl tracking-tight text-white uppercase">
              {isLogin ? "Sign In" : "Register"}
            </h2>
          </div>
          
          <p className="text-xs text-zinc-200 font-medium leading-relaxed -mt-3 pl-1 mb-2">
            {isLogin 
              ? "Access the administrative portfolio dashboard settings." 
              : "Signup now to configure the administrative portfolio dashboard."}
          </p>
          
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

          {!isLogin && (
            <div className="grid grid-cols-2 gap-3.5">
              <label className="relative flex flex-col gap-1 w-full">
                <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-300 uppercase">First Name</span>
                <input 
                  className="w-full bg-[#030303] border border-white/10 hover:border-white/20 focus:border-[#00F0FF]/40 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-zinc-700 outline-none transition-all duration-300"
                  type="text" 
                  placeholder="Satoshi" 
                  required={!isLogin} 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="relative flex flex-col gap-1 w-full">
                <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-300 uppercase">Last Name</span>
                <input 
                  className="w-full bg-[#030303] border border-white/10 hover:border-white/20 focus:border-[#00F0FF]/40 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-zinc-700 outline-none transition-all duration-300"
                  type="text" 
                  placeholder="Nakamoto" 
                  required={!isLogin} 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>  
          )}
          
          <label className="relative flex flex-col gap-1 w-full">
            <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-300 uppercase">Corporate Email</span>
            <input 
              className="w-full bg-[#030303] border border-white/10 hover:border-white/20 focus:border-[#00F0FF]/40 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-zinc-700 outline-none transition-all duration-300"
              type="email" 
              placeholder="satoshi@bitcoin.org" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label> 
          
          <label className="relative flex flex-col gap-1 w-full">
            <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-300 uppercase">Password</span>
            <input 
              className="w-full bg-[#030303] border border-white/10 hover:border-white/20 focus:border-[#00F0FF]/40 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-zinc-700 outline-none transition-all duration-300"
              type="password" 
              placeholder="••••••••" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </label>
          
          {!isLogin && (
            <>
              <label className="relative flex flex-col gap-1 w-full">
                <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-300 uppercase">Confirm Password</span>
                <input 
                  className="w-full bg-[#030303] border border-white/10 hover:border-white/20 focus:border-[#00F0FF]/40 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-zinc-700 outline-none transition-all duration-300"
                  type="password" 
                  placeholder="••••••••" 
                  required={!isLogin} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </label>

              <label className="relative flex flex-col gap-1 w-full">
                <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-300 uppercase">Admin Invite Code</span>
                <input 
                  className="w-full bg-[#030303] border border-white/10 hover:border-white/20 focus:border-[#00F0FF]/40 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-zinc-700 outline-none transition-all duration-300"
                  type="password" 
                  placeholder="••••••••" 
                  required={!isLogin} 
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  autoComplete="new-password"
                />
              </label>
            </>
          )}
          
          <button 
            className="w-full mt-2 py-3 px-4 rounded-xl text-black bg-[#00F0FF] hover:bg-[#00F0FF]/90 font-mono text-xs font-bold uppercase tracking-widest cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]" 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Compiling..." : (isLogin ? "Sign In" : "Register")}
          </button>
          
          <p className="text-center text-xs text-zinc-200 font-medium mt-1">
            {isLogin ? "Don't have an admin account? " : "Already have an account? "}
            <button 
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrorMsg("");
              }}
              className="text-white hover:text-[#00F0FF] hover:underline font-bold transition-colors cursor-pointer bg-transparent border-none p-0 inline"
            >
              {isLogin ? "Register" : "Signin"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
