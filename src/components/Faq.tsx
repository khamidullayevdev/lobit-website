"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/faqs";
import { Mascot } from "./Mascot";

const CONTACT = "hello@lobit.co";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" data-bg="base" className="container-x scroll-mt-16 py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start" data-aos="fade-up">
        <Mascot pose="wave" className="h-28 w-auto md:h-32" />
        <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          Frequently asked questions
        </h2>
        <p className="mt-5 text-lg text-muted">
          Can&apos;t find what you&apos;re looking for? Feel free to{" "}
          <a
            href={`mailto:${CONTACT}`}
            className="font-semibold text-plum underline decoration-2 underline-offset-4 hover:text-carrot dark:text-[#b9a9ff]"
          >
            reach out to us
          </a>
          .
        </p>
      </div>
      <div className="space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} data-aos="fade-up" data-aos-delay={i * 60} className="card overflow-hidden !rounded-3xl !shadow-none">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-lg font-bold">{f.q}</span>
                <Plus
                  className={`h-5 w-5 shrink-0 text-carrot transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  strokeWidth={3}
                />
              </button>
              {/* Answers stay in the HTML so search engines can read them */}
              <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 leading-relaxed text-muted">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
