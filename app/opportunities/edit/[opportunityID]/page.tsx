"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { OpportunityForm } from "@/app/forms/OpportunityForm";

const EditOpportunity = ({ params }: { params: { opportunityID: string } }) => {
  const router = useRouter();
  const [values, setValues] = React.useState<{} | null>(null);
  const opportunityID = params.opportunityID;

  React.useEffect(() => {
    (async () => {
      const data = await getOpportunityData(opportunityID);
      setValues(data);
    })();
  }, [opportunityID]);

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

  if (values) {
    return (
      <OpportunityForm
        formTitle="Edit Opportunity"
        onSuccess={onSuccess}
        onCancel={handleCancel}
        defaultValues={values}
      />
    );
  }
  return <div>Loading...</div>;
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
