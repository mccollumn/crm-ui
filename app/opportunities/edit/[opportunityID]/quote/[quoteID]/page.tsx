"use client";

import { useRouter } from "next/navigation";
import { QuoteForm } from "@/app/forms/QuoteForm";

const EditQuote = ({
  params,
}: {
  params: { opportunityID: string; quoteID: string };
}) => {
  const router = useRouter();

  const opportunityID = params.opportunityID;
  const quoteID = params.quoteID;
  const values = getQuoteData(quoteID);

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
    <QuoteForm
      formTitle="Edit Quote"
      onSuccess={onSuccess}
      onCancel={handleCancel}
      defaultValues={values}
    />
  );
};

const getQuoteData = async (quoteID: string) => {
  // TODO: Retreive order data.
  return {};
};

export default EditQuote;
