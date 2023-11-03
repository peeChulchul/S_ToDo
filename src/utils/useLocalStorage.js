import { useEffect, useState } from "react";

export const useLocalStorage = (key, initalValue) => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue === null) {
      return initalValue;
    } else {
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};
