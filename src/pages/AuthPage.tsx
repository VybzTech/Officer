// ============================================
// URBAN GRAVITY - AUTH PAGE
// Premium cinematic entry for Officers
// ============================================

import { LoginForm, TwoFactorForm } from "@/components/auth";
import { useAuthStore } from "@/stores/auth.store";
import { Shield, Landmark, MapPin, Search, Database } from "lucide-react";
import { cn } from "@/utils/cn";
import ComboText from "@/components/ui/ComboText";

export function AuthPage() {
  const { authStep } = useAuthStore();

  return (
    <div className="min-h-screen bg-white flex overflow-hidden font-sans">
      {/* 1. Cinematic Left Panel (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-3/5 bg-sidebar relative flex-col justify-between p-16 overflow-hidden">
        {/* Animated Background Mesh & Glows */}
        <div className="absolute inset-0 bg-mesh opacity-30"></div>
        <div className="absolute -top-24 -left-24 h-96 w-96 bg-primary-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] bg-primary-500/5 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3"></div>

        {/* Top: Logo & Status */}
        <div className="relative z-10 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 shadow-glow">
              <Landmark className="h-8 w-8 text-sidebar" strokeWidth={2.5} />
            </div>
            <div>
              <ComboText
                firstText={"Urban"}
                secondText={"Gravity"}
                fontFamily="hubot"
                fontWeight="bold"
                size={28}
                gap={3}
                className="tracking-tighter"
              />
              {/* <h2 className="text-2xl font-black text-white tracking-tighter">
                Urban Gravity
              </h2> */}
              <div className="flex items-center gap-2 mt-1">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                  Lagos, NG
                </p>
                <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Value Propositions (Trust Architecture) */}
        <div className="relative z-10 space-y-12 animate-slide-in">
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
        </div>

        {/* Bottom: Integrity Statement */}
        <div className="relative z-10 pt-16 border-t border-white/5 animate-fade-in">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
              Protected by UG Trust Core © 2026
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                v1.2.0-STABLE
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                ISO 27001 COMPLIANT
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Authentication Interaction Panel */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-24 relative bg-gray-50/30">
        {/* Subtle decorative glow for mobile/small screens */}
        <div className="lg:hidden absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 bg-primary-500/10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-[440px] relative z-10">
          {/* Mobile-only Top Brand Logo */}
          <div className="lg:hidden mb-12 flex flex-col items-center">
            <div className="h-16 w-16 rounded-2xl bg-primary-500 flex items-center justify-center shadow-glow mb-4">
              <Landmark className="h-8 w-8 text-sidebar" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black text-sidebar tracking-tighter">
              Urban Gravity
            </h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">
              Lagos Officer Portal
            </p>
          </div>

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

          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Technical Issues?{" "}
              <button className="text-primary-600 hover:text-primary-700 underline decoration-primary-500/20 underline-offset-4">
                Emergency Support Protocol
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
