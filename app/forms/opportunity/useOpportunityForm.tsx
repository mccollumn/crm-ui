import React from "react";
import { MenuItem } from "@/app/types/types";
import {
  convertArrayToString,
  convertBooleanToString,
  convertDateToISOString,
  convertNumberToString,
  getChangedValues,
  isObjectEmpty,
  removeNullsFromObject,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import {
  OpportunityData,
  OpportunityFormData,
  Product,
} from "@/app/types/opportunities";
import { QuoteProduct } from "@/app/types/quotes";
import { getProductData, getProducts } from "@/app/utils/getData";
import { ProductData } from "@/app/types/products";

export const useOpportunityForm = ({ menuItems }: useOpportunityFormProps) => {
  const initialMenuOptions = {
    Owner: [],
    Account: [],
    OpportunityType: [],
    Product: [],
    ProductFamily: [],
    Stage: [],
    Status: [],
    Term: [],
    Interest: [],
    RenewalStatus: [],
    Resell: [],
    // OriginatingPartner: [],
    // FulfillingPartner: [],
    // ReferringPartner: [],
    // InfluencingPartner: [],
    Type: [],
    TerritoryOverride: [],
  };

  const {
    setMenuOptions,
    setCustomMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
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
        const results = await fetch("/api/accounts/active");
        const accounts = await results.json();
        if (isObjectEmpty(accounts)) return;
        const options = accounts.data.map((account: any) => {
          return {
            id: account.Accounts_AccountID,
            name: account.Accounts_Name,
            site: account.Accounts_Site,
          };
        });
        setCustomMenuOptions("Account", options);
        // setCustomMenuOptions("OriginatingPartner", options);
        // setCustomMenuOptions("FulfillingPartner", options);
        // setCustomMenuOptions("ReferringPartner", options);
        // setCustomMenuOptions("InfluencingPartner", options);
      } catch {
        console.error("Could not retrieve list of accounts");
      }
    };
    setAccounts();

    // Contact Owner
    const setOwners = async () => {
      try {
        const results = await fetch("/api/users/internal");
        const owners = await results.json();
        if (isObjectEmpty(owners)) return;
        const options = owners.data.map((owner: any) => {
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
    setMenuOptions("Term");
    setMenuOptions("Interest");
    setMenuOptions("RenewalStatus");
    setMenuOptions("Resell");
    setMenuOptions("Type");
    setMenuOptions("TerritoryOverride");
  }, [setCustomMenuOptions, setMenuOptions]);

  const createOpportunitytFormSubmissionData = async (
    values: OpportunityFormData,
    opportunityData?: OpportunityData
  ) => {
    const firstYearContractAmount = calculateFirstYearContractAmount(
      values.oneYearAmount,
      values.amount
    );
    const firstYearExpectedAmount = calculateFirstYearExpectedAmount(
      values.oneYearAmount,
      values.amount,
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

    const data = {
      OpportunityDetail: {
        Opportunities_ID: values.id,
        Opportunities_AccountId: values.account.id,
        Accounts_Name: values.account.name,
        Opportunities_Amount: values.amount,
        Opportunities_CloseDate: convertDateToISOString(values.closeDate),
        Opportunities_ContainsNewBusiness: convertBooleanToString(
          values.newBusiness
        ),
        // Opportunities_ExpectedRevenue: "6437.84",
        Opportunities_FastNotesNextSteps: values.fastNotes,
        Opportunities_FirstYrContractAmt: firstYearContractAmount,
        Opportunities_FirstYrExpectedAmt: firstYearExpectedAmount,
        Opportunities_ForecastStatus: values.forecastStatus,
        Opportunities_Interest: convertArrayToString(values.interest),
        Opportunities_MultiYearYear1Amount: values.oneYearAmount,
        Opportunities_Name: values.name,
        // Opportunities_OpsAudit: "0",
        // Opportunities_OrderException: "0",
        // Opportunities_OrderExceptionNotes: null,
        Opportunities_OwnerID: values.owner.id,
        Owners_Name: values.owner.name,
        Opportunities_Probability: convertNumberToString(values.probability),
        Opportunities_Product: values.product.name,
        Opportunities_ProductFamily: values.product.family,
        // Opportunities_QuarterBank: "0",
        // Opportunities_SplitOpportunity: "0",
        Opportunities_StageName: values.stage.name,
        Opportunities_Term: values.term,
        Opportunities_Type: values.opportunityType,
      },
      OpportunitySolutionsOverview: {
        //   Opportunities_ID: values.id,
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
        Opportunities_BaselineRenewalAmount: values.renewal.baselineAmount,
        Opportunities_BaselineRenewalDate: convertDateToISOString(
          values.renewal.baselineRenewalDate
        ),
        Opportunities_RenewalStatus: values.renewal.status,
        Opportunities_RenewalStatusCommentsNextSteps: values.renewal.comments,
        Opportunities_ServicesRenewalAmount: values.renewal.servicesAmount,
        Opportunities_TotalBaseline: totalBaseline,
        Opportunities_MultiYearaddback: convertBooleanToString(
          values.renewal.multiYearAddBack
        ),
        Opportunities_RenewalGrowthPercentage: renewalGrowthPercentage,
        Opportunities_RenewalGrowthResults: renewalGrowthResults,
        Opportunities_Resell: values.renewal.resell,
      },
      // OpportunityAdditonalInfo: {
      //   Opportunities_ID: values.id,
      //   Opportunities_OpportunityNotes: null,
      //   Opportunities_CPCompellingEvent: null,
      // },
      // OpportunityWinLossDetail: {
      //   Opportunities_ID: values.id,
      //   Opportunities_BusinessValueofSolutionToCustomer: null,
      //   Opportunities_ChangeFromRenewalBaselineReason: null,
      //   Opportunities_PriorWAVendor: null,
      //   Opportunities_PrimaryWinLossDetail: null,
      //   Opportunities_PrimaryWinLossReason: null,
      //   Opportunities_SecondaryWinLossDetail: null,
      //   Opportunities_SecondaryWinLossReason: null,
      //   Opportunities_Winner: null,
      //   Opportunities_WinType: "N/A",
      // },
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
        // Opportunities_MostRecentStage1: "2022-10-05 00:00:00.0000000",
        // Opportunities_MostRecentStage2: null,
        // Opportunities_MostRecentStage3: null,
        // Opportunities_MostRecentStage4: "2023-07-27 00:00:00.0000000",
        // Opportunities_MostRecentStage5: null,
        Opportunities_Stage1Date: convertDateToISOString(
          values.stage.stageOneDate
        ),
        Opportunities_Stage2Date: convertDateToISOString(
          values.stage.stageTwoDate
        ),
        Opportunities_Stage3Date: convertDateToISOString(
          values.stage.stageThreeDate
        ),
        Opportunities_Stage4Date: convertDateToISOString(
          values.stage.stageFourDate
        ),
        Opportunities_Stage5Date: convertDateToISOString(
          values.stage.stageFiveDate
        ),
      },
    };
    let newFormData: any = removeNullsFromObject(data);

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
      };
    }
    return newFormData;
  };

  return {
    setMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    FormatCurrency,
    FormatNumber,
    createOpportunitytFormSubmissionData,
  };
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
  if (oneYearAmountNum > 0 && oneYearAmountNum < amountNum) {
    return String(oneYearAmountNum * probability);
  }
  return String(amountNum * probability);
};

const getPFValue = (
  opportunityProductsData: ProductData[],
  opportunityProducts: Product[],
  calcultePFFunction: CalculatePFFunction
) => {
  const pfValue = opportunityProductsData?.reduce((sum, currentProduct) => {
    const productID = currentProduct.ProductDetail.Product2_ID;
    const opportunityProduct = opportunityProducts.find(
      (product) => product.OpportunityLineItems_Product2ID === productID
    );
    const value = calcultePFFunction({
      skuGroup: currentProduct.ProductCategorization.Product2_SkuGroup,
      productFamily: currentProduct.ProductCategorization.Product2_Family,
      productFeature: currentProduct.ProductCategorization.Product2_Feature,
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
  if (!baselineRenewalAmount || !servicesRenewalAmount) return "0";
  return String(Number(baselineRenewalAmount) + Number(servicesRenewalAmount));
};

const calculateRenewalGrowthPercentage = (
  totalBaseline: string | null | undefined,
  firstYearContractAmount: string | null | undefined
) => {
  if (!totalBaseline || !firstYearContractAmount) return null;
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

interface CalculatePFFunctionProps {
  skuGroup?: string | null | undefined;
  productFamily?: string | null | undefined;
  productFeature?: string | null | undefined;
  opportunityProduct?: Product | undefined;
}

type CalculatePFFunction = ({}: CalculatePFFunctionProps) => number;

interface useOpportunityFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
