import { useState, useEffect } from "react";

export const LOCAL_STORAGE_KEYS = {
  TOKEN: "token"
};

const useLocalStorage = (
  key: string
): {
  value: string | null;
  setValue: (value: string) => void;
  clearValue: () => void;
} => {
  const [storedValue, setStoredValue] = useState<string | null>(() =>
    localStorage.getItem(key)
  );

  const setValue = (value: string) => {
    localStorage.setItem(key, value);

    setStoredValue(value);
  };

  const clearValue = () => {
    localStorage.removeItem(key);
    setStoredValue(null);
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        setStoredValue(e.newValue || "");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return { value: storedValue, setValue, clearValue };
};

export default useLocalStorage;
