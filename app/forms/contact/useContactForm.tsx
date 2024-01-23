import React from "react";
import { useRouter } from "next/navigation";
import { MenuItem } from "@/app/types/types";
import {
  convertArrayToString,
  convertBooleanToString,
  getChangedValues,
  isSuccessfulResponse,
  removeNullsFromObject,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import { ContactData, ContactFormData } from "@/app/types/contacts";

export const useContactForm = ({ menuItems }: useContactFormProps) => {
  const router = useRouter();
  const initialMenuOptions = {
    Owner: [],
    Account: [],
    JobRole: [],
    ContactRole: [],
    RelationshipToWebtrends: [],
    ContactStatus: [],
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
            description: account.AccountsType_Description,
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
        setCustomMenuOptions("CollectionsContact", options);
      } catch {
        console.error("Could not retrieve list of users");
      }
    };
    setOwners();

    // Set menu options that are already known (i.e. aren't based on user input)
    setMenuOptions("JobRole");
    setMenuOptions("ContactRole");
    setMenuOptions("RelationshipToWebtrends");
    setMenuOptions("ContactStatus");
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
        Contacts_FirstName: values.firstName,
        Contacts_LastName: values.lastName,
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
        Contacts_PreferredLanguage: values.demographic.preferredLanguage,
        Contacts_TimeZone: values.demographic.timeZone,
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
      },
      SubmissionDetails: {
        UserID: user?.id || null,
        AccountID: values?.account?.id || null,
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
          AccountID: contactData.ContactDetail.Contacts_AccountId || null,
          ContactID: contactData.ContactDetail.Contacts_ID || null,
        },
      };
    }

    return newFormData;
  };

  const submitContact = async (
    values: ContactFormData,
    defaultValues: ContactFormData,
    contactData?: ContactData
  ) => {
    const data = await createContactFormSubmissionData(values, contactData);
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    let id = defaultValues.contactID;
    const url = id ? "/api/contacts/update" : "/api/contacts/insert";
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
    // Invalidate cached account data
    await fetch("/api/revalidate/tag?tag=contact");

    return responseData;
  };

  return {
    setMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    createContactFormSubmissionData,
    submitContact,
  };
};

interface useContactFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
