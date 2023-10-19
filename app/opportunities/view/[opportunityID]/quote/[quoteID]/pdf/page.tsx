// "use client";

import React from "react";
import QuotePDF from "./QuotePDF";
import { useReactToPrint } from "react-to-print";

const QuotePdfView = ({
  params,
}: {
  params: { opportunityID: string; quoteID: string };
}) => {
  const opportunityID = params.opportunityID;
  const quoteID = params.quoteID;
  //   const componentRef = React.useRef<any>();

  //   const handlePrint = useReactToPrint({
  //     content: () => componentRef.current,
  //     documentTitle: "Quote",
  //   });

  //   return <QuotePDF quoteID={quoteID} ref={componentRef} />;
  return <QuotePDF quoteID={quoteID} />;
};

export default QuotePdfView;
