"use client";

import { useRouter } from "next/navigation";
import { OpportunityForm } from "@/app/forms/OpportunityForm";

const EditOpportunity = ({ params }: { params: { opportunityID: string } }) => {
  const router = useRouter();

  const opportunityID = params.opportunityID;
  const values = getOpportunityData(opportunityID);

  const onSuccess = async (values: any) => {
    console.log("Success values", values);
    // TODO:
    // PUT data
    const data = await fetch(`/opportunities/api/${opportunityID}/update/`);
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

const getOpportunityData = async (opportunityID: string) => {
  // TODO: Retreive case data.
  const data = await fetch(
    `${process.env.API_ENDPOINT}/opportunities/api/${opportunityID}`
  );
  // return data || {};
  return {};
};

export default EditOpportunity;
