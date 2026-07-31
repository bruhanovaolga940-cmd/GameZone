import { useState } from "react";
import emailjs from "@emailjs/browser";

const useForm = () => {
  const [formData, setFormData] = useState({
    club_name: "",      
    address: "",         
    description: "",     
    phone: "",
    site: "",
    email: "",           
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false });

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          place_name:formData.club_name,
          address:formData.address,
          phone: formData.phone,
          description:formData.description,
          site: formData.site, 
          email: formData.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus({ loading: false, success: true, error: false });
      setFormData({
        club_name: "",
        address: "",
        phone: "",
        description: "",
        site: "",
        email: "",
      });

    } catch (error) {
      console.error("Ошибка:", error);
      setStatus({ loading: false, success: false, error: true });
    }
  };

  return { formData, status, handleChange, handleSubmit };
};

export default useForm;