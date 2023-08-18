"use client";

import { useRouter } from "next/navigation";
import { ContactRoleForm } from "@/app/forms/ContactRoleForm";

const NewContactRole = ({ params }: { params: { opportunityID: string } }) => {
  const router = useRouter();
  const opportunityID = params.opportunityID;

  const onSuccess = (values: any) => {
    console.log("Success values", values);
    // TODO:
    // PUT data
    // Verify successful response
    router.push(`/opportunities/view/${opportunityID}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ContactRoleForm
      formTitle="New Contact Role"
      onSuccess={onSuccess}
      onCancel={handleCancel}
    />
  );
};

export default NewContactRole;
