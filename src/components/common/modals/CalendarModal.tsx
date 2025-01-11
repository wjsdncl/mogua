"use client";

import { useRef } from "react";
import Calendar from "../Calendar";
import InfoIcon from "@/assets/images/icons/info.svg";

const CALENDAR_MODAL_TITLE = "모집 기간";

function CalendarModal({
  selectedDates,
  onDateChange,
  isFilter = false,
}: {
  selectedDates: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onDateChange: (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
  isFilter?: boolean;
}) {
  const resetCalendarRef = useRef<(() => void) | undefined>(undefined);

  const handleDateChange = (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    onDateChange(dates);
  };

  return (
    <div className='flex w-full flex-col items-center'>
      <div className='flex w-full flex-col items-center gap-6'>
        <Calendar
          selectedDates={selectedDates}
          onDateChange={handleDateChange}
          exposeOnDatesReset={(fn) => {
            resetCalendarRef.current = fn;
          }}
        />

        <div className='flex w-full items-center justify-center border-t border-gray-700'>
          <div className='h-[3.25rem] w-[23.4375rem] px-5 py-4 text-body-1-normal font-semibold text-gray-400'>
            {selectedDates.startDate
              ? `${selectedDates.startDate.toLocaleDateString()} - ${selectedDates.endDate ? selectedDates.endDate.toLocaleDateString() : ""}`
              : "기간을 선택해주세요"}
          </div>
        </div>
      </div>

      {isFilter && (
        <div className='w-[23.4375rem] px-4 pb-2 pt-1'>
          <div className='flex w-full items-center gap-2 rounded-2xl bg-gray-800 px-5 py-[.8125rem] text-label-normal font-medium text-primary'>
            <InfoIcon className='size-6 fill-primary' />
            범위는 최대 6개월까지 설정할 수 있어요
          </div>
        </div>
      )}
    </div>
  );
}

export { CalendarModal, CALENDAR_MODAL_TITLE };
