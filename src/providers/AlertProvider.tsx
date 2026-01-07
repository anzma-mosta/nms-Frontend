import { useCallback, type ReactNode } from "react";
import Swal, { type SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "react-i18next";
import { AlertContext, type AlertOptions } from "./AlertContext";
import "./AlertProvider.css";

const MySwal = withReactContent(Swal);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const showAlert = useCallback(
    async (options: AlertOptions) => {
      const {
        title,
        message,
        type = "info",
        actions = [],
        showCancelButton = false,
        cancelButtonText,
        confirmButtonText,
      } = options;

      // Use custom actions if provided, otherwise use default Swal buttons
      const hasCustomActions = actions.length > 0;

      const result = await MySwal.fire({
        title,
        text: message,
        icon: type as SweetAlertIcon,
        showConfirmButton:
          !hasCustomActions || actions.some((a) => a.variant !== "outline"),
        showCancelButton:
          showCancelButton ||
          (hasCustomActions && actions.some((a) => a.variant === "outline")),
        confirmButtonText:
          confirmButtonText ||
          (hasCustomActions
            ? actions.find((a) => a.variant !== "outline")?.label
            : isAr
              ? "حسناً"
              : "OK"),
        cancelButtonText:
          cancelButtonText ||
          (hasCustomActions
            ? actions.find((a) => a.variant === "outline")?.label
            : isAr
              ? "إلغاء"
              : "Cancel"),
        reverseButtons: isAr,
        customClass: {
          container: "swal-custom-container",
          popup: "swal-custom-popup",
          title: "swal-custom-title",
          htmlContainer: "swal-custom-content",
          confirmButton: "swal-custom-confirm",
          cancelButton: "swal-custom-cancel",
        },
        buttonsStyling: false,
      });

      if (result.isConfirmed) {
        const confirmAction = actions.find((a) => a.variant !== "outline");
        if (confirmAction) confirmAction.onClick();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        const cancelAction = actions.find((a) => a.variant === "outline");
        if (cancelAction) cancelAction.onClick();
      }
    },
    [isAr]
  );

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
