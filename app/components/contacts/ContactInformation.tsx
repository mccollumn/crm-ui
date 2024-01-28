import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ButtonNav } from "../navigation/ButtonNav";
import { InformationSection } from "../InformationSection";
import { ContactData } from "@/app/types/contacts";
import { AccountData } from "@/app/types/accounts";
import { getAccountData, getContactData } from "@/app/utils/getData";
import { Address } from "../Address";
import Link from "next/link";
import { formatCheckbox, formatDate, unEscape } from "@/app/utils/utils";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const ContactInformation = async ({ contactID }: ContactInformationProps) => {
  const contactInfo = await getContactInfo(contactID);
  if (!contactInfo) return null;

  return (
    <>
      <ButtonNav size="small" path={`/contacts/edit/${contactID}`}>
        Edit
      </ButtonNav>
      <ButtonNav size="small" path={`/cases/new/?contactID=${contactID}`}>
        New Case
      </ButtonNav>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-info-section-content"
          id="contact-info-section-header"
        >
          <Typography variant="h6">Contact Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="contact-info-section-content">
          <InformationSection
            itemsLeft={contactInfo.info.left}
            itemsRight={contactInfo.info.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-address-section-content"
          id="contact-address-section-header"
        >
          <Typography variant="h6">Address Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="contact-address-section-content">
          <InformationSection
            itemsLeft={contactInfo.address.left}
            itemsRight={contactInfo.address.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-links-section-content"
          id="contact-links-section-header"
        >
          <Typography variant="h6">Custom Links</Typography>
        </AccordionSummary>
        <AccordionDetails id="contact-links-section-content">
          <InformationSection
            itemsLeft={contactInfo.links.left}
            itemsRight={contactInfo.links.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-demographic-section-content"
          id="contact-demographic-section-header"
        >
          <Typography variant="h6">Demographic Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="contact-demographic-section-content">
          <InformationSection
            itemsLeft={contactInfo.demographic.left}
            itemsRight={contactInfo.demographic.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-communication-section-content"
          id="contact-communication-section-header"
        >
          <Typography variant="h6">Communication Preferences</Typography>
        </AccordionSummary>
        <AccordionDetails id="contact-communication-section-content">
          <InformationSection
            itemsLeft={contactInfo.communication.left}
            itemsRight={contactInfo.communication.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-system-section-content"
          id="contact-system-section-header"
        >
          <Typography variant="h6">System Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="contact-system-section-content">
          <InformationSection
            itemsLeft={contactInfo.system.left}
            itemsRight={contactInfo.system.right}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const getContactInfo = async (contactID: string) => {
  const contactData: ContactData = await getContactData(contactID);
  if (!contactData) return null;
  const accountID = contactData.ContactDetail.Contacts_AccountId;
  const accountData: AccountData = await getAccountData(accountID);
  if (!accountData) return null;
  return {
    info: {
      left: [
        {
          label: "Name",
          value: `${contactData.ContactDetail.Contacts_FirstName} ${contactData.ContactDetail.Contacts_LastName}`,
        },
        {
          label: "Account Name",
          value: (
            <Link
              href={`/accounts/view/${contactData.ContactDetail.Contacts_AccountId}`}
            >
              {unEscape(contactData.ContactDetail.Accounts_Name)}
            </Link>
          ),
        },
        {
          label: "Title",
          value: unEscape(contactData.ContactDetail.Contacts_Title),
        },
        {
          label: "Job Role",
          value: contactData.ContactDetail.Contacts_JobRole,
        },
        {
          label: "Contact Role",
          value: contactData.ContactDetail.Contacts_ContactRole,
        },
        {
          label: "Email",
          value: (
            <Link href={`mailto:${contactData.ContactDetail.Contacts_Email}`}>
              {contactData.ContactDetail.Contacts_Email}
            </Link>
          ),
        },
        {
          label: "Unconfirmed Email",
          value: formatCheckbox(
            contactData.ContactDetail.Contacts_UnconfirmedEmail
          ),
        },
      ],
      right: [
        {
          label: "Relationship",
          value: contactData.ContactDetail.Contacts_Relationship,
        },
        {
          label: "Contact Status",
          value: contactData.ContactDetail.Contacts_ContactStatus,
        },
        { label: "Phone", value: contactData.ContactDetail.Contacts_Phone },
        {
          label: "Mobile",
          value: contactData.ContactDetail.Contacts_MobilePhone,
        },
        {
          label: "Other Phone",
          value: contactData.ContactDetail.Contacts_OtherPhone,
        },
        { label: "Fax", value: contactData.ContactDetail.Contacts_Fax },
        {
          label: "Named Support Contact",
          value: formatCheckbox(
            contactData.ContactDetail.Contacts_NamedSupportContact
          ),
        },
        {
          label: "Support Contact Administrator",
          value: formatCheckbox(
            contactData.ContactDetail.Contacts_SupportContactAdministrator
          ),
        },
        {
          label: "Account Super Region",
          value: accountData.AccountDetail.Accounts_Super_Region,
        },
        {
          label: "Account Type",
          value: accountData.AccountDetail.AccountsType_Description,
        },
      ],
    },
    address: {
      left: [
        {
          label: "Mailing Address",
          value: (
            <Address
              street={unEscape(
                contactData.ContactAddressInformation.Contacts_MailingStreet
              )}
              city={unEscape(
                contactData.ContactAddressInformation.Contacts_MailingCity
              )}
              state={unEscape(
                contactData.ContactAddressInformation.Contacts_MailingState
              )}
              postalCode={unEscape(
                contactData.ContactAddressInformation.Contacts_MailingPostalCode
              )}
              country={unEscape(
                contactData.ContactAddressInformation.Contacts_MailingCountry
              )}
            />
          ),
        },
      ],
      right: [
        {
          label: "Other Address",
          value: (
            <Address
              street={unEscape(
                contactData.ContactAddressInformation.Contacts_OtherStreet
              )}
              city={unEscape(
                contactData.ContactAddressInformation.Contacts_OtherCity
              )}
              state={unEscape(
                contactData.ContactAddressInformation.Contacts_OtherState
              )}
              postalCode={unEscape(
                contactData.ContactAddressInformation.Contacts_OtherPostalCode
              )}
              country={unEscape(
                contactData.ContactAddressInformation.Contacts_OtherCountry
              )}
            />
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
              href={`https://crm.example.io/trialmanager/tm.aspx?trialobject=Account&trialobjectid=${contactData.ContactDetail.Contacts_AccountId}&objectType=Account&objectid=${contactData.ContactDetail.Contacts_AccountId}&objectname=${contactData.ContactDetail.Accounts_Name}`}
              target="_blank"
            >
              Trial Manager
            </Link>
          ),
        },
      ],
      right: [
        {
          label: "System Sent Email History",
          value: (
            <Link
              href={`https://crm.example.io/EmailHistory/default.aspx?email=${contactData.ContactDetail.Contacts_Email}&name=${contactData.ContactDetail.Contacts_FirstName} ${contactData.ContactDetail.Contacts_LastName}&object=Contact&id=${contactData.ContactDetail.Contacts_ID}`}
              target="_blank"
            >
              System Sent Email History
            </Link>
          ),
        },
      ],
    },
    demographic: {
      left: [
        {
          label: "Preferred Language",
          value:
            contactData.ContactDemographicInformation
              .Contacts_PreferredLanguage,
        },
        {
          label: "Vertical",
          value:
            contactData.ContactDemographicInformation.Contacts_VerticalContact,
        },
      ],
      right: [
        {
          label: "Time Zone",
          value: contactData.ContactDemographicInformation.Contacts_TimeZone,
        },
        {
          label: "Industry",
          value:
            contactData.ContactDemographicInformation.Contacts_IndustryContact,
        },
      ],
    },
    communication: {
      left: [
        {
          label: "Email Opt Out",
          value: formatCheckbox(
            contactData.ContactCommunicationsPreferences
              .Contacts_HasOptedOutOfEmail
          ),
        },
        {
          label: "Do Not Call",
          value: formatCheckbox(
            contactData.ContactCommunicationsPreferences.Contacts_DoNotCall
          ),
        },
      ],
      right: [
        {
          label: "Do Not Remarket",
          value: formatCheckbox(
            contactData.ContactCommunicationsPreferences.Contacts_DoNotRemarket
          ),
        },
        {
          label: "Do Not Send Postal Mail",
          value: formatCheckbox(
            contactData.ContactCommunicationsPreferences
              .Contacts_DoNotSendPostalMail
          ),
        },
      ],
    },
    system: {
      left: [
        {
          label: "Created By",
          value: contactData.ContactSystemInformation.Users_Name,
        },
        {
          label: "Created Date",
          value: formatDate(
            contactData.ContactSystemInformation.Contacts_CreatedDate
          ),
        },
      ],
      right: [
        {
          label: "Last Modified By",
          value: contactData.ContactSystemInformation.Contacts_LastModifiedById,
        },
        {
          label: "Last Modified Date",
          value: formatDate(
            contactData.ContactSystemInformation.Contacts_LastModifiedDate
          ),
        },
      ],
    },
  };
};

interface ContactInformationProps {
  contactID: string;
}

export default ContactInformation;
