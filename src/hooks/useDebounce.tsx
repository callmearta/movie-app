import { useEffect, useRef, useState } from "react";

const useDebounce = (referenceValue: any, debounceTime: number = 500) => {
  const [val, set] = useState("");
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      set(referenceValue);
    }, debounceTime);
  }, [referenceValue]);

  return val;
};

export default useDebounce;
