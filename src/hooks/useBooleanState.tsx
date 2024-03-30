"use client";

import { useCallback, useState } from "react";

type UseBooleanStateReturnType = [boolean, (value: boolean) => void];

export const useBooleanState = (
  initialState: boolean
): UseBooleanStateReturnType => {
  const [state, setState] = useState(initialState);

  const setStateCallback = useCallback((value: boolean) => {
    setState(value);
  }, []);

  return [state, setStateCallback];
};
