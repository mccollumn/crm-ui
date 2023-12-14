import { convertStringToArray, formatDate, unEscape } from "@/app/utils/utils";
import {
  OpportunityData,
  OpportunityFormData,
} from "@/app/types/opportunities";
import { getDefaultOwner } from "@/app/utils/forms";
import { AccountData } from "@/app/types/accounts";

/**
 * Generates an object containing the default values for a new/empty opportunity form.
 * @returns Initial opportunity form data.
 */
const generateInitialOpportunityFormData = async (
  accountData?: AccountData | null
) => {
  const defaultOwner = await getDefaultOwner();

  const initialOpportunityFormData: OpportunityFormData = {
    id: null,
    name: null,
    owner: defaultOwner,
    account: {
      id: accountData?.AccountDetail.Accounts_AccountID || null,
      name: accountData?.AccountDetail.Accounts_Name || null,
    },
    opportunityType: null,
    product: {
      name: null,
      family: null,
    },
    interest: null,
    newBusiness: false,
    fastNotes: null,
    amount: null,
    closeDate: null,
    probability: null,
    forecastStatus: null,
    term: null,
    oneYearAmount: null,
    territory: null,
    type: null,
    renewal: {
      baselineAmount: null,
      servicesAmount: null,
      multiYearAddBack: false,
      baselineRenewalDate: null,
      status: null,
      comments: null,
      resell: null,
    },
    partner: {
      originatingPartner: null,
      fulfillingPartner: null,
      referringPartner: null,
      influencingPartner: null,
      channelDeal: false,
    },
    stage: {
      name: null,
      stageOneDate: null,
      stageTwoDate: null,
      stageThreeDate: null,
      stageFourDate: null,
      stageFiveDate: null,
    },
  };

  return initialOpportunityFormData;
};

/**
 * Returns an opportunity data object to be passed to the opportunity form.
 * @param opportunityData Data from an existing opportunity. (optional)
 * @returns Opportunity data object.
 */
export const createOpportunityFormData = async ({
  opportunityData,
  accountData,
}: CreateOpportunityFormDataProps) => {
  const initialOpportunityFormData = await generateInitialOpportunityFormData(
    accountData
  );

  if (!opportunityData) {
    return initialOpportunityFormData;
  }

  return {
    ...initialOpportunityFormData,
    id: opportunityData.OpportunityDetail.Opportunities_ID,
    name: unEscape(opportunityData.OpportunityDetail.Opportunities_Name || ""),
    owner: {
      id: opportunityData.OpportunityDetail.Opportunities_OwnerID,
      name: opportunityData.OpportunityDetail.Owners_Name,
    },
    account: {
      id: opportunityData.OpportunityDetail.Opportunities_AccountId,
      name: opportunityData.OpportunityDetail.Accounts_Name,
    },
    opportunityType:
      opportunityData.OpportunityDetail.Opportunities_OpportunityType,
    product: {
      name: opportunityData.OpportunityDetail.Opportunities_Product,
      family: opportunityData.OpportunityDetail.Opportunities_ProductFamily,
    },
    interest: convertStringToArray(
      opportunityData.OpportunityDetail.Opportunities_Interest
    ),
    newBusiness: !!Number(
      opportunityData.OpportunityDetail.Opportunities_ContainsNewBusiness
    ),
    fastNotes:
      opportunityData.OpportunityDetail.Opportunities_FastNotesNextSteps,
    amount: opportunityData.OpportunityDetail.Opportunities_Amount,
    closeDate: opportunityData.OpportunityDetail.Opportunities_CloseDate
      ? formatDate(opportunityData.OpportunityDetail.Opportunities_CloseDate)
      : null,
    probability: Number(
      opportunityData.OpportunityDetail.Opportunities_Probability
    ),
    forecastStatus:
      opportunityData.OpportunityDetail.Opportunities_ForecastStatus,
    term: opportunityData.OpportunityDetail.Opportunities_Term,
    oneYearAmount:
      opportunityData.OpportunityDetail.Opportunities_MultiYearYear1Amount,
    type: opportunityData.OpportunityDetail.Opportunities_Type,
    territory: opportunityData.OpportunityDetail.Opportunities_Territory,
    renewal: {
      baselineAmount:
        opportunityData.OpportunityRenewalInfo
          .Opportunities_BaselineRenewalAmount,
      servicesAmount:
        opportunityData.OpportunityRenewalInfo
          .Opportunities_ServicesRenewalAmount,
      multiYearAddBack: !!Number(
        opportunityData.OpportunityRenewalInfo.Opportunities_MultiYearaddback
      ),
      baselineRenewalDate: opportunityData.OpportunityRenewalInfo
        .Opportunities_BaselineRenewalDate
        ? formatDate(
            opportunityData.OpportunityRenewalInfo
              .Opportunities_BaselineRenewalDate
          )
        : null,
      status:
        opportunityData.OpportunityRenewalInfo.Opportunities_RenewalStatus,
      comments:
        opportunityData.OpportunityRenewalInfo
          .Opportunities_RenewalStatusCommentsNextSteps,
      resell: opportunityData.OpportunityRenewalInfo.Opportunities_Resell,
    },
    partner: {
      originatingPartner:
        opportunityData.OpportunityPartnerDetail
          .Opportunities_OriginatingPartnerID,
      fulfillingPartner:
        opportunityData.OpportunityPartnerDetail
          .Opportunities_FulfillingPartnerID,
      referringPartner:
        opportunityData.OpportunityPartnerDetail
          .Opportunities_ReferringPartnerID,
      influencingPartner:
        opportunityData.OpportunityPartnerDetail
          .Opportunities_InfluencingPartnerID,
      channelDeal: !!Number(
        opportunityData.OpportunityPartnerDetail.Opportunities_ChannelDeal
      ),
    },
    stage: {
      name: opportunityData.OpportunityDetail.Opportunities_StageName,
      stageOneDate: opportunityData.OpportunityStageTracking
        .Opportunities_Stage1Date
        ? formatDate(
            opportunityData.OpportunityStageTracking
              .Opportunities_MostRecentStage1
          )
        : null,
      stageTwoDate: opportunityData.OpportunityStageTracking
        .Opportunities_Stage2Date
        ? formatDate(
            opportunityData.OpportunityStageTracking
              .Opportunities_MostRecentStage2
          )
        : null,
      stageThreeDate: opportunityData.OpportunityStageTracking
        .Opportunities_Stage3Date
        ? formatDate(
            opportunityData.OpportunityStageTracking
              .Opportunities_MostRecentStage3
          )
        : null,
      stageFourDate: opportunityData.OpportunityStageTracking
        .Opportunities_Stage4Date
        ? formatDate(
            opportunityData.OpportunityStageTracking
              .Opportunities_MostRecentStage4
          )
        : null,
      stageFiveDate: opportunityData.OpportunityStageTracking
        .Opportunities_Stage5Date
        ? formatDate(
            opportunityData.OpportunityStageTracking
              .Opportunities_MostRecentStage5
          )
        : null,
    },
  };
};

interface CreateOpportunityFormDataProps {
  opportunityData?: OpportunityData;
  accountData?: AccountData | null;
}
