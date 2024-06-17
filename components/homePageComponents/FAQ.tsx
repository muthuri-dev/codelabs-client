"use client";
import React from "react";

const faqs = [
  {
    question: "How can I create a course on Codelabs?",
    answer:
      "To create a course, log in to your Codelabs account and navigate to the 'Create Course' section. Fill out the course details, including the title, description, and curriculum. Once you're done, submit your course for review. After approval, your course will be published and available for learners.",
  },
  {
    question: "Can I earn money by creating courses on Codelabs?",
    answer:
      "Yes, you can earn money by creating and publishing courses on Codelabs. You will receive a percentage of the revenue generated from course sales. Ensure your course is well-structured and engaging to attract more learners and increase your earnings.",
  },
  {
    question: "Are there any free courses available on Codelabs?",
    answer:
      "Yes, Codelabs offers a variety of free courses in different categories. You can browse the course catalog and filter by 'Free' to find courses that are available at no cost. This is a great way to start learning without any financial commitment.",
  },
  {
    question: "What payment methods are accepted on Codelabs?",
    answer:
      "Codelabs accepts various payment methods including credit/debit cards, PayPal, and mpesa payment methods. During the checkout process, you can select your preferred payment method to complete your purchase.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "If you need assistance, you can contact customer support by visiting the 'Support' section on the website. Fill out the contact form with your query, or use the provided email address to reach out directly. The support team typically responds within 24-48 hours.",
  },
];
export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState(null);

  const toggleAccordion = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
            Frequently asked questions
          </h2>
        </div>
        <div className="accordion-group" data-accordion="default-accordion">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`accordion border border-solid border-gray-300 p-4 rounded-xl transition duration-500 ${
                openIndex === index
                  ? "accordion-active:bg-indigo-50 accordion-active:border-indigo-600"
                  : ""
              } mb-8 lg:p-4`}
              id={`heading-${index}`}
            >
              <button
                className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600"
                onClick={() => toggleAccordion(index)}
                aria-controls={`collapse-${index}`}
              >
                <h5>{faq.question}</h5>
                <svg
                  className={`w-6 h-6 text-gray-900 transition duration-500 ${
                    openIndex === index ? "hidden" : "block"
                  } group-hover:text-indigo-600 origin-center`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18M12 18V6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <svg
                  className={`w-6 h-6 text-gray-900 transition duration-500 ${
                    openIndex === index ? "block" : "hidden"
                  } group-hover:text-indigo-600`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <div
                id={`collapse-${index}`}
                className="accordion-content w-full overflow-hidden pr-4 transition-max-height duration-500 ease-in-out"
                aria-labelledby={`heading-${index}`}
                style={{ maxHeight: openIndex === index ? "250px" : "0" }}
              >
                <p className="text-base text-gray-900 font-normal leading-6">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
