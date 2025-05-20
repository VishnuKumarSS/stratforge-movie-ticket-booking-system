import React from "react";
import { cn } from "@lib/utils";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center bg-primary max-w-7xl mx-auto rounded-2xl">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1>Startforge Project</h1>
            <h2>Startforge Project</h2>
            <h3>Startforge Project</h3>
            <h4>Startforge Project</h4>
            <h5>Startforge Project</h5>
            <h6>Startforge Project</h6>

            <p>
              A clean, minimal Stratforge Project with React, Tailwind CSS, and
              Django REST Framework.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
