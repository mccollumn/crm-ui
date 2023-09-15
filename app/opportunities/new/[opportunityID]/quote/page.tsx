"use client";

import { useRouter } from "next/navigation";
import { QuoteForm } from "@/app/forms/quote/QuoteForm";

const NewQuote = ({ params }: { params: { opportunityID: string } }) => {
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
    <QuoteForm
      formTitle="New Quote"
      onSuccess={onSuccess}
      onCancel={handleCancel}
    />
  );
};

export default NewQuote;
