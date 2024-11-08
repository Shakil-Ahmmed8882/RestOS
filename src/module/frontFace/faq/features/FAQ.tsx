import { Accordion, AccordionItem } from "@nextui-org/react";
import faq_image3 from "../../../../assets/img/shared/faq3.svg";
import "../faq.css";
import { useTheme } from "next-themes";
import { Helmet } from "react-helmet-async";

import React from "react";
import { faqItems } from "./faqData";
export default function FAQ() {
  const { theme } = useTheme();
  const color = theme === "dark" ? "gray" : "gray";

  return (
    <>
      <div
        className={`min-h-screen  max-w-7xl mx-auto`}
      >
        <Helmet>
          <title>RestOS || FAQ</title>
        </Helmet>
        <div className="flex pt-32">
          <div className="w-1/2 min-h-screen h-screen sticky top-0">
            <img
              src={faq_image3}
              className="w-full object-cover object-top"
              alt="FAQ Illustration"
            />
          </div>
          <Accordion variant="splitted" className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                style={{ color: color }}
                aria-label={`Accordion ${index + 1}`}
                title={item.question}
              >
                {item.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
