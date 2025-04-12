import React, { createContext, useContext, ReactNode } from "react";

const ApiUrlContext = createContext<string | undefined>(undefined);

interface ApiUrlProviderProps {
  children: ReactNode;
}

export const ApiUrlProvider: React.FC<ApiUrlProviderProps> = ({ children }) => {
  const apiUrl =
    "https://backend-bioflytoffice-402579879370.asia-east1.run.app/";
  return (
    <ApiUrlContext.Provider value={apiUrl}>{children}</ApiUrlContext.Provider>
  );
};


export const useApiUrl = (): string => {
  const context = useContext(ApiUrlContext);
  if (context === undefined) {
    throw new Error("useApiUrl must be used within an ApiUrlProvider");
  }
  return context;
};
