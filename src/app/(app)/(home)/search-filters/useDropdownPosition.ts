import { RefObject } from "react";

export default function useDropdownPosition(
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>,
) {
  function getDropdownPosition() {
    if (!ref.current) return { left: 0, top: 0 };
    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240;

    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    if (left + dropdownWidth > window.innerWidth) {
      left = rect.right + window.scrollX - dropdownWidth;

      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16;
      }
    }

    if (left < 0) {
      left = 16;
    }

    return { left, top };
  }

  return { getDropdownPosition };
}
