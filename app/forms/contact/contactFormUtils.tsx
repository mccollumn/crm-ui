import { AccountData } from "@/app/types/accounts";
import { ContactData, ContactFormData } from "@/app/types/contacts";
import { getDefaultOwner } from "@/app/utils/forms";
import { convertStringToArray } from "@/app/utils/utils";

/**
 * Generates and object containing the default values for a new/empty contact form.
 * @returns Initial contact form data.
 */
const generateInitialContactFormData = async (
  accountData: AccountData | null | undefined
) => {
  const defaultOwner = await getDefaultOwner();

  const initialContactFormData: ContactFormData = {
    contactID: null,
    owner: defaultOwner,
    firstName: null,
    lastName: null,
    account: {
      id: accountData?.AccountDetail.Accounts_AccountID || null,
      name: accountData?.AccountDetail.Accounts_Name || null,
    },
    title: null,
    jobRole: null,
    contactRole: null,
    email: null,
    unconfirmedEmail: false,
    relationship: null,
    contactStatus: null,
    phone: null,
    mobile: null,
    otherPhone: null,
    namedSupportContact: false,
    supportContactAdmin: false,
    doNotSendSupportSurvey: false,
    communication: {
      doNotRemarket: false,
      doNotCall: false,
      emailOptOut: false,
      postalMailOptOut: false,
    },
    address: {
      mailing: {
        street:
          accountData?.AddressInformation.AccountsAddress_ShippingStreet ||
          null,
        city:
          accountData?.AddressInformation.AccountsAddress_ShippingCity || null,
        state:
          accountData?.AddressInformation.AccountsAddress_ShippingState || null,
        postalCode:
          accountData?.AddressInformation.AccountsAddress_ShippingPostalCode ||
          null,
        country:
          accountData?.AddressInformation.AccountsAddress_ShippingCountry ||
          null,
      },
      other: {
        street: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
      },
    },
    demographic: {
      timeZone: null,
      preferredLanguage: null,
    },
  };

  return initialContactFormData;
};

/**
 * Returns a contact data object to be passed to the contact form.
 * @param contactData Data from an existing contact. (optional)
 * @returns Contact data object.
 */
export const createContactFormData = async ({
  contactData,
  accountData,
}: CreateContactFormDataProps) => {
  const initialContactFormData = await generateInitialContactFormData(
    accountData
  );

  if (!contactData) {
    return initialContactFormData;
  }

  return {
    ...initialContactFormData,
    contactID: contactData.ContactDetail.Contacts_ID,
    owner: {
      id: contactData.ContactSystemInformation.Contacts_CreatedById,
      name: contactData.ContactSystemInformation.Users_Name,
    },
    firstName: contactData.ContactDetail.Contacts_FirstName,
    lastName: contactData.ContactDetail.Contacts_LastName,
    account: {
      id: contactData.ContactDetail.Contacts_AccountId,
      name: contactData.ContactDetail.Accounts_Name,
    },
    title: contactData.ContactDetail.Contacts_Title,
    jobRole: contactData.ContactDetail.Contacts_JobRole,
    contactRole: contactData.ContactDetail.Contacts_ContactRole,
    email: contactData.ContactDetail.Contacts_Email,
    unconfirmedEmail: !!Number(
      contactData.ContactDetail.Contacts_UnconfirmedEmail
    ),
    relationship: convertStringToArray(
      contactData.ContactDetail.Contacts_Relationship
    ),
    contactStatus: contactData.ContactDetail.Contacts_ContactStatus,
    phone: contactData.ContactDetail.Contacts_Phone,
    mobile: contactData.ContactDetail.Contacts_MobilePhone,
    otherPhone: contactData.ContactDetail.Contacts_OtherPhone,
    namedSupportContact: !!Number(
      contactData.ContactDetail.Contacts_NamedSupportContact
    ),
    supportContactAdmin: !!Number(
      contactData.ContactDetail.Contacts_SupportContactAdministrator
    ),
    doNotSendSupportSurvey: !!Number(
      contactData.ContactDetail.Contacts_DoNotSendSupportSurvey
    ),
    communication: {
      doNotRemarket: !!Number(
        contactData.ContactCommunicationsPreferences.Contacts_DoNotRemarket
      ),
      doNotCall: !!Number(
        contactData.ContactCommunicationsPreferences.Contacts_DoNotCall
      ),
      emailOptOut: !!Number(
        contactData.ContactCommunicationsPreferences.Contacts_HasOptedOutOfEmail
      ),
      postalMailOptOut: !!Number(
        contactData.ContactCommunicationsPreferences
          .Contacts_DoNotSendPostalMail
      ),
    },
    address: {
      mailing: {
        street: contactData.ContactAddressInformation.Contacts_MailingStreet,
        city: contactData.ContactAddressInformation.Contacts_MailingCity,
        state: contactData.ContactAddressInformation.Contacts_MailingState,
        postalCode:
          contactData.ContactAddressInformation.Contacts_MailingPostalCode,
        country: contactData.ContactAddressInformation.Contacts_MailingCountry,
      },
      other: {
        street: contactData.ContactAddressInformation.Contacts_OtherStreet,
        city: contactData.ContactAddressInformation.Contacts_OtherCity,
        state: contactData.ContactAddressInformation.Contacts_OtherState,
        postalCode:
          contactData.ContactAddressInformation.Contacts_OtherPostalCode,
        country: contactData.ContactAddressInformation.Contacts_OtherCountry,
      },
    },
    demographic: {
      timeZone: contactData.ContactDemographicInformation.Contacts_TimeZone,
      preferredLanguage:
        contactData.ContactDemographicInformation.Contacts_PreferredLanguage,
    },
  };
};

interface CreateContactFormDataProps {
  contactData?: ContactData;
  accountData?: AccountData | null;
}
