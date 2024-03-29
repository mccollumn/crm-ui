import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ButtonNav } from "../navigation/ButtonNav";
import { InformationSection } from "../InformationSection";
import { OpportunityData } from "@/app/types/opportunities";
import { getAccountData, getOpportunityData } from "@/app/utils/getData";
import {
  formatCheckbox,
  formatCurrency,
  formatDate,
  formatPercent,
  unEscape,
} from "@/app/utils/utils";
import Link from "next/link";
import { AccountData } from "@/app/types/accounts";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const OpportunityInformation = async ({
  opportunityID,
}: OpportunityInformationProps) => {
  const opportunityData: OpportunityData = await getOpportunityData(
    opportunityID
  );

  if (!opportunityData) return null;
  const accountID = opportunityData.OpportunityDetail.Opportunities_AccountId;
  const accountData = await getAccountData(accountID);
  const opportunityInfo = await getOpportunityInfo(
    opportunityData,
    accountData
  );
  if (!opportunityInfo) return null;

  return (
    <>
      <ButtonNav
        size="small"
        path={`/opportunities/edit/${opportunityData.OpportunityDetail.Opportunities_ID}`}
      >
        Edit
      </ButtonNav>
      <ButtonNav
        size="small"
        path={`/opportunities/clone/${opportunityData.OpportunityDetail.Opportunities_ID}`}
      >
        Clone
      </ButtonNav>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-info-section-content"
          id="opportunity-info-section-header"
        >
          <Typography variant="h6">Opportunity Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-info-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.info.left}
            itemsRight={opportunityInfo.info.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-overview-section-content"
          id="opportunity-overview-section-header"
        >
          <Typography variant="h6">Solution Overview</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-overview-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.overview.left}
            itemsRight={opportunityInfo.overview.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-renewal-section-content"
          id="opportunity-renewal-section-header"
        >
          <Typography variant="h6">Renewal Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-renewal-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.renewal.left}
            itemsRight={opportunityInfo.renewal.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-additional-section-content"
          id="opportunity-additional-section-header"
        >
          <Typography variant="h6">Additional Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-additional-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.additional.fullWidth}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-win_loss-section-content"
          id="opportunity-win_loss-section-header"
        >
          <Typography variant="h6">Win/Loss/Competitive Detail</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-win_loss-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.win_loss.left}
            itemsRight={opportunityInfo.win_loss.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-partner-section-content"
          id="opportunity-partner-section-header"
        >
          <Typography variant="h6">Partner Details</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-partner-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.partner.left}
            itemsRight={opportunityInfo.partner.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-links-section-content"
          id="opportunity-links-section-header"
        >
          <Typography variant="h6">Custom Links</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-links-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.links.left}
            itemsRight={opportunityInfo.links.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-stage-section-content"
          id="opportunity-stage-section-header"
        >
          <Typography variant="h6">Stage Tracking Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-stage-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.stage.left}
            itemsRight={opportunityInfo.stage.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-system-section-content"
          id="opportunity-system-section-header"
        >
          <Typography variant="h6">System Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-system-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.system.left}
            itemsRight={opportunityInfo.system.right}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const getOpportunityInfo = async (
  opportunityData: OpportunityData,
  accountData: AccountData
) => {
  return {
    info: {
      left: [
        {
          label: "Opportunity Owner",
          value: opportunityData.OpportunityDetail.Owners_Name,
        },
        {
          label: "Opportunity Name",
          value: unEscape(opportunityData.OpportunityDetail.Opportunities_Name),
        },
        {
          label: "Account Name",
          value: (
            <Link
              href={`/accounts/view/${opportunityData.OpportunityDetail.Opportunities_AccountId}`}
            >
              {unEscape(opportunityData.OpportunityDetail.Accounts_Name)}
            </Link>
          ),
        },
        {
          label: "Opportunity Type",
          value:
            opportunityData.OpportunityDetail.Opportunities_OpportunityType,
        },
        {
          label: "Account Type",
          value: accountData.AccountDetail.AccountsType_Description,
        },
        {
          label: "Product",
          value: opportunityData.OpportunityDetail.Opportunities_Product,
        },
        {
          label: "Product Family",
          value: opportunityData.OpportunityDetail.Opportunities_ProductFamily,
        },
        {
          label: "Interest",
          value: opportunityData.OpportunityDetail.Opportunities_Interest,
        },
        {
          label: "Contains New Business",
          value: formatCheckbox(
            opportunityData.OpportunityDetail.Opportunities_ContainsNewBusiness
          ),
        },
        {
          label: "Ops Audit",
          value: formatCheckbox(
            opportunityData.OpportunityDetail.Opportunities_OpsAudit
          ),
        },
        {
          label: "Order Exception",
          value: formatCheckbox(
            opportunityData.OpportunityDetail.Opportunities_OrderException
          ),
        },
        {
          label: "Order Exception Notes",
          value: unEscape(
            opportunityData.OpportunityDetail.Opportunities_OrderExceptionNotes
          ),
        },
        {
          label: "Split Opportunity",
          value: formatCheckbox(
            opportunityData.OpportunityDetail.Opportunities_SplitOpportunity
          ),
        },
        {
          label: "Quarter Bank",
          value: formatCheckbox(
            opportunityData.OpportunityDetail.Opportunities_QuarterBank
          ),
        },
      ],
      right: [
        {
          label: "Amount",
          value: formatCurrency(
            opportunityData.OpportunityDetail.Opportunities_Amount
          ),
        },
        {
          label: "Stage",
          value: opportunityData.OpportunityDetail.Opportunities_StageName,
        },
        {
          label: "Close Date",
          value: formatDate(
            opportunityData.OpportunityDetail.Opportunities_CloseDate
          ),
        },
        {
          label: "Probability (%)",
          value: formatPercent(
            opportunityData.OpportunityDetail.Opportunities_Probability
          ),
        },
        {
          label: "Forecast Status",
          value: opportunityData.OpportunityDetail.Opportunities_ForecastStatus,
        },
        {
          label: "Term (months)",
          value: opportunityData.OpportunityDetail.Opportunities_Term,
        },
        {
          label: "Multi-Year Year 1 Amount",
          value: formatCurrency(
            opportunityData.OpportunityDetail.Opportunities_MultiYearYear1Amount
          ),
        },
        {
          label: "1st Year Contract Amount",
          value: formatCurrency(
            opportunityData.OpportunityDetail.Opportunities_FirstYrContractAmt
          ),
        },
        {
          label: "1st Year Expected Amount",
          value: formatCurrency(
            opportunityData.OpportunityDetail.Opportunities_FirstYrExpectedAmt
          ),
        },
        {
          label: "MSA",
          value: formatCheckbox(
            opportunityData.OpportunityDetail.Opportunities_MSA
          ),
        },
        {
          label: "Fast Notes/Next Steps",
          value: unEscape(
            opportunityData.OpportunityDetail.Opportunities_FastNotesNextSteps
          ),
        },
      ],
    },
    overview: {
      left: [
        {
          label: "PF Analytics On Premises",
          value: formatCurrency(
            opportunityData.OpportunitySolutionsOverview
              .Opportunities_PFLICAnalytics
          ),
        },
        {
          label: "PF Services",
          value: formatCurrency(
            opportunityData.OpportunitySolutionsOverview
              .Opportunities_PFServices
          ),
        },
        {
          label: "PF Consulting",
          value: formatCurrency(
            opportunityData.OpportunitySolutionsOverview
              .Opportunities_PFConsulting
          ),
        },
        {
          label: "PF Training",
          value: formatCurrency(
            opportunityData.OpportunitySolutionsOverview
              .Opportunities_PFTraining
          ),
        },
      ],
      right: [
        {
          label: "PF EPS",
          value: formatCurrency(
            opportunityData.OpportunitySolutionsOverview.Opportunities_PFEPS
          ),
        },
        {
          label: "PF Digital Intelligence",
          value: formatCurrency(
            opportunityData.OpportunitySolutionsOverview
              .Opportunities_PFDigitalIntelligence
          ),
        },
        {
          label: "PF Other",
          value: formatCurrency(
            opportunityData.OpportunitySolutionsOverview.Opportunities_PFOther
          ),
        },
      ],
    },
    renewal: {
      left: [
        {
          label: "Baseline Renewal Amount",
          value: formatCurrency(
            opportunityData.OpportunityRenewalInfo
              .Opportunities_BaselineRenewalAmount
          ),
        },
        {
          label: "Services Renewal Amount",
          value: formatCurrency(
            opportunityData.OpportunityRenewalInfo
              .Opportunities_ServicesRenewalAmount
          ),
        },
        {
          label: "Total Baseline",
          value: formatCurrency(
            opportunityData.OpportunityRenewalInfo.Opportunities_TotalBaseline
          ),
        },
        {
          label: "Multi-Year Add Back",
          value: formatCheckbox(
            opportunityData.OpportunityRenewalInfo
              .Opportunities_MultiYearaddback
          ),
        },
        {
          label: "Renewal Growth Percentage",
          value: opportunityData.OpportunityRenewalInfo
            .Opportunities_RenewalGrowthPercentage
            ? `${opportunityData.OpportunityRenewalInfo.Opportunities_RenewalGrowthPercentage}%`
            : "",
        },
        {
          label: "Renewal Growth Results",
          value:
            opportunityData.OpportunityRenewalInfo
              .Opportunities_RenewalGrowthResults,
        },
      ],
      right: [
        {
          label: "Baseline Renewal Date",
          value: formatDate(
            opportunityData.OpportunityRenewalInfo
              .Opportunities_BaselineRenewalDate
          ),
        },
        {
          label: "Renewal Status",
          value:
            opportunityData.OpportunityRenewalInfo.Opportunities_RenewalStatus,
        },
        {
          label: "Renewal Status Comments & Next Steps",
          value: unEscape(
            opportunityData.OpportunityRenewalInfo
              .Opportunities_RenewalStatusCommentsNextSteps
          ),
        },
        {
          label: "Resell",
          value: opportunityData.OpportunityRenewalInfo.Opportunities_Resell,
        },
      ],
    },
    additional: {
      fullWidth: [
        {
          label: "Opportunity Notes",
          value: unEscape(
            opportunityData.OpportunityAdditonalInfo
              .Opportunities_OpportunityNotes
          ),
        },
        {
          label: "Compelling Event",
          value: unEscape(
            opportunityData.OpportunityAdditonalInfo
              .Opportunities_CPCompellingEvent
          ),
        },
      ],
    },
    win_loss: {
      left: [
        {
          label: "Winner",
          value: opportunityData.OpportunityWinLossDetail.Opportunities_Winner,
        },
        {
          label: "Current/Prior Vendor",
          value:
            opportunityData.OpportunityWinLossDetail
              .Opportunities_PriorWAVendor,
        },
        {
          label: "Win Type",
          value: opportunityData.OpportunityWinLossDetail.Opportunities_WinType,
        },
        {
          label: "Business Value of Solution to Customer",
          value:
            opportunityData.OpportunityWinLossDetail
              .Opportunities_BusinessValueofSolutionToCustomer,
        },
        {
          label: "Change from Renewal Baseline Reason",
          value: unEscape(
            opportunityData.OpportunityWinLossDetail
              .Opportunities_ChangeFromRenewalBaselineReason
          ),
        },
      ],
      right: [
        {
          label: "Primary Win/Loss Reason",
          value:
            opportunityData.OpportunityWinLossDetail
              .Opportunities_PrimaryWinLossReason,
        },
        {
          label: "Primary Win/Loss Detail",
          value:
            opportunityData.OpportunityWinLossDetail
              .Opportunities_PrimaryWinLossDetail,
        },
        {
          label: "Secondary Win/Loss Reason",
          value:
            opportunityData.OpportunityWinLossDetail
              .Opportunities_SecondaryWinLossReason,
        },
        {
          label: "Secondary Win/Loss Detail",
          value:
            opportunityData.OpportunityWinLossDetail
              .Opportunities_SecondaryWinLossDetail,
        },
      ],
    },
    partner: {
      left: [
        {
          label: "Originating Partner",
          value:
            opportunityData.OpportunityPartnerDetail
              .Opportunities_OriginatingPartnerID,
        },
        {
          label: "Fulfilling Partner",
          value:
            opportunityData.OpportunityPartnerDetail
              .Opportunities_FulfillingPartnerID,
        },
        {
          label: "Referring Partner",
          value:
            opportunityData.OpportunityPartnerDetail
              .Opportunities_ReferringPartnerID,
        },
      ],
      right: [
        {
          label: "Influencing Partner",
          value:
            opportunityData.OpportunityPartnerDetail
              .Opportunities_InfluencingPartnerID,
        },
        {
          label: "Channel Deal",
          value: formatCheckbox(
            opportunityData.OpportunityPartnerDetail.Opportunities_ChannelDeal
          ),
        },
      ],
    },
    links: {
      left: [
        {
          label: "Trial Manager",
          value: (
            <Link
              href={`https://crm.example.io/trialmanager/tm.aspx?trialobject=Account&trialobjectid=${opportunityData.OpportunityDetail.Opportunities_AccountId}&objectType=Account&objectid=${opportunityData.OpportunityDetail.Opportunities_AccountId}&objectname=${opportunityData.OpportunityDetail.Accounts_Name}`}
              target="_blank"
            >
              Trial Manager
            </Link>
          ),
        },
      ],
      right: [],
    },
    stage: {
      left: [
        {
          label: "Stage 1 Date",
          value: formatDate(
            opportunityData.OpportunityStageTracking.Opportunities_Stage1Date
          ),
        },
        {
          label: "Stage 2 Date",
          value: formatDate(
            opportunityData.OpportunityStageTracking.Opportunities_Stage2Date
          ),
        },
        {
          label: "Stage 3 Date",
          value: formatDate(
            opportunityData.OpportunityStageTracking.Opportunities_Stage3Date
          ),
        },
        {
          label: "Stage 4 Date",
          value: formatDate(
            opportunityData.OpportunityStageTracking.Opportunities_Stage4Date
          ),
        },
        {
          label: "Stage 5 Date",
          value: formatDate(
            opportunityData.OpportunityStageTracking.Opportunities_Stage5Date
          ),
        },
      ],
      right: [
        {
          label: "Most Recent Stage 1",
          value: formatDate(
            opportunityData.OpportunityStageTracking
              .Opportunities_MostRecentStage1
          ),
        },
        {
          label: "Most Recent Stage 2",
          value: formatDate(
            opportunityData.OpportunityStageTracking
              .Opportunities_MostRecentStage2
          ),
        },
        {
          label: "Most Recent Stage 3",
          value: formatDate(
            opportunityData.OpportunityStageTracking
              .Opportunities_MostRecentStage3
          ),
        },
        {
          label: "Most Recent Stage 4",
          value: formatDate(
            opportunityData.OpportunityStageTracking
              .Opportunities_MostRecentStage4
          ),
        },
        {
          label: "Most Recent Stage 5",
          value: formatDate(
            opportunityData.OpportunityStageTracking
              .Opportunities_MostRecentStage5
          ),
        },
      ],
    },
    system: {
      left: [
        {
          label: "Type",
          value: opportunityData.OpportunityDetail.Opportunities_Type,
        },
      ],
      right: [
        {
          label: "Opportunity Territory",
          value: opportunityData.OpportunityDetail.Opportunities_Territory,
        },
      ],
    },
  };
};

interface OpportunityInformationProps {
  opportunityID: string;
}

export default OpportunityInformation;
