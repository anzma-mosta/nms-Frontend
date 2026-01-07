import { createContext, useContext } from "react";

export type AlertType = "success" | "error" | "warning" | "info" | "question";

export interface AlertAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline" | "ghost" | "destructive";
}

export interface AlertOptions {
  title: string;
  message: string;
  type?: AlertType;
  actions?: AlertAction[];
  showCancelButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

export interface AlertContextType {
  showAlert: (options: AlertOptions) => Promise<void>;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
