import { MainLayout } from "../../layouts/MainLayout";
import { ContactUs } from "../Home/components/ContactUs";

const Contact = () => {
  return (
    <MainLayout>
      <div className="py-20">
        <ContactUs />
      </div>
    </MainLayout>
  );
};

export default Contact;
