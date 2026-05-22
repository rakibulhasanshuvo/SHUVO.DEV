"use client";

import React from 'react';
import { motion } from 'framer-motion';

const PricingCards = () => {
  const tiers = [
    {
      title: 'Starter Pack',
      price: '$499',
      description: 'Perfect for small projects and MVPs.',
      features: ['1 Page Next.js Site', 'SEO Optimization', 'Basic Analytics', '1 Week Delivery'],
      theme: 'cyan',
      glow: 'shadow-[0_0_30px_rgba(0,255,255,0.15)]',
      border: 'border-cyan-500/30',
      buttonGlow: 'shadow-[0_0_15px_rgba(0,255,255,0.4)]',
      buttonText: 'text-cyan-400',
      checkColor: 'text-cyan-400',
      rotate: -10,
      x: 50,
      y: 20
    },
    {
      title: 'Explosive Growth',
      price: '$1299',
      description: 'Perfect for your next content, leave to us and enjoy the result!',
      features: ['Full Stack Web App', 'CMS Integration', 'Advanced SEO', 'Influencer Outreach', 'Priority Support'],
      theme: 'purple',
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.15)]',
      border: 'border-purple-500/30',
      buttonGlow: 'shadow-[0_0_15px_rgba(168,85,247,0.4)]',
      buttonText: 'text-purple-400',
      checkColor: 'text-purple-400',
      rotate: 0,
      x: 0,
      y: 0
    },
    {
      title: 'Enterprise',
      price: 'Custom',
      description: 'For large scale applications requiring high performance.',
      features: ['Custom Architecture', 'Load Balancing', 'Dedicated Server', '24/7 Support', 'SLA Guarantee'],
      theme: 'mixed',
      glow: 'shadow-[0_0_30px_rgba(236,72,153,0.15)]',
      border: 'border-pink-500/30',
      buttonGlow: 'shadow-[0_0_15px_rgba(236,72,153,0.4)]',
      buttonText: 'text-pink-400',
      checkColor: 'text-pink-400',
      rotate: 10,
      x: -50,
      y: 20
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center">
        {tiers.map((tier, idx) => (
          <motion.div
            key={idx}
            initial={{
              opacity: 0,
              rotate: tier.rotate,
              x: tier.x,
              y: tier.y,
              scale: 0.9
            }}
            whileInView={{
              opacity: 1,
              rotate: 0,
              x: 0,
              y: 0,
              scale: 1
            }}
            transition={{
              duration: 0.8,
              delay: idx * 0.1,
              type: "spring",
              bounce: 0.4
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full h-full"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.5,
              }}
              className={`flex flex-col gap-6 p-8 h-full rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white/[0.04] ${tier.glow}`}
            >
              {/* Inner Glowing Border Top Edge */}
              <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50`} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white tracking-wide mb-2 font-cabinet">
                    {tier.title}
                  </h3>
                  <p className="text-sm text-neutral-400 h-10 line-clamp-2">
                    {tier.description}
                  </p>
                  <div className="text-3xl font-bold text-white mt-4 tracking-tight">
                    {tier.price}
                  </div>
                </div>

                <div className="w-full h-px bg-white/10 my-4" />

                <ul className="flex flex-col gap-4 mb-8 flex-grow">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <span className={`mt-0.5 rounded-full p-1 bg-white/5 border border-white/10 ${tier.checkColor}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                          <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-sm text-neutral-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 bg-black/40 backdrop-blur-md border ${tier.border} ${tier.buttonText} ${tier.buttonGlow} hover:bg-black/60 hover:shadow-none`}
                >
                  Book a Call
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricingCards;
