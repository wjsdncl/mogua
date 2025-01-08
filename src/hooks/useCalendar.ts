import { useState } from "react";
import generateCalendar from "@/utils/generateCalendar";

interface UseCalendarProps {
  onDateChange?: (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}

export function useCalendar({ onDateChange }: UseCalendarProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { prevDates, currentDates, nextDates } = generateCalendar(year, month);

  const handlePrevMonth = () => {
    setMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (month === 0) setYear((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (month === 11) setYear((prev) => prev + 1);
  };

  const handleDateClick = ({
    date,
    state = "current",
  }: {
    date: number;
    state?: "prev" | "next" | "current";
  }) => {
    const selectedDate = getSelectedDate(year, month, date, state);

    if (startDate && endDate) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (!startDate) {
      setStartDate(selectedDate);
    } else {
      if (selectedDate > startDate) {
        setEndDate(selectedDate);
      } else {
        setStartDate(selectedDate);
        setEndDate(null);
      }
    }

    onDateChange?.({
      startDate: startDate ? startDate : selectedDate,
      endDate:
        startDate && selectedDate > startDate && !endDate ? selectedDate : null,
    });
  };

  const isSelected = ({
    date,
    state = "current",
  }: {
    date: number;
    state?: "prev" | "next" | "current";
  }) => {
    const selectedDate = getSelectedDate(year, month, date, state);
    return (
      (startDate && selectedDate.toDateString() === startDate.toDateString()) ||
      (endDate && selectedDate.toDateString() === endDate.toDateString())
    );
  };

  const isInRange = ({
    date,
    state = "current",
  }: {
    date: number;
    state?: "prev" | "next" | "current";
  }) => {
    const selectedDate = getSelectedDate(year, month, date, state);
    return (
      startDate && endDate && selectedDate > startDate && selectedDate < endDate
    );
  };

  const isRangeStart = ({
    date,
    state = "current",
  }: {
    date: number;
    state?: "prev" | "next" | "current";
  }) => {
    const selectedDate = getSelectedDate(year, month, date, state);
    return (
      startDate &&
      endDate &&
      selectedDate.toDateString() === startDate.toDateString() &&
      (prevDates.length + date) % 7 !== 0
    );
  };

  const isRangeEnd = ({
    date,
    state = "current",
  }: {
    date: number;
    state?: "prev" | "next" | "current";
  }) => {
    const selectedDate = getSelectedDate(year, month, date, state);
    return endDate && selectedDate.toDateString() === endDate.toDateString();
  };

  return {
    year,
    month,
    startDate,
    endDate,
    prevDates,
    currentDates,
    nextDates,
    handlePrevMonth,
    handleNextMonth,
    handleDateClick,
    isSelected,
    isInRange,
    isRangeStart,
    isRangeEnd,
  };
}

const getSelectedDate = (
  year: number,
  month: number,
  date: number,
  state: "prev" | "next" | "current" = "current",
): Date => {
  let selectedDate = new Date(year, month, date);
  if (state === "prev") selectedDate = new Date(year, month - 1, date);
  if (state === "next") selectedDate = new Date(year, month + 1, date);
  return selectedDate;
};