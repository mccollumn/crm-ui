import { QuoteFulfillmentForm } from "@/app/forms/quote/QuoteFulfillmentForm";
import { createQuoteFulfillmentFormData } from "@/app/forms/quote/quoteFulfillmentFormUtils";
import {
  getAccountData,
  getMenuItems,
  getOpportunityData,
  getQuoteData,
} from "@/app/utils/getData";

const NewFulfillment = async ({
  params,
}: {
  params: { opportunityID: string; quoteID: string };
}) => {
  const opportunityID = params.opportunityID;
  const quoteID = params.quoteID;
  const quoteDataPromise = getQuoteData(quoteID);
  const opportunityDataPromise = getOpportunityData(opportunityID);
  const menuItemsPromise = getMenuItems();
  const [quoteData, opportunityData, menuItems] = await Promise.all([
    quoteDataPromise,
    opportunityDataPromise,
    menuItemsPromise,
  ]);
  const accountID = opportunityData.OpportunityDetail.Opportunities_AccountId;
  const accountData = await getAccountData(accountID);
  const values = await createQuoteFulfillmentFormData({ quoteData });

  return (
    <QuoteFulfillmentForm
      formTitle="New Quote Fulfillment"
      defaultValues={values}
      menuItems={menuItems}
      quoteData={quoteData}
      accountData={accountData}
    />
  );
};

export default NewFulfillment;
