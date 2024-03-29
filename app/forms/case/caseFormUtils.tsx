import { ContactData } from "@/app/types/contacts";
import { CaseData, CaseFormData } from "../../types/cases";
import { getDefaultOwner } from "@/app/utils/forms";

/**
 * Generates and object containing the default values for a new/empty case form.
 * @returns Initial case form data.
 */
const generateInitialCaseFormData = async (
  contactData?: ContactData | null
) => {
  const defaultOwner = await getDefaultOwner();

  const initialCaseFormData: CaseFormData = {
    caseID: null,
    caseNumber: null,
    subject: null,
    account: {
      id: contactData?.ContactDetail.Contacts_AccountId || null,
      name: contactData?.ContactDetail.Accounts_Name || null,
      site: null,
      description: null,
    },
    contact: {
      id: contactData?.ContactDetail.Contacts_ID || null,
      name: contactData
        ? `${contactData?.ContactDetail.Contacts_FirstName} ${contactData?.ContactDetail.Contacts_LastName}`
        : null,
      email: contactData?.ContactDetail.Contacts_Email || null,
      fax: contactData?.ContactDetail.Contacts_Fax || null,
      phone: contactData?.ContactDetail.Contacts_Phone || null,
      mobile: contactData?.ContactDetail.Contacts_MobilePhone || null,
    },
    origin: null,
    status: "Open",
    subStatus: null,
    hibernateEndDate: null,
    owner: defaultOwner,
    subOwner: { id: null, name: null },
    product: {
      deliveryMethod: "On Premises",
      name: null,
      version: null,
      subVersion: null,
    },
    bugNumber: null,
    bugDescription: null,
    type: null,
    reason: null,
    category: null,
    priority: null,
    severity: null,
    isTamCase: false,
    description: null,
  };

  return initialCaseFormData;
};

/**
 * Returns a case data object to be passed to the support case form.
 * @param caseData Data from an existing case. (optional)
 * @returns Case data object.
 */
export const createCaseFormData = async ({
  caseData,
  contactData,
}: CreateCaseFormDataProps) => {
  const initialCaseFormData = await generateInitialCaseFormData(contactData);

  if (!caseData) {
    return initialCaseFormData;
  }

  return {
    ...initialCaseFormData,
    caseID: caseData.CaseInformation.Cases_ID,
    caseNumber: caseData.CaseInformation.Cases_CaseNumber,
    subject: caseData.CaseInformation.Cases_Subject,
    account: {
      id: caseData.CaseInformation.Cases_AccountID,
      name: caseData.CaseInformation.Accounts_Name,
    },
    contact: {
      id: caseData.CaseInformation.Cases_ContactId,
      name: caseData.CaseInformation.Contacts_FullName,
      email: caseData.CaseInformation.Cases_ContactEmail,
      fax: caseData.CaseInformation.Cases_ContactFax,
      phone: caseData.CaseInformation.Cases_ContactPhone,
      mobile: caseData.CaseInformation.Cases_ContactMobile,
    },
    origin: caseData.CaseInformation.Cases_Origin,
    status: caseData.CaseInformation.Cases_Status,
    subStatus: caseData.CaseInformation.Cases_SubStatus,
    hibernateEndDate: caseData.CaseInformation.Cases_HibernateEndDate,
    owner: {
      id: caseData.CaseInformation.Cases_OwnerId,
      name: caseData.CaseInformation.Owner_Name,
    },
    subOwner: {
      name: caseData.CaseInformation.Cases_SubOwner,
    },
    product: {
      deliveryMethod: caseData.CaseProfile.Cases_ProductDeliveryMethod,
      name: caseData.CaseProfile.Cases_ProductName,
      version: caseData.CaseProfile.Cases_ProductVersion,
      subVersion: caseData.CaseProfile.Cases_ProductSubVersion,
    },
    bugNumber: caseData.CaseProfile.Cases_BugNumber,
    bugDescription: caseData.CaseProfile.Cases_BugDescription,
    type:
      caseData.CaseProfile.Cases_CaseType || caseData.CaseProfile.Cases_Type,
    reason: caseData.CaseProfile.Cases_Reason,
    category: caseData.CaseProfile.Cases_Category,
    priority: caseData.CaseProfile.Cases_Priority,
    severity: caseData.CaseProfile.Cases_Severity,
    isTamCase: !!Number(caseData.CaseProfile.Cases_IsTAMCase),
    description: caseData.CaseProfile.Cases_Description,
  };
};

interface CreateCaseFormDataProps {
  caseData?: CaseData;
  contactData?: ContactData | null;
}
