import { MainLayout } from "../../components/templates/MainLayout";
import { ContactUs } from "../../components/organisms/Home/ContactUs";

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
