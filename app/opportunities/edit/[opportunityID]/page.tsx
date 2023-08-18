"use client";

import { useRouter } from "next/navigation";
import { OpportunityForm } from "@/app/forms/OpportunityForm";

const EditOpportunity = ({ params }: { params: { opportunityID: string } }) => {
  const router = useRouter();

  const opportunityID = params.opportunityID;
  const values = getOpportunityData(opportunityID);

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
    <OpportunityForm
      formTitle="Edit Opportunity"
      onSuccess={onSuccess}
      onCancel={handleCancel}
      defaultValues={values}
    />
  );
};

const getOpportunityData = (opportunityID: string) => {
  // TODO: Retreive case data.
  return {};
};

export default EditOpportunity;
