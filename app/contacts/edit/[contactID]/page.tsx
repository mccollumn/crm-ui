"use client";

import { useRouter } from "next/navigation";
import { ContactForm } from "@/app/forms/ContactForm";

const EditContact = ({ params }: { params: { contactID: string } }) => {
  const router = useRouter();

  const contactID = params.contactID;
  const values = getContactData(contactID);

  const onSuccess = async (values: any) => {
    console.log("Success values", values);
    // TODO:
    // PUT data
    const data = await fetch(`/contacts/api/${contactID}/update/`);
    // Verify successful response
    router.push(`/contacts/view/${contactID}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ContactForm
      formTitle="Edit Contact"
      onSuccess={onSuccess}
      onCancel={handleCancel}
      defaultValues={values}
    />
  );
};

const getContactData = async (contactID: string) => {
  // TODO: Retreive contact data.
  const data = await fetch(
    `${process.env.API_ENDPOINT}/contacts/api/${contactID}`
  );
  // return data || {};
  return {};
};

export default EditContact;
