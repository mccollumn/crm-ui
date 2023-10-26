import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ButtonNav } from "../navigation/ButtonNav";
import { InformationSection } from "../InformationSection";
import { getAccountData, getQuoteData } from "@/app/utils/getData";
import {
  convertStringToArray,
  formatCheckbox,
  formatCurrency,
  formatDate,
  formatNumber,
  formatPercent,
  unEscape,
} from "@/app/utils/utils";
import Link from "next/link";
import { QuoteData } from "@/app/types/quotes";
import { AccountData } from "@/app/types/accounts";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const QuoteInformation = async ({ quoteID }: QuoteInformationProps) => {
  const quoteData: QuoteData = await getQuoteData(quoteID);
  const accountID = quoteData.QuoteDetail.Opportunities_AccountID;
  let accountData: AccountData;
  let quoteInfo;
  if (accountID) {
    accountData = await getAccountData(accountID);
    quoteInfo = await getQuoteInfo(quoteData, accountData);
  } else {
    quoteInfo = await getQuoteInfo(quoteData);
  }
  const opportunityID = quoteData.QuoteDetail.Quotes_OpportunityID;
  const fulfillmentID = quoteData?.QuoteFullfillment?.QuoteFulfillment_ID;

  return (
    <>
      <ButtonNav
        size="small"
        path={`/opportunities/edit/${opportunityID}/quote/${quoteID}`}
      >
        Edit
      </ButtonNav>
      {fulfillmentID ? (
        <ButtonNav
          size="small"
          path={`/opportunities/edit/${opportunityID}/quote/${quoteID}/fulfillment/${fulfillmentID}`}
        >
          Fulfillment
        </ButtonNav>
      ) : (
        <ButtonNav
          size="small"
          path={`/opportunities/new/${opportunityID}/quote/${quoteID}/fulfillment`}
        >
          Fulfillment
        </ButtonNav>
      )}
      <ButtonNav
        size="small"
        path={`/opportunities/view/${opportunityID}/quote/${quoteID}/pdf`}
      >
        Quote PDF
      </ButtonNav>

      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="quote-info-section-content"
          id="quote-info-section-header"
        >
          <Typography variant="h6">Quote Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="quote-info-section-content">
          <InformationSection
            itemsLeft={quoteInfo.info.left}
            itemsRight={quoteInfo.info.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="quote-payment-section-content"
          id="quote-payment-section-header"
        >
          <Typography variant="h6">Payment Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="quote-payment-section-content">
          <InformationSection
            itemsLeft={quoteInfo.payment.left}
            itemsRight={quoteInfo.payment.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="quote-totals-section-content"
          id="quote-totals-section-header"
        >
          <Typography variant="h6">Totals</Typography>
        </AccordionSummary>
        <AccordionDetails id="quote-totals-section-content">
          <InformationSection
            itemsLeft={quoteInfo.totals.left}
            itemsRight={quoteInfo.totals.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="quote-product-section-content"
          id="quote-product-section-header"
        >
          <Typography variant="h6">Product Family Totals</Typography>
        </AccordionSummary>
        <AccordionDetails id="quote-product-section-content">
          <InformationSection
            itemsLeft={quoteInfo.productTotals.left}
            itemsRight={quoteInfo.productTotals.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="quote-discounts-section-content"
          id="quote-discounts-section-header"
        >
          <Typography variant="h6">Discounts</Typography>
        </AccordionSummary>
        <AccordionDetails id="quote-discounts-section-content">
          <InformationSection
            itemsLeft={quoteInfo.discounts.left}
            itemsRight={quoteInfo.discounts.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="quote-entitlements-section-content"
          id="quote-entitlements-section-header"
        >
          <Typography variant="h6">Entitlements</Typography>
        </AccordionSummary>
        <AccordionDetails id="quote-entitlements-section-content">
          <InformationSection
            itemsLeft={quoteInfo.entitlements.left}
            itemsRight={quoteInfo.entitlements.right}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const getQuoteInfo = async (
  quoteData: QuoteData,
  accountData?: AccountData
) => {
  return {
    info: {
      left: [
        {
          label: "Quote Owner",
          value: quoteData.QuoteDetail.Owners_Name,
        },
        {
          label: "Quote Name",
          value: unEscape(quoteData.QuoteDetail.Quotes_Name || ""),
        },
        {
          label: "Opportunity Name",
          value: (
            <Link
              href={`/opportunities/view/${quoteData.QuoteDetail.Quotes_OpportunityID}`}
            >
              {unEscape(quoteData.QuoteDetail.Opportunities_Name || "")}
            </Link>
          ),
        },
        {
          label: "Account Name",
          value: quoteData.QuoteDetail.Quotes_AccountName,
        },
        {
          label: "Super Region",
          value: accountData
            ? accountData.AccountDetail.Accounts_Super_Region
            : "",
        },
        {
          label: "Is Channel",
          value: formatCheckbox(quoteData.QuoteDetail.Quotes_IsChannel),
        },
        {
          label: "Additional Quote Comments",
          value: quoteData.QuoteDetail.Quotes_Comments,
        },
      ],
      right: [
        {
          label: "Status",
          value: quoteData.QuoteDetail.Quotes_Status,
        },
        // {
        //   label: "Quote Office Location",
        //   value: "",
        // },
        {
          label: "Currency Code",
          value: quoteData.QuoteDetail.Quotes_CurrencyCode,
        },
        // {
        //   label: "Currency Symbol",
        //   value: quoteData.QuoteDetail.Quotes_CurrencySymbol,
        // },
        {
          label: "Valid Through",
          value: formatDate(quoteData.QuoteDetail.Quotes_ValidThrough),
        },
        {
          label: "Is Primary",
          value: formatCheckbox(""),
        },
        {
          label: "Notes to OM",
          value: quoteData.QuoteDetail.Quotes_SalesNotesToOM,
        },
      ],
    },
    payment: {
      left: [
        {
          label: "Payment Method",
          value: quoteData.QuotePaymentInfo.Quotes_PaymentMethod,
        },
        {
          label: "Payment Document Number",
          value: quoteData.QuotePaymentInfo.Quotes_PaymentDocumentNumber,
        },
      ],
      right: [
        {
          label: "Billing Frequency",
          value: quoteData.QuotePaymentInfo.Quotes_BillingFrequency,
        },
        {
          label: "Payment Terms",
          value: quoteData.QuotePaymentInfo.Quotes_PaymentTerms,
        },
        {
          label: "Paymeny Terms Result",
          value: quoteData.QuotePaymentInfo.Quotes_PaymentTermsResult,
        },
      ],
    },
    totals: {
      left: [
        {
          label: "Total List Price",
          value: formatNumber(quoteData.QuoteTotals.Quotes_TotalListPrice),
        },
        {
          label: "Total Price",
          value: formatNumber(quoteData.QuoteTotals.Quotes_TotalPrice),
        },
        {
          label: "Total Price - Products",
          value: formatNumber(quoteData.QuoteTotals.Quotes_TotalPriceProducts),
        },
        {
          label: "Total One Year Amount",
          value: formatNumber(quoteData.QuoteTotals.Quotes_TotalOneYearAmount),
        },
      ],
      right: [
        {
          label: "USD Total List Price",
          value: formatCurrency(quoteData.QuoteTotals.Quotes_USDTotalListPrice),
        },
        {
          label: "USD Total Price",
          value: formatCurrency(quoteData.QuoteTotals.Quotes_USDTotalPrice),
        },
        {
          label: "Current Financual Exchange Rate to USD",
          value: quoteData.QuoteTotals.Quotes_ExchangeRateToUSD,
        },
        {
          label: "USD Total One Year Amount",
          value: formatCurrency(
            quoteData.QuoteTotals.Quotes_USDTotalOneYearAmount
          ),
        },
      ],
    },
    productTotals: {
      left: [
        {
          label: "Total Analytics Software",
          value: formatCurrency(
            quoteData.QuoteProductTotals.Quotes_TotalAnalyticsSoftware
          ),
        },
        {
          label: "Total Analytics Maintenance",
          value: formatCurrency(
            quoteData.QuoteProductTotals.Quotes_TotalAnalyticsMaintenance
          ),
        },
      ],
      right: [
        {
          label: "Total Consulting, Training, & Other",
          value: "",
        },
      ],
    },
    discounts: {
      left: [
        {
          label: "Highest Product Discount",
          value: formatPercent(
            quoteData.QuoteDiscounts.Quotes_HighestProductDiscount
          ),
        },
        {
          label: "Net Quote Discount",
          value: formatPercent(
            quoteData.QuoteDiscounts.Quotes_NetQuoteDiscount
          ),
        },
      ],
      right: [
        {
          label: "Highest Services Discount",
          value: formatPercent(
            quoteData.QuoteDiscounts.Quotes_HighestServicesDiscount
          ),
        },
        {
          label: "Discount Reason",
          value: quoteData.QuoteDiscounts.Quotes_DiscountReason,
        },
        {
          label: "Discount Reasons List",
          value: convertStringToArray(
            quoteData.QuoteDiscounts.Quotes_DiscountPickList
          ),
        },
      ],
    },
    entitlements: {
      left: [
        {
          label: "Analytics Page Views",
          value: formatNumber(
            quoteData.QuoteEntitlements.Quotes_AnalyticsPageViews
          ),
        },
      ],
      right: [
        {
          label: "Existing Analytics Page Views",
          value: formatNumber(
            quoteData.QuoteEntitlements.Quotes_ExistingAnalyticsPageViews
          ),
        },
      ],
    },
  };
};

interface QuoteInformationProps {
  quoteID: string;
}

export default QuoteInformation;
