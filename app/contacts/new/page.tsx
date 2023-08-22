"use client";

import { useRouter } from "next/navigation";
import { ContactForm } from "@/app/forms/ContactForm";

const NewContact = () => {
  const router = useRouter();

  const onSuccess = async (values: any) => {
    console.log("Success values", values);
    // TODO:
    // PUT data
    const data = await fetch("/contacts/api/new/");
    // Verify successful response
    // Get ID
    const contactID = "";
    router.push(`/contacts/view/${contactID}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ContactForm
      formTitle="New Contact"
      onSuccess={onSuccess}
      onCancel={handleCancel}
    />
  );
};

export default NewContact;
