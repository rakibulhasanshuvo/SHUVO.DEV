"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <motion.div
      initial={false}
      className={`group glass rounded-xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-neon-cyan/40 bg-[#0B0B0C]/95 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,240,255,0.1)]"
          : "border-white/10 bg-[#0B0B0C]/60 backdrop-blur-xl hover:border-white/20 hover:bg-[#0B0B0C]/80"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <span className={`font-medium transition-colors duration-300 ${isOpen ? "text-neon-cyan" : "text-white group-hover:text-white/90"}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`shrink-0 flex items-center justify-center size-6 rounded-full ${isOpen ? "bg-neon-cyan/20 text-neon-cyan" : "bg-white/5 text-white/50 group-hover:text-white/80 group-hover:bg-white/10"} transition-colors`}
        >
          <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 pt-0 text-text-muted text-sm font-light leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const faqs = [
  {
    question: "What services do you offer?",
    answer: "I specialize in custom web development, UI/UX design, performance optimization, and integrating complex third-party services. I focus on creating high-performance, visually stunning digital experiences tailored to your brand."
  },
  {
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on complexity. A standard landing page might take 1-2 weeks, while a complex web application can take 4-8 weeks. I provide detailed timelines and milestones during the initial discovery phase."
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer: "Yes, I offer monthly retainer packages for ongoing maintenance, updates, and performance monitoring to ensure your digital assets continue to perform at their best long after launch."
  },
  {
    question: "What tech stack do you prefer?",
    answer: "My primary stack includes Next.js (React), TypeScript, Tailwind CSS, and Framer Motion for the frontend. For backend needs, I frequently use Node.js, Supabase, or custom REST/GraphQL APIs, depending on project requirements."
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 relative z-10">
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => toggleItem(index)}
        />
      ))}
    </div>
  );
}
