"use client";

import React from "react";
import { motion } from "framer-motion";
import GlassCard from "../ui/glass-card";
import { Award, CheckCircle, Shield, Database, GraduationCap, ArrowUpRight } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  id: string;
  date: string;
  icon: React.ReactNode;
  verifyUrl: string;
  glowColor: string;
}

export default function Certifications() {
  const certifications: Certificate[] = [
    {
      title: "Microsoft Certified: Azure Data Fundamentals",
      issuer: "Microsoft",
      id: "DP-900",
      date: "Verify Credential",
      icon: <Database className="h-8 w-8 text-[#0078D4]" />,
      verifyUrl: "https://learn.microsoft.com/en-us/users/mohitswarnkar",
      glowColor: "rgba(0, 120, 212, 0.15)",
    },
    {
      title: "Microsoft Certified: Security, Compliance, & Identity Fundamentals",
      issuer: "Microsoft",
      id: "SC-900",
      date: "Verify Credential",
      icon: <Shield className="h-8 w-8 text-[#0078D4]" />,
      verifyUrl: "https://learn.microsoft.com/en-us/users/mohitswarnkar",
      glowColor: "rgba(37, 99, 235, 0.15)",
    },
    {
      title: "NASSCOM Professional Certification",
      issuer: "NASSCOM",
      id: "FutureSkills Prime",
      date: "Verify Credential",
      icon: <Award className="h-8 w-8 text-accent" />,
      verifyUrl: "#",
      glowColor: "rgba(0, 229, 255, 0.15)",
    },
    {
      title: "Software Engineering & Infrastructure Simulation",
      issuer: "Forage",
      id: "Completed virtual programs",
      date: "Verify Credential",
      icon: <GraduationCap className="h-8 w-8 text-secondary" />,
      verifyUrl: "#",
      glowColor: "rgba(139, 92, 246, 0.15)",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="certifications"
      className="relative w-full max-w-6xl mx-auto px-6 py-24 md:px-12"
    >
      {/* Title */}
      <div className="mb-16 text-center">
        <h2 className="font-display text-xs font-bold uppercase tracking-widest text-accent">
          Credentials
        </h2>
        <h3 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Professional Certifications
        </h3>
        <div className="mt-4 h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full mx-auto" />
      </div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {certifications.map((cert) => (
          <motion.div key={cert.title} variants={itemVariants}>
            <GlassCard
              className="flex flex-col justify-between h-[260px] p-6 hover:shadow-xl transition-all"
              glowColor={cert.glowColor}
            >
              <div>
                {/* Icon & Issuer */}
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-xl bg-white/5 p-2.5 border border-white/5">
                    {cert.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-2.5 py-1 rounded">
                    {cert.issuer}
                  </span>
                </div>

                <h4 className="font-display text-sm font-bold text-white tracking-wide leading-snug line-clamp-2">
                  {cert.title}
                </h4>
                <p className="text-[10px] font-semibold text-accent mt-2 uppercase tracking-wide">
                  ID: {cert.id}
                </p>
              </div>

              {/* Verify Button */}
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex w-fit items-center space-x-1 text-xs font-bold text-gray-300 hover:text-white transition-colors group"
              >
                <span>Verify Credentials</span>
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
