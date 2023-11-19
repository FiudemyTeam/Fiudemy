import { createContext, useState } from "react";

export const CourseContext = createContext({
  isCompleted: "",
  setIsCompleted: () => {},
});

export const CourseContextProvider = ({ children }) => {
  const [isCompleted, setIsCompleted] = useState(undefined);

  return (
    <CourseContext.Provider
      value={{
        isCompleted,
        setIsCompleted,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
