"use client";

import React from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ContactForm, INITIAL_DATA } from "@/app/forms/ContactForm";

const EditContact = ({ params }: { params: { contactID: string } }) => {
  const router = useRouter();

  const contactID = params.contactID;
  const [data, setData] = React.useState(getContactData(contactID));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
    // PUT data
    // Verify successful response
    router.push(`/contacts/view/${contactID}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ContactForm {...data} setData={setData} formTitle="Edit Contact" />
    </form>
  );
};

const getContactData = (contactID: string) => {
  // TODO: Retreive contact data. Just returning initial data for now.
  return INITIAL_DATA;
};

export default EditContact;
