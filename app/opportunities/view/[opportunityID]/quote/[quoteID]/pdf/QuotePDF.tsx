"use client";

import React from "react";
import { ButtonNav } from "@/app/components/navigation/ButtonNav";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/navigation";

const QuotePDF = ({ pdfHtml }: QuotePDFProps) => {
  const router = useRouter();
  const componentRef = React.useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Quote",
    copyStyles: false,
  });

  const handleBack = () => router.back();

  return (
    <>
      <ButtonNav size="small" onClick={handleBack} path="">
        Back
      </ButtonNav>
      <ButtonNav size="small" onClick={handlePrint} path="">
        Print
      </ButtonNav>
      <div ref={componentRef}>
        <style>{getPageMargins()}</style>
        <style type="text/css" media="print">
          {"@page { size: portrait; }"}
        </style>
        <div dangerouslySetInnerHTML={{ __html: pdfHtml }} />
      </div>
    </>
  );
};

const getPageMargins = () => {
  return "@page { margin: 4mm 4mm 0 0 !important; }";
};

interface QuotePDFProps {
  pdfHtml: string;
  ref?: React.MutableRefObject<any>;
}

export default QuotePDF;
