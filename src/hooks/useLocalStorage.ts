import {
  type StateUpdater,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "preact/hooks";

/**
 * Works almost the same as `useState` but persist changes to localSotrage and
 * provides one more callback for clearing the localStorage.
 */
export const useLocalStorage = <V>(
  localStorageKey: string,
  initialValue: V
): [V, StateUpdater<V>, () => void] => {
  const [state, setState] = useState<V>(() => {
    const value = window.localStorage.getItem(localStorageKey);
    return value !== null ? JSON.parse(value) : initialValue;
  });
  // skip persisting of initial value, it is either already stored or the
  // localStorage is emtpy and shall remain empty until change
  const skipPersistenceRef = useRef(true);
  useEffect(() => {
    if (!skipPersistenceRef.current) {
      window.localStorage.setItem(localStorageKey, JSON.stringify(state));
    }
    skipPersistenceRef.current = false;
  }, [state]);
  const resetValue = useCallback(() => {
    window.localStorage.removeItem(localStorageKey);
    // do not re-populate the localStorage
    skipPersistenceRef.current = true;
    setState(initialValue);
  }, [localStorageKey]);
  return [state, setState, resetValue];
};
