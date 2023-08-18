"use client";

import { useRouter } from "next/navigation";
import { OpportunityForm } from "@/app/forms/OpportunityForm";

const NewOpportunity = () => {
  const router = useRouter();

  const onSuccess = (values: any) => {
    console.log("Success values", values);
    // TODO:
    // PUT data
    // Verify successful response
    // Get ID
    const opportunityID = "";
    router.push(`/opportunities/view/${opportunityID}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <OpportunityForm
      formTitle="New Opportunity"
      onSuccess={onSuccess}
      onCancel={handleCancel}
    />
  );
};

export default NewOpportunity;
