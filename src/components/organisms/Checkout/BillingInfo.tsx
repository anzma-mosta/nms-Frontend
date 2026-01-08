import { useTranslation } from "react-i18next";
import { Reveal } from "../../atoms/Reveal";
import { cn } from "../../../utils/cn";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CheckoutFormValues } from "../../../pages/Checkout";

interface BillingInfoSectionProps {
  register: UseFormRegister<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
}

export const BillingInfoSection = ({
  register,
  errors,
}: BillingInfoSectionProps) => {
  const { t } = useTranslation();

  return (
    <Reveal delay={0.1}>
      <div className="bg-card border border-border rounded-[2.5rem] p-8 lg:p-12 shadow-sm">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-sm text-primary">
            1
          </span>
          {t("checkout.personal_info")}
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold">
                {t("checkout.full_name")}
              </label>
              <input
                {...register("fullName")}
                className={cn(
                  "w-full bg-secondary/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all",
                  errors.fullName && "ring-2 ring-red-500"
                )}
                placeholder={t("checkout.full_name_placeholder")}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">{t("checkout.email")}</label>
              <input
                {...register("email")}
                className={cn(
                  "w-full bg-secondary/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all",
                  errors.email && "ring-2 ring-red-500"
                )}
                placeholder="example@mail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">{t("checkout.phone")}</label>
            <input
              {...register("phone")}
              className={cn(
                "w-full bg-secondary/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all",
                errors.phone && "ring-2 ring-red-500"
              )}
              placeholder="+20 123 456 789"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
};
