import React from "react";
import { MenuItem } from "@/app/types/types";
import {
  convertBooleanToString,
  convertDateToISOString,
  getChangedValues,
  isObjectEmpty,
  removeNullsFromObject,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import {
  OpportunityData,
  OpportunityformData,
} from "@/app/types/opportunities";

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

  const createOpportunitytFormSubmissionData = (
    values: OpportunityformData,
    opportunityData?: OpportunityData
  ) => {
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
        Opportunities_FirstYrContractAmt: values.oneYearAmount,
        // Opportunities_FirstYrExpectedAmt: "6437.84",
        Opportunities_ForecastStatus: values.forecastStatus,
        Opportunities_Interest: values.interest,
        // Opportunities_MultiYearYear1Amount: "8583.79",
        Opportunities_Name: values.name,
        // Opportunities_OpsAudit: "0",
        // Opportunities_OrderException: "0",
        // Opportunities_OrderExceptionNotes: null,
        Opportunities_OwnerID: values.owner.id,
        Owners_Name: values.owner.name,
        Opportunities_Probability: values.probability,
        Opportunities_Product: values.product.name,
        Opportunities_ProductFamily: values.product.family,
        // Opportunities_QuarterBank: "0",
        // Opportunities_SplitOpportunity: "0",
        Opportunities_StageName: values.stage.name,
        Opportunities_Term: values.term,
        Opportunities_Type: values.opportunityType,
      },
      // OpportunitySolutionsOverview: {
      //   Opportunities_ID: values.id,
      //   Opportunities_PFConsulting: ".00",
      //   Opportunities_PFDigitalIntelligence: ".00",
      //   Opportunities_PFEPS: ".00",
      //   Opportunities_PFLICAnalytics: "8583.79",
      //   Opportunities_PFOther: ".00",
      //   Opportunities_PFServices: ".00",
      //   Opportunities_PFTraining: ".00",
      // },
      OpportunityRenewalInfo: {
        Opportunities_ID: values.id,
        Opportunities_BaselineRenewalAmount: values.renewal.baselineAmount,
        Opportunities_BaselineRenewalDate: convertDateToISOString(
          values.renewal.baselineRenewalDate
        ),
        Opportunities_RenewalStatus: values.renewal.status,
        Opportunities_RenewalStatusCommentsNextSteps: values.renewal.comments,
        Opportunities_ServicesRenewalAmount: values.renewal.servicesAmount,
        // TODO: How is this different than Opportunities_BaselineRenewalAmount?
        Opportunities_TotalBaseline: values.renewal.baselineAmount,
        Opportunities_MultiYearaddback: convertBooleanToString(
          values.renewal.multiYearAddBack
        ),
        // Opportunities_RenewalGrowthPercentage: "5.00",
        // Opportunities_RenewalGrowthResults: "Does Not Meet",
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

interface useOpportunityFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
