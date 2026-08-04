"use client";

import React from "react";
import GlassCard from "../ui/glass-card";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  glowColor: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Dr. Alok Patel",
      role: "Director of R&D",
      company: "Parul University",
      text: "Mohit transformed our student-facing portal infrastructure. By moving our microservices into Azure Kubernetes Service (AKS), he cut resource latency and established rock-solid CI/CD automations.",
      rating: 5,
      glowColor: "rgba(0, 229, 255, 0.1)",
    },
    {
      name: "Karan Shah",
      role: "Lead Systems Architect",
      company: "DevOps Solutions",
      text: "Mohit's grasp of Infrastructure as Code using Terraform is outstanding. His modular blueprints saved our migration team weeks of configuration overhead while adhering to security best-practices.",
      rating: 5,
      glowColor: "rgba(139, 92, 246, 0.1)",
    },
    {
      name: "Shruti Rao",
      role: "Senior Full Stack Engineer",
      company: "AI Cognitive Labs",
      text: "Working with Mohit on the WADE browser extension project was a blast. He handled the FastAPI endpoints and LLM integration, delivering a lightning-fast security tool that exceeded expectations.",
      rating: 5,
      glowColor: "rgba(37, 99, 235, 0.1)",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative w-full max-w-6xl mx-auto px-6 py-24 md:px-12"
    >
      {/* Title */}
      <div className="mb-16 text-center">
        <h2 className="font-display text-xs font-bold uppercase tracking-widest text-accent">
          Feedback
        </h2>
        <h3 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Recommendations & Peer Reviews
        </h3>
        <div className="mt-4 h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full mx-auto" />
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((test, index) => (
          <GlassCard
            key={index}
            className="flex flex-col justify-between p-6 h-full hover:-translate-y-1 transition-all duration-300"
            glowColor={test.glowColor}
          >
            <div>
              {/* Stars & Quote */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-1">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-white/10" />
              </div>

              <p className="text-xs text-gray-300 italic leading-relaxed">
                &ldquo;{test.text}&rdquo;
              </p>
            </div>

            <div className="mt-6 border-t border-white/5 pt-4 flex flex-col">
              <span className="text-xs font-bold text-white tracking-wide uppercase">
                {test.name}
              </span>
              <span className="text-[10px] text-gray-500 font-semibold mt-0.5 uppercase tracking-wide">
                {test.role} &bull; {test.company}
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
