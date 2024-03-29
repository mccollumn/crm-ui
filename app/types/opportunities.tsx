export interface OpportunityData {
  OpportunityDetail: OpportunityDetail;
  OpportunitySolutionsOverview: OpportunitySolutionsOverview;
  OpportunityRenewalInfo: OpportunityRenewalInfo;
  OpportunityAdditonalInfo: OpportunityAdditonalInfo;
  OpportunityWinLossDetail: OpportunityWinLossDetail;
  OpportunityPartnerDetail: OpportunityPartnerDetail;
  OpportunityStageTracking: OpportunityStageTracking;
  OpportunityQuotes: Quote[];
  OpportunityQuoteContactRoles: ContactRole[];
  OpportunityAmounts: Amount[];
  OpportunitySalesOrders: SalesOrder[];
  OpportunitySalesInvoices: SalesInvoice[];
  OpportunityProducts: Product[];
}

interface OpportunityDetail {
  Opportunities_ID: string;
  Opportunities_AccountId: string;
  Accounts_Name: string | null;
  Opportunities_Amount: string | null;
  Opportunities_CloseDate: string | null;
  Opportunities_CommissionCategory: string | null;
  Opportunities_ContainsNewBusiness: "0" | "1";
  Opportunities_ExpectedRevenue: string | null;
  Opportunities_FastNotesNextSteps: string | null;
  Opportunities_FirstYrContractAmt: string | null;
  Opportunities_FirstYrExpectedAmt: string | null;
  Opportunities_ForecastStatus: string | null;
  Opportunities_Interest: string | null;
  Opportunities_MSA: "0" | "1";
  Opportunities_MultiYearYear1Amount: string | null;
  Opportunities_Name: string | null;
  Opportunities_OpportunityType: string | null;
  Opportunities_OpsAudit: "0" | "1";
  Opportunities_OrderException: "0" | "1";
  Opportunities_OrderExceptionNotes: string | null;
  Opportunities_OwnerID: string | null;
  Owners_Name: string | null;
  Opportunities_Probability: string | null;
  Opportunities_Product: string | null;
  Opportunities_ProductFamily: string | null;
  Opportunities_QuarterBank: "0" | "1";
  Opportunities_SplitOpportunity: "0" | "1";
  Opportunities_StageName: string | null;
  Opportunities_Term: string | null;
  Opportunities_Territory: string | null;
  Opportunities_Type: string | null;
}

interface OpportunitySolutionsOverview {
  Opportunities_ID: string;
  Opportunities_PFConsulting: string | null;
  Opportunities_PFDigitalIntelligence: string | null;
  Opportunities_PFEPS: string | null;
  Opportunities_PFLICAnalytics: string | null;
  Opportunities_PFOther: string | null;
  Opportunities_PFServices: string | null;
  Opportunities_PFTraining: string | null;
}

interface OpportunityRenewalInfo {
  Opportunities_ID: string;
  Opportunities_BaselineRenewalAmount: string | null;
  Opportunities_BaselineRenewalDate: string | null;
  Opportunities_RenewalStatus: string | null;
  Opportunities_RenewalStatusCommentsNextSteps: string | null;
  Opportunities_ServicesRenewalAmount: string | null;
  Opportunities_TotalBaseline: string | null;
  Opportunities_MultiYearaddback: "0" | "1";
  Opportunities_RenewalGrowthPercentage: string | null;
  Opportunities_RenewalGrowthResults: string | null;
  Opportunities_Resell: string | null;
}

interface OpportunityAdditonalInfo {
  Opportunities_ID: string;
  Opportunities_OpportunityNotes: string | null;
  Opportunities_CPCompellingEvent: string | null;
}

interface OpportunityWinLossDetail {
  Opportunities_ID: string;
  Opportunities_BusinessValueofSolutionToCustomer: string | null;
  Opportunities_ChangeFromRenewalBaselineReason: string | null;
  Opportunities_PriorWAVendor: string | null;
  Opportunities_PrimaryWinLossDetail: string | null;
  Opportunities_PrimaryWinLossReason: string | null;
  Opportunities_SecondaryWinLossDetail: string | null;
  Opportunities_SecondaryWinLossReason: string | null;
  Opportunities_Winner: string | null;
  Opportunities_WinType: string | null;
}

interface OpportunityPartnerDetail {
  Opportunities_ID: string;
  Opportunities_ChannelDeal: "0" | "1";
  Opportunities_FulfillingPartnerID: string | null;
  Opportunities_InfluencingPartnerID: string | null;
  Opportunities_OriginatingPartnerID: string | null;
  Opportunities_ReferringPartnerID: string | null;
}

interface OpportunityStageTracking {
  Opportunities_ID: string;
  Opportunities_MostRecentStage1: string | null;
  Opportunities_MostRecentStage2: string | null;
  Opportunities_MostRecentStage3: string | null;
  Opportunities_MostRecentStage4: string | null;
  Opportunities_MostRecentStage5: string | null;
  Opportunities_Stage1Date: string | null;
  Opportunities_Stage2Date: string | null;
  Opportunities_Stage3Date: string | null;
  Opportunities_Stage4Date: string | null;
  Opportunities_Stage5Date: string | null;
}

export interface Quote {
  Quotes_ID: string;
  Quotes_Name: string | null;
  Quotes_Status: string | null;
  Quotes_CurrencyCode: string | null;
  Quotes_TotalPrice: string | null;
  Quotes_USDTotalPrice: string | null;
  Quotes_ValidThrough: string | null;
  Quotes_USDTotalOneYearAmount: string | null;
  Quotes_Primary: "0" | "1";
}

export interface ContactRole {
  OpportunityContactRoles_ID?: string;
  OpportunityContactRoles_ContactId: string | null;
  Contacts_Name: string | null;
  Contacts_Email: string | null;
  Contacts_Phone: string | null;
  OpportunityContactRoles_IsPrimary: "0" | "1";
  OpportunityContactRoles_Role: string | null;
}

interface Amount {
  OpportunityAmounts_ID?: string;
  OpportunityAmounts_Amount: string | null;
  OpportunityAmounts_OneYearAmount: string | null;
  OpportunityAmounts_Product2ID: string | null;
  Product2_Name: string | null;
  OpportunityAmounts_ProductFeatureValue: string | null;
  OpportunityAmounts_ProductProductFamilyValue: string | null;
  OpportunityAmounts_ProductSKUGroupValue: string | null;
  OpportunityAmounts_Name: string | null;
}

interface SalesOrder {
  SalesOrders_ID: string;
  SalesOrders_AccountID: string | null;
  Account_Name: string | null;
  SalesOrders_CurrencyIsoCode: string | null;
  SalesOrders_Date: string | null;
  SalesOrders_EndCustomerAccountID: string | null;
  End_Customer_Account_Name: string | null;
  SalesOrders_Total: string | null;
}

interface SalesInvoice {
  SalesInvoices_ID: string;
  SalesInvoices_AccountID: string | null;
  Account_Name: string | null;
  SalesInvoices_CurrencyIsoCode: string | null;
  SalesInvoices_Name: string | null;
  SalesInvoices_EndCustomerAccountID: string | null;
  End_Customer_Account_Name: string | null;
  SalesInvoices_Date: string | null;
  SalesInvoices_DocumentType: string | null;
  SalesInvoices_Total: string | null;
}

export interface Product {
  OpportunityLineItems_ID?: string;
  OpportunityLineItems_Product2ID: string | null;
  Product_Name: string | null;
  OpportunityLineItems_ProductCode: string | null;
  OpportunityLineItems_Quantity: string | null;
  OpportunityLineItems_Discount: string | null;
  OpportunityLineItems_TotalPrice: string | null;
  OpportunityLineItems_UnitPrice: string | null;
}

export type OpportunityFormData = {
  id?: string | null;
  name?: string | null;
  owner: {
    id?: string | null;
    name?: string | null;
  };
  account: {
    id?: string | null;
    name?: string | null;
  };
  opportunityType?: string | null;
  product: {
    name?: string | null;
    family?: string | null;
  };
  interest?: string[] | null;
  newBusiness?: boolean | null;
  fastNotes?: string | null;
  amount?: string | null;
  closeDate?: Date | string | null;
  probability?: number | null;
  forecastStatus?: string | null;
  term?: string | null;
  oneYearAmount?: string | null;
  firstYearContractAmount?: string | null;
  firstYearExpectedAmount?: string | null;
  territory?: string | null;
  type?: string | null;
  renewal: {
    baselineAmount?: string | null;
    servicesAmount?: string | null;
    multiYearAddBack?: boolean | null;
    baselineRenewalDate?: Date | string | null;
    status?: string | null;
    comments?: string | null;
    resell?: string | null;
  };
  partner: {
    originatingPartner?: string | null;
    fulfillingPartner?: string | null;
    referringPartner?: string | null;
    influencingPartner?: string | null;
    channelDeal?: boolean | null;
  };
  stage: {
    name?: string | null;
    stageOneDate?: Date | string | null;
    stageTwoDate?: Date | string | null;
    stageThreeDate?: Date | string | null;
    stageFourDate?: Date | string | null;
    stageFiveDate?: Date | string | null;
  };
};

export type ContactRoleFormData = {
  id: string;
  contact: {
    id: string;
    name?: string | null;
    isPrimary?: boolean | null;
  };
  role: {
    name?: string | null;
  };
};

export type ProductFormData = {
  id: string;
  product: {
    id: string;
    name?: string | null;
    code?: string | null;
    unitPrice?: string | null;
  };
  quantity?: string | null;
  discount?: string | null;
  totalPrice?: string | null;
};
