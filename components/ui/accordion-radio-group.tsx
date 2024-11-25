import { montserrat } from "@/lib/fonts";
import React, { ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionRadioGroupProps {
  options: Array<{
    label: string;
    value: string;
    description: string | ReactElement;
    discount?: string;
  }>;
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const AccordionRadioGroup: React.FC<AccordionRadioGroupProps> = ({
  options,
  selectedValue,
  onValueChange,
}) => {
  const handleChange = (value: string) => {
    onValueChange(value);
  };

  return (
    <div className="border border-gray-200">
      {options.map((option) => (
        <div key={option.value} className="border-t border-gray-300">
          <div className="flex items-center p-4 cursor-pointer border-b border-gray-300">
            <input
              type="radio"
              id={option.value}
              name="payment-method"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleChange(option.value)}
              className="hidden peer"
            />
            <label
              htmlFor={option.value}
              className={`${montserrat.className} flex-grow cursor-pointer flex items-center`}
            >
              <span
                className={`w-4 h-4 mr-2 border border-darkCustom rounded-full flex items-center justify-center ${
                  selectedValue === option.value
                    ? "bg-brownCustom border-transparent"
                    : "bg-white"
                }`}
              >
                {selectedValue === option.value && (
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                )}
              </span>
              <span
                className={`${
                  selectedValue === option.value ? "font-semibold" : ""
                }`}
              >
                {option.label}
                {option.discount && (
                  <span className="text-gray-500 ml-2">{option.discount}</span>
                )}
              </span>
            </label>
          </div>
          <AnimatePresence initial={false}>
            {selectedValue === option.value && (
              <motion.div
                key={option.value}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: "hidden" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="p-4 bg-gray-50 border-t border-b border-gray-300 min-h-[80px]">
                  <p
                    className={`${montserrat.className} text-sm leading-6 tracking-wide`}
                  >
                    {option.description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default AccordionRadioGroup;
