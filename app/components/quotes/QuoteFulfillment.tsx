import React from "react";
import { DataTable } from "../DataTable";
import { getLicenseKeyData, getQuoteData } from "@/app/utils/getData";
import { ButtonNav } from "../navigation/ButtonNav";
import { QuoteData } from "@/app/types/quotes";
import { isObjectEmpty } from "@/app/utils/utils";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function QuoteFulfillment_CreatedByID({
  quoteID,
}: QuoteFulfillmentProps) {
  const quoteData: QuoteData = await getQuoteData(quoteID);
  const opportunityID = quoteData.QuoteDetail.Quotes_OpportunityID;
  const licenseKeyID =
    quoteData.QuoteFullfillment.QuoteFulfillment_LicenseKeyID;
  const quoteFulfillment = quoteData.QuoteFullfillment;

  let licenseKeyData = {};
  if (licenseKeyID) {
    licenseKeyData = await getLicenseKeyData(licenseKeyID);
  }

  return (
    <>
      {isObjectEmpty(quoteFulfillment) && (
        <ButtonNav
          size="small"
          path={`/opportunities/new/${opportunityID}/quote/${quoteID}/fulfillment`}
        >
          New
        </ButtonNav>
      )}
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<>Loading fulfillments...</>}>
          <DataTable
            rows={isObjectEmpty(quoteFulfillment) ? [] : [quoteFulfillment]}
            columnDefType="quoteFulfillment"
            data={{ ...licenseKeyData, ...quoteData }}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface QuoteFulfillmentProps {
  quoteID: string;
}
