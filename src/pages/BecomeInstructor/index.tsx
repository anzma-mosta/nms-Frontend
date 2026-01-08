import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/atoms/SEO";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAlert } from "../../providers/AlertContext";
import { BecomeInstructorHero } from "../../components/organisms/BecomeInstructor/Hero";
import { BecomeInstructorBenefits } from "../../components/organisms/BecomeInstructor/Benefits";
import { BecomeInstructorStats } from "../../components/organisms/BecomeInstructor/Stats";
import {
  BecomeInstructorForm,
  type InstructorFormValues,
} from "../../components/organisms/BecomeInstructor/Form";

const BecomeInstructor = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { showAlert } = useAlert();

  const instructorSchema = z.object({
    fullName: z
      .string()
      .min(3, { message: t("become_instructor.form.validation.name_min") }),
    email: z
      .string()
      .email({ message: t("become_instructor.form.validation.email_invalid") }),
    specialty: z.string().min(2, {
      message: t("become_instructor.form.validation.specialty_required"),
    }),
    experience: z.string().min(10, {
      message: t("become_instructor.form.validation.experience_min"),
    }),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InstructorFormValues>({
    resolver: zodResolver(instructorSchema),
  });

  const onSubmit = async (data: InstructorFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form Data:", data);

    showAlert({
      title: t("become_instructor.form.success_title"),
      message: t("become_instructor.form.success_message"),
      type: "success",
    });

    reset();
  };
  return (
    <MainLayout>
      <SEO
        title={t("become_instructor.hero.title")}
        description={t("become_instructor.hero.subtitle")}
      />

      <BecomeInstructorHero isAr={isAr} t={t} />
      <BecomeInstructorBenefits t={t} />
      <BecomeInstructorStats t={t} />
      <BecomeInstructorForm
        isAr={isAr}
        t={t}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </MainLayout>
  );
};

export default BecomeInstructor;

