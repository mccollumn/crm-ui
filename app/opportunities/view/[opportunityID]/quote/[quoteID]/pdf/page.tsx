import React from "react";
import QuotePDF from "./QuotePDF";

const QuotePdfView = async ({
  params,
}: {
  params: { opportunityID: string; quoteID: string };
}) => {
  const opportunityID = params.opportunityID;
  const quoteID = params.quoteID;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/pdf/quote/${quoteID}`
  );
  const html = await response.text();

  const pdfHtml = html.replace(
    "<title>Page Title</title>",
    "<title>Quote</title>"
  );

  return <QuotePDF pdfHtml={pdfHtml} />;
};

export default QuotePdfView;
