import React from "react";
import { useRouter } from "next/navigation";
import { MenuItem } from "@/app/types/types";
import {
  appendToDelimitedString,
  convertArrayToString,
  convertBooleanToString,
  convertDateToISOString,
  convertNumberToString,
  getChangedValues,
  isSuccessfulResponse,
  cleanObject,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import {
  OpportunityData,
  OpportunityFormData,
  Product,
  Quote,
} from "@/app/types/opportunities";
import { QuoteData } from "@/app/types/quotes";
import { ProductData } from "@/app/types/products";
import { AccountData } from "@/app/types/accounts";

export const useOpportunityForm = ({ menuItems }: useOpportunityFormProps) => {
  const router = useRouter();
  const initialMenuOptions = {
    Owner: [],
    Account: [],
    OpportunityType: [],
    Product: [],
    ProductFamily: [],
    Stage: [],
    ForecastStatus: [],
    "Term(months)": [],
    Interest: [],
    RenewalStatus: [],
    Resell: [],
    CustomerType: [],
    TerritoryOverride: [],
  };

  const {
    setMenuOptions,
    setCustomMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    user,
    FormatCurrency,
    FormatNumber,
  } = useForm({
    initialMenuOptions,
    menuItems,
  });

  React.useEffect(() => {
    // Active Accounts
    const setAccounts = async () => {
      try {
        const results = await fetch(
          `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/account/list/accounts/type/active`
        );
        const accounts = await results.json();
        if (!Array.isArray(accounts)) return;
        const options = accounts.map((account: any) => {
          return {
            id: account.Accounts_AccountID,
            name: account.Accounts_Name,
            site: account.Accounts_Site,
          };
        });
        setCustomMenuOptions("Account", options);
      } catch {
        console.error("Could not retrieve list of accounts");
      }
    };
    setAccounts();

    // Contact Owner
    const setOwners = async () => {
      try {
        const results = await fetch(
          `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/user/list/internal`
        );
        const owners = await results.json();
        if (!Array.isArray(owners)) return;
        const options = owners.map((owner: any) => {
          return { id: owner.Users_ID, name: owner.Users_Name };
        });
        setCustomMenuOptions("Owner", options);
      } catch {
        console.error("Could not retrieve list of users");
      }
    };
    setOwners();

    // Set menu options that are already known (i.e. aren't based on user input)
    setMenuOptions("OpportunityType");
    setMenuOptions("Product");
    setMenuOptions("ProductFamily");
    setMenuOptions("Stage");
    setMenuOptions("Term(months)");
    setMenuOptions("Interest");
    setMenuOptions("RenewalStatus");
    setMenuOptions("Resell");
    setMenuOptions("CustomerType");
    setMenuOptions("TerritoryOverride");
    setMenuOptions("ForecastStatus");
  }, [setCustomMenuOptions, setMenuOptions]);

  const createOpportunityFormSubmissionData = async (
    values: OpportunityFormData,
    opportunityData?: OpportunityData,
    submitType?: SubmitType
  ) => {
    const accountID = values.account.id;
    const accountData: OpportunityAccountData = await (
      await fetch(`/api/accounts/${accountID}`)
    ).json();
    const primaryQuote = opportunityData
      ? getPrimaryQuote(opportunityData)
      : null;
    const primaryQuoteData: { data: QuoteData } = primaryQuote
      ? await (await fetch(`/api/quotes/${primaryQuote?.Quotes_ID}`)).json()
      : null;
    const usdOneYearAmount = primaryQuoteData?.data.QuoteTotals
      ?.Quotes_USDTotalOneYearAmount
      ? primaryQuoteData?.data.QuoteTotals.Quotes_USDTotalOneYearAmount
      : null;
    // The opportunity amount can be specified in the form,
    // but also updates automatically to match the primary quote amount.
    // submitType = "auto" indicates the opportunity is being updated as the result of a quote / quote product update.
    let amount;
    if (submitType === "auto") {
      amount = primaryQuote ? getAmount(primaryQuote) : values.amount || "0";
    } else {
      amount = values.amount
        ? values.amount
        : opportunityData?.OpportunityDetail.Opportunities_Amount || "0";
    }
    const baselineRenewalAmount = opportunityData
      ? getBaselineRenewalAmount(opportunityData, primaryQuoteData?.data)
      : null;
    const servicesRenewalAmount = opportunityData
      ? getServicesRenewalAmount(opportunityData, primaryQuoteData?.data)
      : null;
    const firstYearContractAmount = calculateFirstYearContractAmount(
      usdOneYearAmount,
      amount
    );
    const firstYearExpectedAmount = calculateFirstYearExpectedAmount(
      usdOneYearAmount,
      amount,
      values.probability
    );
    const opportunityProducts = opportunityData?.OpportunityProducts || [];
    const opportunityProductsData = await getOpportunityProductData(
      opportunityProducts
    );
    const pfAnalyticsOP = getPFValue(
      opportunityProductsData,
      opportunityProducts,
      calculatePFAnalyticsOP
    );
    const pfOther = getPFValue(
      opportunityProductsData,
      opportunityProducts,
      calculatePFOther
    );
    const pfServices = getPFValue(
      opportunityProductsData,
      opportunityProducts,
      calculatePFServices
    );
    const pfConsulting = getPFValue(
      opportunityProductsData,
      opportunityProducts,
      calculatePFConsulting
    );
    const pfTraining = getPFValue(
      opportunityProductsData,
      opportunityProducts,
      calculatePFTraining
    );
    const pfEPS = getPFValue(
      opportunityProductsData,
      opportunityProducts,
      calculatePFEPS
    );
    const pfDigitalIntelligence = getPFValue(
      opportunityProductsData,
      opportunityProducts,
      calculatePFDigitalIntelligence
    );
    const totalBaseline = calculateTotalBaseline(
      values.renewal.baselineAmount,
      values.renewal.servicesAmount
    );
    const renewalGrowthPercentage = calculateRenewalGrowthPercentage(
      totalBaseline,
      firstYearContractAmount
    );
    const renewalGrowthResults = calculateRenewalGrowthResults(
      values.opportunityType,
      renewalGrowthPercentage
    );
    const territory = calculateTerritory(
      accountData.data.AccountDetail.Accounts_Super_Region,
      values.territory
    );

    const data = {
      OpportunityDetail: {
        Opportunities_ID: values.id,
        Opportunities_AccountId: values.account.id,
        Accounts_Name: values.account.name,
        Opportunities_Amount: amount,
        Opportunities_CloseDate: convertDateToISOString(
          new Date(values.closeDate || 0)
        ),
        Opportunities_CommissionCategory: values.opportunityType,
        Opportunities_ContainsNewBusiness: convertBooleanToString(
          values.newBusiness
        ),
        Opportunities_FastNotesNextSteps: values.fastNotes,
        Opportunities_FirstYrContractAmt: firstYearContractAmount,
        Opportunities_FirstYrExpectedAmt: firstYearExpectedAmount,
        Opportunities_ForecastStatus: values.forecastStatus,
        Opportunities_Interest: convertArrayToString(values.interest),
        Opportunities_MultiYearYear1Amount: usdOneYearAmount,
        Opportunities_Name: values.name,
        Opportunities_OpportunityType: values.opportunityType,
        Opportunities_OwnerID: values.owner.id,
        Owners_Name: values.owner.name,
        Opportunities_Probability: convertNumberToString(values.probability),
        Opportunities_Product: values.product.name,
        Opportunities_ProductFamily: values.product.family,
        Opportunities_StageName: values.stage.name,
        Opportunities_Term: values.term,
        Opportunities_Territory: territory,
        Opportunities_Type: values.type,
      },
      OpportunitySolutionsOverview: {
        Opportunities_PFConsulting: pfConsulting,
        Opportunities_PFDigitalIntelligence: pfDigitalIntelligence,
        Opportunities_PFEPS: pfEPS,
        Opportunities_PFLICAnalytics: pfAnalyticsOP,
        Opportunities_PFOther: pfOther,
        Opportunities_PFServices: pfServices,
        Opportunities_PFTraining: pfTraining,
      },
      OpportunityRenewalInfo: {
        Opportunities_ID: values.id,
        Opportunities_BaselineRenewalAmount: baselineRenewalAmount,
        Opportunities_BaselineRenewalDate: convertDateToISOString(
          new Date(values.renewal.baselineRenewalDate || 0)
        ),
        Opportunities_RenewalStatus: values.renewal.status,
        Opportunities_RenewalStatusCommentsNextSteps: values.renewal.comments,
        Opportunities_ServicesRenewalAmount: servicesRenewalAmount,
        Opportunities_TotalBaseline: totalBaseline,
        Opportunities_MultiYearaddback: convertBooleanToString(
          values.renewal.multiYearAddBack
        ),
        Opportunities_RenewalGrowthPercentage: renewalGrowthPercentage,
        Opportunities_RenewalGrowthResults: renewalGrowthResults,
        Opportunities_Resell: values.renewal.resell,
      },
      OpportunityPartnerDetail: {
        Opportunities_ID: values.id,
        Opportunities_ChannelDeal: convertBooleanToString(
          values.partner.channelDeal
        ),
        Opportunities_FulfillingPartnerID: values.partner.fulfillingPartner,
        Opportunities_InfluencingPartnerID: values.partner.influencingPartner,
        Opportunities_OriginatingPartnerID: values.partner.originatingPartner,
        Opportunities_ReferringPartnerID: values.partner.referringPartner,
      },
      OpportunityStageTracking: {
        Opportunities_ID: values.id,
        Opportunities_MostRecentStage1: convertDateToISOString(
          new Date(values.stage.stageOneDate || 0)
        ),
        Opportunities_MostRecentStage2: convertDateToISOString(
          new Date(values.stage.stageTwoDate || 0)
        ),
        Opportunities_MostRecentStage3: convertDateToISOString(
          new Date(values.stage.stageThreeDate || 0)
        ),
        Opportunities_MostRecentStage4: convertDateToISOString(
          new Date(values.stage.stageFourDate || 0)
        ),
        Opportunities_MostRecentStage5: convertDateToISOString(
          new Date(values.stage.stageFiveDate || 0)
        ),
        Opportunities_Stage1Date: opportunityData
          ? appendToDelimitedString(
              opportunityData.OpportunityStageTracking.Opportunities_Stage1Date,
              convertDateToISOString(new Date(values.stage.stageOneDate || 0))
            )
          : null,
        Opportunities_Stage2Date: opportunityData
          ? appendToDelimitedString(
              opportunityData.OpportunityStageTracking.Opportunities_Stage2Date,
              convertDateToISOString(new Date(values.stage.stageTwoDate || 0))
            )
          : null,
        Opportunities_Stage3Date: opportunityData
          ? appendToDelimitedString(
              opportunityData.OpportunityStageTracking.Opportunities_Stage3Date,
              convertDateToISOString(new Date(values.stage.stageThreeDate || 0))
            )
          : null,
        Opportunities_Stage4Date: opportunityData
          ? appendToDelimitedString(
              opportunityData.OpportunityStageTracking.Opportunities_Stage4Date,
              convertDateToISOString(new Date(values.stage.stageFourDate || 0))
            )
          : null,
        Opportunities_Stage5Date: opportunityData
          ? appendToDelimitedString(
              opportunityData.OpportunityStageTracking.Opportunities_Stage5Date,
              convertDateToISOString(new Date(values.stage.stageFiveDate || 0))
            )
          : null,
      },
      SubmissionDetails: {
        UserID: user?.id || null,
        AccountID: values?.account?.id || null,
      },
    };
    let newFormData: any = cleanObject(data);

    // We only want to submit form values that were modified
    newFormData = getChangedValues(newFormData, opportunityData);

    // Add the opportunity and account IDs back in
    if (opportunityData) {
      newFormData = {
        ...newFormData,
        OpportunityDetail: {
          ...newFormData.OpportunityDetail,
          Opportunities_ID: opportunityData.OpportunityDetail.Opportunities_ID,
          Opportunities_AccountId:
            opportunityData.OpportunityDetail.Opportunities_AccountId,
        },
        OpportunityRenewalInfo: {
          ...newFormData.OpportunityRenewalInfo,
          Opportunities_ID:
            opportunityData.OpportunityRenewalInfo.Opportunities_ID,
        },
        OpportunityPartnerDetail: {
          ...newFormData.OpportunityPartnerDetail,
          Opportunities_ID:
            opportunityData.OpportunityPartnerDetail.Opportunities_ID,
        },
        OpportunityStageTracking: {
          ...newFormData.OpportunityStageTracking,
          Opportunities_ID:
            opportunityData.OpportunityStageTracking.Opportunities_ID,
        },
        SubmissionDetails: {
          ...newFormData.SubmissionDetails,
          AccountID:
            opportunityData.OpportunityDetail.Opportunities_AccountId || null,
          OpportunityID:
            opportunityData.OpportunityDetail.Opportunities_ID || null,
        },
      };
    }
    return newFormData;
  };

  const submitOpportunity = async (
    values: OpportunityFormData,
    defaultValues: OpportunityFormData,
    opportunityData?: OpportunityData,
    submitType?: SubmitType
  ) => {
    const data = await createOpportunityFormSubmissionData(
      values,
      opportunityData,
      submitType
    );
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    let id = defaultValues.id;
    const url = id ? "/api/opportunities/update" : "/api/opportunities/insert";
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const response = await fetch(request);

    if (!(await isSuccessfulResponse(response))) {
      setIsLoading(false);
      router.push("/error");
      return;
    }

    const responseData = await response.json();

    // Refresh the page cache
    React.startTransition(() => {
      router.refresh();
    });
    // Invalidate cached opportunity data
    await fetch("/api/revalidate/tag?tag=opportunity");

    return responseData;
  };

  return {
    setMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    FormatCurrency,
    FormatNumber,
    createOpportunityFormSubmissionData,
    submitOpportunity,
  };
};

const getPrimaryQuote = (opportunityData: OpportunityData) => {
  return opportunityData.OpportunityQuotes.find(
    (quote) => quote.Quotes_Primary === "1"
  );
};

const getAmount = (primaryQuote: Quote) => {
  return primaryQuote ? primaryQuote.Quotes_USDTotalPrice : "0";
};

const getBaselineRenewalAmount = (
  opportunityData: OpportunityData,
  primaryQuoteData: QuoteData
) => {
  if (
    opportunityData.OpportunityDetail.Opportunities_OpportunityType !==
    "Renewal"
  )
    return "0";
  const totalAnalyticsMaintenance = Number(
    primaryQuoteData?.QuoteProductTotals.Quotes_TotalAnalyticsMaintenance || 0
  );
  const totalAnalyticsSoftware = Number(
    primaryQuoteData?.QuoteProductTotals.Quotes_TotalAnalyticsSoftware || 0
  );
  return String(totalAnalyticsMaintenance + totalAnalyticsSoftware);
};

const getServicesRenewalAmount = (
  opportunityData: OpportunityData,
  primaryQuoteData: QuoteData
) => {
  if (opportunityData.OpportunityDetail.Opportunities_Type !== "Renewal")
    return "0";
  return primaryQuoteData?.QuoteProductTotals.Quotes_TotalCONTRNOTH || 0;
};

const getOpportunityProductData = async (opportunityProducts: Product[]) => {
  const opportunityProductsData = await Promise.all(
    opportunityProducts?.map(async (product) => {
      if (product.OpportunityLineItems_Product2ID) {
        const result = await fetch(
          `/api/products/${product.OpportunityLineItems_Product2ID}`
        );
        return await result.json();
      }
      return {};
    })
  );
  return opportunityProductsData;
};

const calculateFirstYearContractAmount = (
  oneYearAmount: string | null | undefined,
  amount: string | null | undefined
) => {
  if (!oneYearAmount || !amount) return null;
  if (Number(oneYearAmount) > 0 && Number(oneYearAmount) < Number(amount)) {
    return oneYearAmount;
  }
  return amount;
};

const calculateFirstYearExpectedAmount = (
  oneYearAmount: string | null | undefined,
  amount: string | null | undefined,
  probability: number | null | undefined
) => {
  if (!oneYearAmount || !amount || !probability) return null;
  const oneYearAmountNum = Number(oneYearAmount);
  const amountNum = Number(amount);
  const probabilityPercent = probability / 100;
  if (oneYearAmountNum > 0 && oneYearAmountNum < amountNum) {
    return String(oneYearAmountNum * probabilityPercent);
  }
  return String(amountNum * probabilityPercent);
};

const getPFValue = (
  opportunityProductsData: ProductData[],
  opportunityProducts: Product[],
  calcultePFFunction: CalculatePFFunction
) => {
  const pfValue = opportunityProductsData?.reduce((sum, currentProduct) => {
    const productID = currentProduct.ProductDetail?.Product2_ID;
    const opportunityProduct = opportunityProducts.find(
      (product) => product.OpportunityLineItems_Product2ID === productID
    );
    const value = calcultePFFunction({
      skuGroup: currentProduct.ProductCategorization?.Product2_SkuGroup,
      productFamily: currentProduct.ProductCategorization?.Product2_Family,
      productFeature: currentProduct.ProductCategorization?.Product2_Feature,
      opportunityProduct: opportunityProduct,
    });
    return sum + value;
  }, 0);
  return String(pfValue);
};

const calculatePFAnalyticsOP = ({ ...args }: CalculatePFFunctionProps) => {
  const { skuGroup, productFamily, opportunityProduct } = args;
  if (!skuGroup || !productFamily || !opportunityProduct) return 0;
  if (
    (skuGroup === "LIC-License" || skuGroup === "MNT_LIC-Maintenance") &&
    productFamily === "Analytics"
  ) {
    return Number(opportunityProduct.OpportunityLineItems_TotalPrice);
  }
  return 0;
};

const calculatePFOther = ({ ...args }: CalculatePFFunctionProps) => {
  const { productFamily, opportunityProduct } = args;
  if (!productFamily || !opportunityProduct) return 0;
  if (productFamily === "Other") {
    return Number(opportunityProduct.OpportunityLineItems_TotalPrice);
  }
  return 0;
};

const calculatePFServices = ({ ...args }: CalculatePFFunctionProps) => {
  const { productFamily, opportunityProduct } = args;
  if (!productFamily || !opportunityProduct) return 0;
  if (productFamily === "Services") {
    return Number(opportunityProduct.OpportunityLineItems_TotalPrice);
  }
  return 0;
};

const calculatePFConsulting = ({ ...args }: CalculatePFFunctionProps) => {
  const { skuGroup, opportunityProduct } = args;
  if (!skuGroup || !opportunityProduct) return 0;
  if (skuGroup === "CON-Consulting") {
    return Number(opportunityProduct.OpportunityLineItems_TotalPrice);
  }
  return 0;
};

const calculatePFTraining = ({ ...args }: CalculatePFFunctionProps) => {
  const { skuGroup, opportunityProduct } = args;
  if (!skuGroup || !opportunityProduct) return 0;
  if (skuGroup === "TRN-Training") {
    return Number(opportunityProduct.OpportunityLineItems_TotalPrice);
  }
  return 0;
};

const calculatePFEPS = ({ ...args }: CalculatePFFunctionProps) => {
  const { productFeature, opportunityProduct } = args;
  if (!productFeature || !opportunityProduct) return 0;
  if (productFeature === "EPS") {
    return Number(opportunityProduct.OpportunityLineItems_TotalPrice);
  }
  return 0;
};

const calculatePFDigitalIntelligence = ({
  ...args
}: CalculatePFFunctionProps) => {
  const { productFeature, opportunityProduct } = args;
  if (!productFeature || !opportunityProduct) return 0;
  if (productFeature === "Digital Intelligence") {
    return Number(opportunityProduct.OpportunityLineItems_TotalPrice);
  }
  return 0;
};

const calculateTotalBaseline = (
  baselineRenewalAmount: string | null | undefined,
  servicesRenewalAmount: string | null | undefined
) => {
  return String(
    Number(baselineRenewalAmount || 0) + Number(servicesRenewalAmount || 0)
  );
};

const calculateRenewalGrowthPercentage = (
  totalBaseline: string | null | undefined,
  firstYearContractAmount: string | null | undefined
) => {
  if (!totalBaseline || Number(totalBaseline) === 0 || !firstYearContractAmount)
    return null;
  return String(
    (Number(firstYearContractAmount) - Number(totalBaseline)) /
      Number(totalBaseline)
  );
};

const calculateRenewalGrowthResults = (
  opportunityType: string | null | undefined,
  renewalGrowthPercentage: string | null | undefined
) => {
  if (!opportunityType || !renewalGrowthPercentage) return null;
  if (opportunityType != "Renewal") return null;
  if (Number(renewalGrowthPercentage) < 0.08) return "Does Not Meet";
  if (Number(renewalGrowthPercentage) === 0.08) return "Meet";
  if (Number(renewalGrowthPercentage) > 0.08) return "Exceeds";
};

const calculateTerritory = (
  accountTerritory: string | null | undefined,
  opportunityTerritory: string | null | undefined
) => {
  if (!opportunityTerritory) return accountTerritory;
  return opportunityTerritory;
};

interface CalculatePFFunctionProps {
  skuGroup?: string | null | undefined;
  productFamily?: string | null | undefined;
  productFeature?: string | null | undefined;
  opportunityProduct?: Product | undefined;
}

type CalculatePFFunction = ({}: CalculatePFFunctionProps) => number;

type OpportunityAccountData = {
  ["data"]: AccountData;
};

type SubmitType = "form" | "auto";

interface useOpportunityFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
