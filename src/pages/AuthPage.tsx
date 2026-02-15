// ============================================
// URBAN GRAVITY - AUTH PAGE
// ============================================

import { LoginForm, TwoFactorForm } from "@/components/auth";
import { useAuthStore } from "@/stores/auth.store";
import { Shield, Landmark, MapPin, Search, Database } from "lucide-react";
import { cn } from "@/utils/cn";
import ComboText from "@/components/ui/ComboText";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import bgImg from "@/assets/images/landing/alex-hUWNPylGE8.jpg";
import logo from "@/assets/images/ug-logo.png";
import { useState } from "react";

export function AuthPage() {
  const { authStep } = useAuthStore();
  const [open, isOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen w-screen bg-white flex overflow-hidden font-sans">
      {/* 1. Authentication Interaction Panel */}
      <div className="flex-1 flex flex-col items-start justify-evenly p-8 lg:px-24 relative bg-gray-50/30">
        {/* Subtle decorative glow for mobile/small screens */}
        <div className="lg:hidden absolute top-0 right-1/2 -translate-x-1/2 h-64 w-64 bg-primary-500/15 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="flex flex-col gap-3 items-start">
          <div className="flex items-center gap-4 animate-fade-in">
            <OptimizedImage
              src={logo}
              alt="Urban Gravity"
              width={70}
              height={70}
            />
            <ComboText
              firstText={"Urban"}
              secondText={"Gravity"}
              fontFamily="hubot"
              fontWeight="bold"
              size={28}
              gap={1}
              className="tracking-tighter"
            />
          </div>
          {authStep === "LOGIN" && (
            <p className="text-sm font-medium text-gray-500 leading-relaxed animate-fade-in">
              Enter your official credentials below to access the Urban Gravity
              administrative environment.
            </p>
          )}
        </div>
        <div className="w-full relative z-10 min-w-[440px]">
          <div
            className={cn(
              "transition-all duration-500 transform",
              authStep === "TWO_FACTOR"
                ? "scale-100 opacity-100"
                : "scale-100 opacity-100",
            )}
          >
            {authStep === "LOGIN" && <LoginForm />}
            {authStep === "TWO_FACTOR" && <TwoFactorForm />}
          </div>
        </div>
        <div className="h-10"></div>
      </div>
      {/* Old Cinematic Left Panel (Hidden on mobile) */}
      <div>
        {/* // className="hidden lg:flex lg:w-3/5 bg-sidebar relative justify-between p-16 overflow-hidden ml-auto"> */}
        {/* Animated Background Mesh & Glows */}
        {/* <div className="absolute inset-0 bg-mesh opacity-30"></div>
        <div className="absolute -top-24 -left-24 h-96 w-96 bg-primary-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] bg-primary-500/5 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3"></div> */}

        {/* Center: Value Propositions (Trust Architecture) */}
        {/* <div className="relative z-10 space-y-12 animate-slide-in">
          <div className="space-y-4">
            <h1 className="text-6xl font-black text-white leading-[0.9] tracking-tighter">
              The Intelligence <br />
              Behind{" "}
              <span className="text-primary-500 underline decoration-primary-500/20 underline-offset-8">
                Lagos
              </span>{" "}
              Living.
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-lg leading-relaxed">
              Secure, transparent, and AI-driven management portal for Lagos
              State verified officers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {[
              {
                label: "Market Oversight",
                icon: Search,
                desc: "Real-time listing verification",
              },
              {
                label: "Trust Escrow",
                icon: Shield,
                desc: "Security-first fund management",
              },
              {
                label: "Regional Intel",
                icon: MapPin,
                desc: "LGA-based growth mapping",
              },
              {
                label: "System Audit",
                icon: Database,
                desc: "Full traceability of actions",
              },
            ].map((feature) => (
              <div key={feature.label} className="group cursor-default">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-sidebar transition-all duration-300">
                    <feature.icon className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-bold text-white uppercase tracking-tight">
                    {feature.label}
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-500 group-hover:text-gray-400 transition-colors uppercase tracking-widest">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
      
      {/* Cinematic Right Panel */}
      {/* TODO: Add the cinematic Effect here */}
      <div
        className={`relative justify-between overflow-hidden ${!open ? "w-full" : "flex w-3/5"}`}
      >
        <div
          className="absolute inset-0 w-full h-full z-10 bg-overlay backdrop-blur-[2px] top-0 left-0 
         bg-gradient-to-br from-black/50 via-black/80 to-black/90 opacity-70"
        />
        <OptimizedImage
          src={bgImg}
          alt={"Intro Background Image"}
          width={100}
          height={100}
          className="w-screen h-screen -to-right bg-tl-black bg-br-white"
          loaderClassName="bg-primary-100"
        />
      </div>
    </div>
  );
}
