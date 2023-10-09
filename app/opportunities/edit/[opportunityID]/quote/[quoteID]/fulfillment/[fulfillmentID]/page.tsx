import { QuoteFulfillmentForm } from "@/app/forms/quote/QuoteFulfillmentForm";
import { createQuoteFulfillmentFormData } from "@/app/forms/quote/quoteFulfillmentFormUtils";
import {
  getAccountData,
  getMenuItems,
  getOpportunityData,
  getQuoteData,
  getQuoteFulfillmentData,
} from "@/app/utils/getData";

const EditQuoteFulfillment = async ({
  params,
}: {
  params: { opportunityID: string; quoteID: string; fulfillmentID: string };
}) => {
  const opportunityID = params.opportunityID;
  const quoteID = params.quoteID;
  const fulfillmentID = params.fulfillmentID;
  const quoteDataPromise = getQuoteData(quoteID);
  const opportunityDataPromise = getOpportunityData(opportunityID);
  const quoteFulfillmentDataPromise = getQuoteFulfillmentData(fulfillmentID);
  const menuItemsPromise = getMenuItems();
  const [quoteData, opportunityData, fulfillmentData, menuItems] =
    await Promise.all([
      quoteDataPromise,
      opportunityDataPromise,
      quoteFulfillmentDataPromise,
      menuItemsPromise,
    ]);
  const accountID = opportunityData.OpportunityDetail.Opportunities_AccountId;
  const fulfillmentName =
    fulfillmentData.QuoteFulfillmentDetail.QuoteFulfillment_Name;
  const accountData = await getAccountData(accountID);
  const values = await createQuoteFulfillmentFormData({
    quoteData,
    fulfillmentData,
  });

  return (
    <QuoteFulfillmentForm
      formTitle={`Edit Quote Fulfillment - ${fulfillmentName}`}
      defaultValues={values}
      menuItems={menuItems}
      quoteData={quoteData}
      accountData={accountData}
      quoteFulfillmentData={fulfillmentData}
    />
  );
};

export default EditQuoteFulfillment;
