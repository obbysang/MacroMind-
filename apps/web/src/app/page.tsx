
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-dark text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background-dark/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">
              psychology
            </span>
            <span className="text-xl font-bold tracking-tight">MacroMind</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                Log in
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-16">
        <div className="relative isolate overflow-hidden pt-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.900),theme(colors.background.dark))] opacity-20" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-background-dark shadow-xl shadow-primary/10 ring-1 ring-white/10 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
          
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <div className="hidden sm:mb-10 sm:flex">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                  AI-Powered Esports Coaching is here.{" "}
                  <a href="#" className="font-semibold text-primary">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Master the Macro. <br />
                <span className="text-primary">Dominate the Game.</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                MacroMind translates complex esports data into actionable coaching insights. 
                Identify patterns, correct mistakes, and optimize your team's strategy with 
                AI-driven analytics.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link href="/login">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg h-12 px-8">
                    Start Coaching
                  </Button>
                </Link>
                <a href="#features" className="text-sm font-semibold leading-6 text-white">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div id="features" className="py-24 sm:py-32 bg-secondary/20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">Deploy Faster</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Everything you need to coach like a pro
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-400">
                From micro-interactions to macro-strategy, MacroMind covers every aspect of the game.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {[
                  {
                    name: "AI Causal Insights",
                    description: "Understand the 'why' behind every win and loss with deep learning models that analyze causal relationships.",
                    icon: "psychology",
                  },
                  {
                    name: "Pattern Recognition",
                    description: "Identify recurring player habits and team tendencies automatically across hundreds of matches.",
                    icon: "hub",
                  },
                  {
                    name: "Real-time Analytics",
                    description: "Get live feedback and post-match reports instantly to accelerate your feedback loop.",
                    icon: "speed",
                  },
                ].map((feature) => (
                  <div key={feature.name} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                      <span className="material-symbols-outlined text-primary h-5 w-5 flex-none" aria-hidden="true">
                        {feature.icon}
                      </span>
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background-dark border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <p className="text-gray-400 text-sm">
              © 2024 MacroMind. All rights reserved.
            </p>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-500">psychology</span>
              <span className="text-gray-500 font-bold">MacroMind</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
