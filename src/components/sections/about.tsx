"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlassCard from "../ui/glass-card";
import { User, Target, Flame, Compass, CalendarRange, Award, FolderGit2, Cpu } from "lucide-react";

// CountUp component triggered on view
function Counter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="about"
      className="relative w-full max-w-6xl mx-auto px-6 py-24 md:px-12"
    >
      {/* Title */}
      <div className="mb-16 text-center md:text-left">
        <h2 className="font-display text-xs font-bold uppercase tracking-widest text-accent">
          Overview
        </h2>
        <h3 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Who is Mohit Swarnkar?
        </h3>
        <div className="mt-4 h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full mx-auto md:mx-0" />
      </div>

      {/* Bento Grid Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {/* Who I Am Card - spans 2 columns */}
        <motion.div variants={cardVariants} className="sm:col-span-2">
          <GlassCard className="h-full flex flex-col justify-between" glowColor="rgba(37, 99, 235, 0.15)">
            <div>
              <div className="flex items-center space-x-3 mb-4 text-primary">
                <User className="h-6 w-6 text-accent" />
                <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider">Who I Am</h4>
              </div>
              <p className="text-sm leading-relaxed text-gray-300">
                I am an cloud-native engineer specializing in the **Microsoft Azure** ecosystem. With a robust background spanning software development, operations architectures, and system administration, I design infrastructure with automation, scalability, and airtight security protocols in mind. 
              </p>
              <p className="text-sm leading-relaxed text-gray-300 mt-3">
                I bridge the gap between design and system logic—optimizing pipeline flows and deploying microservices while maintaining clean developer documentation. My target is to make deployments seamless and systems resilient.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Mission Card */}
        <motion.div variants={cardVariants}>
          <GlassCard className="h-full" glowColor="rgba(139, 92, 246, 0.15)">
            <div className="flex items-center space-x-3 mb-4 text-secondary">
              <Target className="h-6 w-6 text-secondary" />
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider">Mission</h4>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              To build modular, robust architectures that withstand traffic spikes and defend against security vulnerabilities, ensuring systems are always-on and auditable.
            </p>
          </GlassCard>
        </motion.div>

        {/* Passion Card */}
        <motion.div variants={cardVariants}>
          <GlassCard className="h-full" glowColor="rgba(0, 229, 255, 0.15)">
            <div className="flex items-center space-x-3 mb-4 text-accent">
              <Flame className="h-6 w-6 text-accent" />
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider">Passion</h4>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Automating what can be automated, resolving cloud resource bottlenecks, and exploring cutting-edge LLMs (Gemini, Groq) to augment cloud engineering pipelines.
            </p>
          </GlassCard>
        </motion.div>

        {/* Interests Card */}
        <motion.div variants={cardVariants}>
          <GlassCard className="h-full" glowColor="rgba(37, 99, 235, 0.15)">
            <div className="flex items-center space-x-3 mb-4 text-primary">
              <Compass className="h-6 w-6 text-primary" />
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider">Interests</h4>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Zero Trust architecture implementation, serverless computational models, microservice telemetry instrumentation, and training AI models on local files.
            </p>
          </GlassCard>
        </motion.div>

        {/* Stats Grid - spans 2 columns */}
        <motion.div variants={cardVariants} className="sm:col-span-2">
          <GlassCard className="h-full" glowColor="rgba(139, 92, 246, 0.15)">
            <div className="flex items-center space-x-3 mb-6 text-secondary">
              <CalendarRange className="h-6 w-6 text-secondary" />
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider">Metrics & Achievements</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {/* Stat 1 */}
              <div className="text-center md:text-left">
                <p className="text-3xl font-extrabold text-accent sm:text-4xl">
                  <Counter value={25} />+
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Projects Completed
                </p>
              </div>

              {/* Stat 2 */}
              <div className="text-center md:text-left">
                <p className="text-3xl font-extrabold text-secondary sm:text-4xl">
                  <Counter value={6} />+
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Certifications
                </p>
              </div>

              {/* Stat 3 */}
              <div className="text-center md:text-left">
                <p className="text-3xl font-extrabold text-primary sm:text-4xl">
                  <Counter value={30} />+
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Tech Frameworks
                </p>
              </div>

              {/* Stat 4 */}
              <div className="text-center md:text-left">
                <p className="text-3xl font-extrabold text-white sm:text-4xl">
                  <Counter value={4} />+
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Years Engineering
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
