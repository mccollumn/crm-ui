export interface ContactData {
  ContactDetail: ContactDetail;
  ContactAddressInformation: ContactAddressInformation;
  ContactDemographicInformation: ContactDemographicInformation;
  ContactCommunicationsPreferences: ContactCommunicationsPreferences;
  ContactSystemInformation: ContactSystemInformation;
}

interface ContactDetail {
  Contacts_ID: string;
  Contacts_AccountId: string;
  Accounts_Name?: string | null;
  Contacts_ContactRole?: string | null;
  Contacts_ContactStatus?: string | null;
  Contacts_DoNotSendSupportSurvey: "0" | "1";
  Contacts_Email?: string | null;
  Contacts_EmailBouncedDate?: string | null;
  Contacts_EmailBouncedReason?: string | null;
  Contacts_EmailDomain?: string | null;
  Contacts_Fax?: string | null;
  Contacts_FirstName?: string | null;
  Contacts_LastName?: string | null;
  Contacts_FullName?: string | null;
  Contacts_HomePhone?: string | null;
  Contacts_JobRole?: string | null;
  Contacts_MobilePhone?: string | null;
  Contacts_NamedSupportContact: "0" | "1";
  Contacts_OtherPhone?: string | null;
  Contacts_Phone?: string | null;
  Contacts_RelationshipToWebtrends?: string | null;
  Contacts_SupportContactAdministrator: "0" | "1";
  Contacts_Title?: string | null;
  Contacts_UnconfirmedEmail: "0" | "1";
}

interface ContactAddressInformation {
  Contacts_ID: string;
  Contacts_MailingCity?: string | null;
  Contacts_MailingCountry?: string | null;
  Contacts_MailingPostalCode?: string | null;
  Contacts_MailingState?: string | null;
  Contacts_MailingStreet?: string | null;
  Contacts_OtherCity?: string | null;
  Contacts_OtherCountry?: string | null;
  Contacts_OtherPostalCode?: string | null;
  Contacts_OtherState?: string | null;
  Contacts_OtherStreet?: string | null;
}

interface ContactDemographicInformation {
  Contacts_ID: string;
  Contacts_IndustryContact?: string | null;
  Contacts_PreferredLanguage?: string | null;
  Contacts_TimeZone?: string | null;
  Contacts_VerticalContact?: string | null;
}

interface ContactCommunicationsPreferences {
  Contacts_ID: string;
  Contacts_DoNotRemarket: "0" | "1";
  Contacts_DoNotSendPostalMail: "0" | "1";
  Contacts_DoNotCall: "0" | "1";
  Contacts_HasOptedOutOfEmail: "0" | "1";
}

interface ContactSystemInformation {
  Contacts_ID: string;
  Contacts_CreatedById: string;
  Users_Name?: string | null;
  Contacts_CreatedDate?: string | null;
  Contacts_LastActivityDate?: string | null;
  Contacts_LastModifiedById?: string | null;
  Contacts_LastModifiedDate?: string | null;
  Contacts_LastReferencedDate?: string | null;
  Contacts_LastViewedDate?: string | null;
}

export type ContactFormData = {
  contactID?: string | null;
  owner: { id?: string | null; name?: string | null };
  firstName?: string | null;
  lastName?: string | null;
  account: { id?: string | null; name?: string | null };
  title?: string | null;
  jobRole?: string | null;
  contactRole?: string | null;
  email?: string | null;
  unconfirmedEmail?: boolean | null;
  relationship?: string[] | null;
  contactStatus?: string | null;
  phone?: string | null;
  mobile?: string | null;
  otherPhone?: string | null;
  namedSupportContact?: boolean | null;
  supportContactAdmin?: boolean | null;
  doNotSendSupportSurvey?: boolean | null;
  communication: {
    doNotRemarket?: boolean | null;
    doNotCall?: boolean | null;
    emailOptOut?: boolean | null;
    postalMailOptOut?: boolean | null;
  };
  address: {
    mailing: {
      street?: string | null;
      city?: string | null;
      state?: string | null;
      postalCode?: string | null;
      country?: string | null;
    };
    other: {
      street?: string | null;
      city?: string | null;
      state?: string | null;
      postalCode?: string | null;
      country?: string | null;
    };
  };
  demographic: {
    timeZone?: string | null;
    preferredLanguage?: string | null;
  };
};
