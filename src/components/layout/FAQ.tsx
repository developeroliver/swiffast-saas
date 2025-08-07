"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList arrayy below.

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
  {
    question: "What do I get exactly?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        An Xcode project containing the SwiftUI starter with all the boilerplate
        code you need to launch a profitable iOS app: monetization, SwiftData
        database, authentication, UI components, and much more.
      </div>
    ),
  },
  {
    question: "What makes SwiftFast better then other boilerplates?",
    answer: (
      <p>
        When I first started with SwiftUI, I was often lost in the organization
        of my code, which quickly became unmanageable. To gain clarity and
        efficiency, I created a boilerplate that was as clean and structured as
        possible. All I have to do now is clone the repository, configure
        Firebase, add my API keys... and I can concentrate directly on
        developing my application.
      </p>
    ),
  },
  {
    question: "What is the architecture?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        In terms of architecture, SwiftFast use dependency injection with a
        clean architecture structured in three layers: Data, Domain and
        Presentation - a standard widely adopted today - enriched by UseCases to
        isolate business logic. To this we add SwiftData, integrated in the
        simplest and most direct way possible.
      </div>
    ),
  },
  {
    question: "What if I'm new to iOS development?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        A beginner can easily use SwiftFast, as all the files are extensively
        commented and well structured. Of course, you &apos;ll need to have some
        basic knowledge of Swift and SwiftUI, but the project is designed to
        provide clear guidance right from the start.
      </div>
    ),
  },
  {
    question: "UIKit or SwiftUI?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        SwiftFast is based on SwiftUI rather than UIKit, as it offers a more
        modern, declarative approach better aligned with the latest Apple
        technologies. This allows for clearer code organization, faster
        development, and the natural integration of recent features such as
        SwiftData, @Observable or async/await. Some UIKit remains in the
        boilerplate, only where relevant or necessary.
      </div>
    ),
  },
  {
    question: "Can I get a refund?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        After you&apos;ve got access to the GitHub repositories, SwiftFast is
        yours forever, so it can&apos;t be refunded.
      </div>
    ),
  },
];

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-gray-500 font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-gray-500 ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed text-gray-400">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-base-100" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-blue-400 mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-gray-400">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
