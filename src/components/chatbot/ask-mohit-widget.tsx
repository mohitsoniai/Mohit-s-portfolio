"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { useSoundEffects } from "@/hooks/use-sound-effects";

interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

export default function AskMohitWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I'm Mohit's AI Assistant. Ask me anything about his cloud architecture, DevOps pipelines, full-stack projects, or certifications!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover, playSuccess } = useSoundEffects();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const quickQuestions = [
    "What certifications do you have?",
    "Tell me about project WISE",
    "What is your DevOps stack?",
    "How can I contact Mohit?",
  ];

  // Client-side Resume Knowledge QA Engine
  const getResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    // Certifications
    if (q.includes("cert") || q.includes("dp-900") || q.includes("sc-900") || q.includes("nasscom") || q.includes("credential")) {
      return "Mohit holds several prestigious professional cloud and security credentials, including:\n\n" +
             "1. **Microsoft DP-900**: Azure Data Fundamentals (Verifiable)\n" +
             "2. **Microsoft SC-900**: Microsoft Security, Compliance, and Identity Fundamentals\n" +
             "3. **NASSCOM Certifications**: National Association of Software and Service Companies\n" +
             "4. **Forage Virtual Internships**: Verified cloud infrastructure & software programs.\n\n" +
             "You can click on the 'Verify' button on each certificate card in the Certifications section to check validity.";
    }

    // Projects
    if (q.includes("wise") || q.includes("phishing") || q.includes("extension")) {
      return "Project **WISE** is an AI-powered browser extension built for real-time phishing detection. It works by inspecting page features and scanning URLs using API endpoints. \n\n" +
             "• **Tech Stack**: Python, FastAPI, Gemini AI, Groq, Chrome Extension scripts, VirusTotal API, WHOIS domain lookups, URLHaus threat list.\n" +
             "• **Core Benefit**: Instantly alerts users when they visit suspicious login portals, protecting against credentials theft.";
    }

    if (q.includes("mental") || q.includes("dashboard") || q.includes("health")) {
      return "The **AI Mental Health Dashboard** is a smart mental wellness analytics platform. It runs sentiment analysis and natural language processing to gauge emotional trends and give personalized feedback.\n\n" +
             "• **Tech Stack**: Azure AI (Language & Cognitive Services), Python, React, NLP.";
    }

    if (q.includes("gold") || q.includes("silver") || q.includes("tracking") || q.includes("tracker")) {
      return "The **Gold & Silver Tracking App** is a highly polished asset tracking system. It showcases live market charts, metal price fluctuations, and user portfolio valuations.\n\n" +
             "• **Tech Stack**: React Native/React, Figma UX Design, Tailwind CSS, charts integrations.";
    }

    if (q.includes("project") || q.includes("portfolio") || q.includes("built")) {
      return "Mohit has created several advanced projects:\n\n" +
             "1. **WISE**: AI phishing detection browser extension (FastAPI, Gemini AI, Groq).\n" +
             "2. **AI Mental Health Dashboard**: Sentiment analysis tool leveraging Azure AI.\n" +
             "3. **Gold & Silver Tracker**: Finance visualizer with interactive charts.\n\n" +
             "Check out the **Projects** section for live links and source repositories.";
    }

    // Skills & Stack
    if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("language") || q.includes("use")) {
      return "Here is Mohit's core technology matrix:\n\n" +
             "• **Cloud**: Azure (AKS, App Service, VNet, Cosmos DB, Azure SQL, Key Vault, Azure Monitor)\n" +
             "• **DevOps**: Docker, Kubernetes, Terraform, GitHub Actions, Azure DevOps, Microservices\n" +
             "• **Security**: Zero Trust, Entra ID (Azure AD), IAM, RBAC, Defender\n" +
             "• **AI**: Azure AI, Gemini, Groq, NLP, Power BI\n" +
             "• **Languages/Frameworks**: Python, TypeScript, JavaScript, Node.js, React, Next.js, FastAPI, C++.";
    }

    if (q.includes("azure") || q.includes("cloud") || q.includes("aks") || q.includes("architecture")) {
      return "Mohit is a specialized **Azure Cloud Architect**. He has deep expertise in designing scalable architectures, AKS (Azure Kubernetes Service) management, Cosmos DB, App Service deployments, and networking security (VNets, NSGs, Application Gateways). Check out his interactive **Architecture Diagram** section on this page to see a standard data flow design!";
    }

    if (q.includes("devops") || q.includes("ci/cd") || q.includes("docker") || q.includes("kubernetes") || q.includes("terraform")) {
      return "For DevOps operations, Mohit specializes in **Infrastructure as Code (IaC)** with Terraform, automated pipeline workflows using **GitHub Actions & Azure DevOps**, containerization with **Docker**, and orchestration with **Kubernetes (AKS)**. He emphasizes automated testing and continuous integration to achieve zero-downtime rollouts.";
    }

    if (q.includes("security") || q.includes("entra") || q.includes("zero trust") || q.includes("iam")) {
      return "Security is a core focus in Mohit's cloud architecture. He implements **Zero Trust** methodologies, role-based access control (**RBAC**), Multi-Factor Authentication (MFA) via **Microsoft Entra ID**, Conditional Access policies, and Microsoft Defender cloud security integrations.";
    }

    // Experience
    if (q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("parul")) {
      return "Mohit Swarnkar works as a **Cloud & DevOps Engineer** at **Parul University**.\n\n" +
             "• He containerizes legacy applications, configures AKS clusters, and orchestrates CI/CD pipelines.\n" +
             "• He applies security hardening using Zero Trust framework and Azure Policy audits.\n" +
             "• He implements logging and tracing systems via Azure Monitor and Application Insights.";
    }

    // Contact
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("linkedin") || q.includes("hire")) {
      return "You can get in touch with Mohit through multiple channels:\n\n" +
             "• **Email**: mohitswarnkar0@gmail.com\n" +
             "• **Location**: India (available for remote work / relocation)\n" +
             "• **LinkedIn**: [linkedin.com/in/mohitswarnkar](https://linkedin.com/in/mohitswarnkar)\n" +
             "• **GitHub**: [github.com/mohitswarnkar](https://github.com/mohitswarnkar)\n\n" +
             "Feel free to submit the contact form on this website. He responds quickly!";
    }

    // Generic Greetings
    if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("greetings")) {
      return "Hello! How can I assist you today? You can ask me about Mohit's projects, technical experience, cloud security, or credentials.";
    }

    // Default Fallback
    return "I'm not fully sure about that, but I can tell you that Mohit has robust credentials in **Azure Cloud Engineering**, **DevOps**, and **Full Stack Development**. \n\n" +
           "Try asking about: \n" +
           "• *WISE Browser Extension*\n" +
           "• *Azure Cloud Experience*\n" +
           "• *His SC-900 / DP-900 Certifications*\n" +
           "• *How to Contact Him*";
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    playClick();
    const newUserMessage: Message = {
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseText = getResponse(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: responseText,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
      playSuccess();
    }, 800);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => {
          playClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={playHover}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-accent text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
        whileHover={{ rotate: 10 }}
        aria-label="Ask Mohit AI Chatbot"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 flex h-[500px] w-[360px] flex-col rounded-2xl border border-white/10 bg-gray-950/90 text-white shadow-2xl backdrop-blur-xl sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold flex items-center gap-1">
                    Ask Mohit <Sparkles className="h-3 w-3 text-accent animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-gray-400">Online Assistant</p>
                </div>
              </div>
              <button
                onClick={() => {
                  playClick();
                  setIsOpen(false);
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] items-start space-x-2 rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-white/5 text-gray-200 rounded-tl-none border border-white/5"
                    }`}
                  >
                    <div className="whitespace-pre-line leading-relaxed">
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 rounded-2xl bg-white/5 px-4 py-3 border border-white/5 rounded-tl-none">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions (Only shows at the start or optionally) */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-white/5 bg-white/[0.01]">
                <p className="text-[10px] text-gray-500 mb-1.5 font-medium">Suggestions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-[10px] text-accent/80 border border-accent/20 hover:border-accent hover:text-accent bg-accent/5 px-2.5 py-1 rounded-full transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center border-t border-white/5 bg-white/[0.02] p-3"
            >
              <input
                type="text"
                placeholder="Ask me a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent px-2 text-sm text-white placeholder-gray-500 outline-none"
              />
              <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-all duration-200"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
