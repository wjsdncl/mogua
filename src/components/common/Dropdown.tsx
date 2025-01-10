"use client";

import React, { useState } from "react";
import Popover from "./Popover";
import { type DropdownProps, type Position } from "@/types/dropdown.type";

export default function Dropdown({
  align = "RR",
  content,
  gapX = 0,
  gapY = 8,
  defaultSelected,
  children,
}: DropdownProps) {
  const [selected, setSelected] = useState<string | null>(
    defaultSelected || null,
  );

  const handleSelect = (
    label: string,
    value?: string,
    onClick?: (value: string) => void,
    closePopover?: () => void,
  ) => {
    setSelected(label);
    if (onClick && value) onClick(value);
    if (closePopover) closePopover();
  };

  const getPosition = () => {
    switch (align) {
      case "LR":
        return {
          anchor: { vertical: "bottom", horizontal: "left" },
          content: { vertical: "top", horizontal: "right" },
        } as Position;
      case "CC":
        return {
          anchor: { vertical: "bottom", horizontal: "center" },
          content: { vertical: "top", horizontal: "center" },
        } as Position;
      case "RL":
        return {
          anchor: { vertical: "bottom", horizontal: "right" },
          content: { vertical: "top", horizontal: "left" },
        } as Position;
      case "LL":
        return {
          anchor: { vertical: "bottom", horizontal: "left" },
          content: { vertical: "top", horizontal: "left" },
        } as Position;
      case "RR":
      default:
        return {
          anchor: { vertical: "bottom", horizontal: "right" },
          content: { vertical: "top", horizontal: "right" },
        } as Position;
    }
  };

  return (
    <Popover
      gapX={gapX}
      gapY={gapY}
      position={getPosition()}
      content={(closePopover) => (
        <ul className='min-w-[7.25rem] cursor-pointer rounded-xl border border-gray-800 bg-gray-900'>
          {content.map((item, index) => (
            <li
              key={index}
              className={`text-body-2-normal ${
                selected === item.label || selected === item.value
                  ? "text-gray-200"
                  : "text-gray-500"
              } mx-auto w-max px-[0.875rem] py-3 text-center font-semibold`}
              onClick={() =>
                handleSelect(item.label, item.value, item.onClick, closePopover)
              }
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    >
      {children}
    </Popover>
  );
}
