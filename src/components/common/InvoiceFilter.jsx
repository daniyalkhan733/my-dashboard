import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const InvoiceFilterAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (

    <>
    </>
   
  );
};

export default InvoiceFilterAccordion;
