import React from "react";
import { MenuItem } from "@/app/types/types";
import {
  convertArrayToString,
  convertBooleanToString,
  getChangedValues,
  isObjectEmpty,
  removeNullsFromObject,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import { ContactData, ContactFormData } from "@/app/types/contacts";

export const useContactForm = ({ menuItems }: useContactFormProps) => {
  const initialMenuOptions = {
    Owner: [],
    Account: [],
    // Salutation: [],
    JobRole: [],
    ContactRole: [],
    Relationship: [],
    ContactStatus: [],
    // SuperRegion: [],
    TimeZone: [],
    PreferredLanguage: [],
  };

  const {
    setMenuOptions,
    setCustomMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    user,
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
        setCustomMenuOptions("CollectionsContact", options);
      } catch {
        console.error("Could not retrieve list of users");
      }
    };
    setOwners();

    // Set menu options that are already known (i.e. aren't based on user input)
    // setMenuOptions("Salutation");
    setMenuOptions("JobRole");
    setMenuOptions("ContactRole");
    setMenuOptions("Relationship");
    setMenuOptions("ContactStatus");
    // setMenuOptions("SuperRegion");
    setMenuOptions("TimeZone");
    setMenuOptions("PreferredLanguage");
  }, [setCustomMenuOptions, setMenuOptions]);

  const createContactFormSubmissionData = (
    values: ContactFormData,
    contactData?: ContactData
  ) => {
    const data = {
      ContactDetail: {
        Contacts_ID: values.contactID,
        Contacts_AccountId: values.account.id,
        Accounts_Name: values.account.name,
        Contacts_ContactRole: values.contactRole,
        Contacts_ContactStatus: values.contactStatus,
        Contacts_DoNotSendSupportSurvey: convertBooleanToString(
          values.doNotSendSupportSurvey
        ),
        Contacts_Email: values.email,
        // Contacts_EmailBouncedDate: null,
        // Contacts_EmailBouncedReason: null,
        // Contacts_EmailDomain: "kp.org",
        // Contacts_Fax: "(510) 267-2601",
        Contacts_FullName: `${values.firstName} ${values.lastName}`,
        // Contacts_HomePhone: null,
        Contacts_JobRole: values.jobRole,
        Contacts_MobilePhone: values.mobile,
        Contacts_NamedSupportContact: convertBooleanToString(
          values.namedSupportContact
        ),
        Contacts_OtherPhone: values.otherPhone,
        Contacts_Phone: values.phone,
        Contacts_RelationshipToWebtrends: convertArrayToString(
          values.relationship
        ),
        Contacts_SupportContactAdministrator: convertBooleanToString(
          values.supportContactAdmin
        ),
        Contacts_Title: values.title,
        Contacts_UnconfirmedEmail: convertBooleanToString(
          values.unconfirmedEmail
        ),
      },
      ContactAddressInformation: {
        Contacts_ID: values.contactID,
        Contacts_MailingCity: values.address.mailing.city,
        Contacts_MailingCountry: values.address.mailing.country,
        Contacts_MailingPostalCode: values.address.mailing.postalCode,
        Contacts_MailingState: values.address.mailing.state,
        Contacts_MailingStreet: values.address.mailing.street,
        Contacts_OtherCity: values.address.other.city,
        Contacts_OtherCountry: values.address.other.country,
        Contacts_OtherPostalCode: values.address.other.postalCode,
        Contacts_OtherState: values.address.other.state,
        Contacts_OtherStreet: values.address.other.street,
      },
      ContactDemographicInformation: {
        Contacts_ID: values.contactID,
        // Contacts_IndustryContact: "Healthcare",
        Contacts_PreferredLanguage: values.demographic.preferredLanguage,
        Contacts_TimeZone: values.demographic.timeZone,
        // Contacts_VerticalContact: "Health Care",
      },
      ContactCommunicationsPreferences: {
        Contacts_ID: values.contactID,
        Contacts_DoNotRemarket: convertBooleanToString(
          values.communication.doNotRemarket
        ),
        Contacts_DoNotSendPostalMail: convertBooleanToString(
          values.communication.postalMailOptOut
        ),
        Contacts_DoNotCall: convertBooleanToString(
          values.communication.doNotCall
        ),
        Contacts_HasOptedOutOfEmail: convertBooleanToString(
          values.communication.emailOptOut
        ),
      },
      ContactSystemInformation: {
        Contacts_ID: values.contactID,
        Contacts_CreatedById: values.owner.id,
        Users_Name: values.owner.name,
        // Contacts_CreatedDate: "2016-10-04 18:00:20.0000000",
        // Contacts_LastActivityDate: "2023-08-09 00:00:00.0000000",
        // Contacts_LastModifiedById: "33271",
        // Contacts_LastModifiedDate: "2023-08-08 15:56:18.0000000",
        // Contacts_LastReferencedDate: null,
        // Contacts_LastViewedDate: null,
      },
    };
    let newFormData: any = removeNullsFromObject(data);

    // We only want to submit form values that were modified
    newFormData = getChangedValues(newFormData, contactData);

    // Add the contact and account IDs back in
    if (contactData) {
      newFormData = {
        ...newFormData,
        ContactDetail: {
          ...newFormData.ContactDetail,
          Contacts_ID: contactData.ContactDetail.Contacts_ID,
          Contacts_AccountId: contactData.ContactDetail.Contacts_AccountId,
        },
        ContactAddressInformation: {
          ...newFormData.ContactAddressInformation,
          Contacts_ID: contactData.ContactAddressInformation.Contacts_ID,
        },
        ContactDemographicInformation: {
          ...newFormData.ContactDemographicInformation,
          Contacts_ID: contactData.ContactDemographicInformation.Contacts_ID,
        },
        ContactCommunicationsPreferences: {
          ...newFormData.ContactCommunicationsPreferences,
          Contacts_ID: contactData.ContactCommunicationsPreferences.Contacts_ID,
        },
        ContactSystemInformation: {
          ...newFormData.ContactSystemInformation,
          Contacts_ID: contactData.ContactSystemInformation.Contacts_ID,
        },
        SubmissionDetails: {
          ...newFormData.SubmissionDetails,
          UserID: user?.id || null,
          AccountID: contactData.ContactDetail.Contacts_AccountId || null,
          ContactID: contactData.ContactDetail.Contacts_ID || null,
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
    createContactFormSubmissionData,
  };
};

interface useContactFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
