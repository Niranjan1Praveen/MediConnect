"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqs } from "@/assets/data/faqs";
import Tags from "@/components/ui/tags";

export default function Faqs() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className="min-h-screen py-20 px-4 relative overflow-hidden bg-slate"
      id="faqs"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 blur-3xl rounded-full transform -translate-y-4"></div>
          <div className="relative">
            <Tags title={"Faqs"} />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed py-4">
              Everything you need to know about MediScribes powerful AI-driven
              healthcare documentation platform
            </p>
          </div>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-105"></div>

              <div className="relative backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 transform hover:-translate-y-1">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-none"
                  >
                    <AccordionTrigger className="flex items-center justify-between w-full px-8 py-6 text-left group-hover:text-primary-400 transition-colors duration-300">
                      <div className="flex items-center gap-4">
                        <div
                          className={`text-2xl transform transition-transform duration-300  ${
                            hoveredIndex === index ? "scale-110 rotate-12" : ""
                          }`}
                        >
                          {faq.icon}
                        </div>
                        <span className="text-lg text-white group-hover:text-primary-400 transition-colors duration-300">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="pl-12 pt-2">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-primary-500 to-teal-500 rounded-full mb-4 transform scale-x-0 animate-pulse"></div>
                        <p className="text-slate-200 leading-relaxed text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
