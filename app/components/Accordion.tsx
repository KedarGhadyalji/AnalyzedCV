import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";
import { cn } from "~/lib/utils";

interface AccordionContextType {
  activeItems: string[];
  toggleItem: (id: string) => void;
  isItemActive: (id: string) => boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined,
);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("Accordion components must be used within an Accordion");
  return context;
};

interface AccordionProps {
  children: ReactNode;
  defaultOpen?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  defaultOpen,
  allowMultiple = false,
  className = "",
}) => {
  const [activeItems, setActiveItems] = useState<string[]>(
    defaultOpen ? [defaultOpen] : [],
  );

  const toggleItem = (id: string) => {
    setActiveItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
      } else {
        return prev.includes(id) ? [] : [id];
      }
    });
  };

  const isItemActive = (id: string) => activeItems.includes(id);

  return (
    <AccordionContext.Provider
      value={{ activeItems, toggleItem, isItemActive }}
    >
      {/* Clean vertical spacing between items */}
      <div className={cn("space-y-3", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  children,
  className = "",
}) => {
  const { isItemActive } = useAccordion();
  const isActive = isItemActive(id);

  return (
    <div
      className={cn(
        "rounded-[20px] transition-all duration-300 border",
        isActive
          ? "bg-white border-indigo-100 shadow-sm"
          : "bg-transparent border-slate-200/60 hover:border-slate-300",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface AccordionHeaderProps {
  itemId: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  itemId,
  children,
  className = "",
  icon,
  iconPosition = "right",
}) => {
  const { toggleItem, isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  const defaultIcon = (
    <div
      className={cn(
        "w-6 h-6 flex items-center justify-center transition-transform duration-300",
        isActive ? "rotate-180 text-indigo-600" : "text-slate-400",
      )}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );

  return (
    <button
      onClick={() => toggleItem(itemId)}
      className={cn(
        "w-full px-6 py-4 text-left focus:outline-none flex items-center justify-between cursor-pointer group",
        className,
      )}
    >
      <div className="flex items-center space-x-3">
        {iconPosition === "left" && (icon || defaultIcon)}
        {/* Bold, clean Slate-900 typography */}
        <div
          className={cn(
            "text-lg font-black tracking-tighter transition-colors duration-200",
            isActive ? "text-indigo-600" : "text-slate-900",
          )}
        >
          {children}
        </div>
      </div>
      {iconPosition === "right" && (icon || defaultIcon)}
    </button>
  );
};

interface AccordionContentProps {
  itemId: string;
  children: ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  itemId,
  children,
  className = "",
}) => {
  const { isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isActive ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
      )}
    >
      {/* High-quality legible text for the content body */}
      <div
        className={cn(
          "px-6 pb-6 pt-0 text-slate-600 font-medium leading-relaxed",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
