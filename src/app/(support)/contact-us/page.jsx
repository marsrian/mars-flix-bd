import ContactUsForm from "@/components/form/ContactusForm";
import { FiMail } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

const ContactUsPage = () => {
  return (
    <div id="contact" className="mt-8 md:12 px-4 md:px-0">
      <h1 className="text-5xl font-bold text-center mb-8 md:mb-12">
        Contact Us
      </h1>
      <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-28">
        <ContactUsForm />
        {/* Contact  Info */}
        <div className="">
          <h5 className="text-2xl font-bold mb-4">Contact Info :</h5>
          <p className="flex items-center mb-3">
            <FiMail className="w-6 h-6 mr-2"></FiMail> marsrian40@gmail.com
          </p>
          <p className="flex items-center mb-5">
            <IoLocationOutline className="w-6 h-6 mr-2"></IoLocationOutline>
            Sylhet, Bangladesh
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;