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
import { formatCheckbox, formatDate } from "@/app/utils/utils";

const ContactInformation = async ({ contactID }: ContactInformationProps) => {
  const contactInfo = await getContactInfo(contactID);
  if (!contactInfo) return null;

  return (
    <>
      <ButtonNav size="small" path={`/contacts/edit/${contactID}`}>
        Edit
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
      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-social-section-content"
          id="contact-social-section-header"
        >
          <Typography variant="h6">Social Media Presence</Typography>
        </AccordionSummary>
        <AccordionDetails id="contact-social-section-content">
          <InformationSection
            itemsLeft={contactInfo.social.left}
            itemsRight={contactInfo.social.right}
          />
        </AccordionDetails>
      </Accordion> */}
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
      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-adr_isr-section-content"
          id="contact-adr_isr-section-header"
        >
          <Typography variant="h6">ADR/ISR Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="contact-adr_isr-section-content">
          <InformationSection
            itemsLeft={contactInfo.adr_isr.left}
            itemsRight={contactInfo.adr_isr.right}
          />
        </AccordionDetails>
      </Accordion> */}
      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-description-section-content"
          id="contact-description-section-header"
        >
          <Typography variant="h6">Description Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="contact-description-section-content">
          <InformationSection itemsLeft={contactInfo.description.fullWidth} />
        </AccordionDetails>
      </Accordion> */}
      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-marketing-section-content"
          id="contact-marketing-section-header"
        >
          <Typography variant="h6">Marketing Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="contact-marketing-section-content">
          <InformationSection
            itemsLeft={contactInfo.marketing.left}
            itemsRight={contactInfo.marketing.right}
          />
        </AccordionDetails>
      </Accordion> */}
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
        // { label: "Contact Owner", value: "" },
        { label: "Name", value: contactData.ContactDetail.Contacts_FullName },
        {
          label: "Account Name",
          value: (
            <Link
              href={`/accounts/view/${contactData.ContactDetail.Contacts_AccountId}`}
            >
              {contactData.ContactDetail.Accounts_Name}
            </Link>
          ),
        },
        { label: "Title", value: contactData.ContactDetail.Contacts_Title },
        // { label: "Reports To", value: "" },
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
        // { label: "Most Recent Product Interest", value: "" },
        // { label: "Interest", value: "" },
        // { label: "Do Not Send Support Survey", value: "" },
        // { label: "Webtrends OC", value: "" },
        // { label: "HTML Login", value: "" },
        // { label: "Flash Login", value: "" },
        // { label: "EOL Product", value: "" },
      ],
      right: [
        {
          label: "Relationship to Webtrends",
          value: contactData.ContactDetail.Contacts_RelationshipToWebtrends,
        },
        {
          label: "Contact Status",
          value: contactData.ContactDetail.Contacts_ContactStatus,
        },
        // { label: "MQL Date", value: "" },
        // { label: "Lead Source", value: "" },
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
        // { label: "Sync to Intacct", value: "" },
        // { label: "Account Territory", value: "" },
        {
          label: "Account Super Region",
          value: accountData.AccountDetail.Accounts_Super_Region,
        },
        {
          label: "Account Type",
          value: accountData.AccountDetail.AccountType_Description,
        },
        // { label: "Target Account Type", value: "" },
        // { label: "WTOD Most Recent Login", value: "" },
      ],
    },
    // social: {
    //   left: [
    //     { label: "LinkedIn Profile", value: "" },
    //     { label: "Social Media Properties", value: "" },
    //   ],
    //   right: [
    //     { label: "Marked for Deletion", value: "" },
    //     { label: "Twitter ID", value: "" },
    //   ],
    // },
    address: {
      left: [
        {
          label: "Mailing Address",
          value: (
            <Address
              street={
                contactData.ContactAddressInformation.Contacts_MailingStreet
              }
              city={contactData.ContactAddressInformation.Contacts_MailingCity}
              state={
                contactData.ContactAddressInformation.Contacts_MailingState
              }
              postalCode={
                contactData.ContactAddressInformation.Contacts_MailingPostalCode
              }
              country={
                contactData.ContactAddressInformation.Contacts_MailingCountry
              }
            />
          ),
        },
      ],
      right: [
        {
          label: "Other Address",
          value: (
            <Address
              street={
                contactData.ContactAddressInformation.Contacts_OtherStreet
              }
              city={contactData.ContactAddressInformation.Contacts_OtherCity}
              state={contactData.ContactAddressInformation.Contacts_OtherState}
              postalCode={
                contactData.ContactAddressInformation.Contacts_OtherPostalCode
              }
              country={
                contactData.ContactAddressInformation.Contacts_OtherCountry
              }
            />
          ),
        },
      ],
    },
    // adr_isr: {
    //   left: [
    //     { label: "ADR/ISR Generated", value: "" },
    //     { label: "Meeting Scheduled Date", value: "" },
    //   ],
    //   right: [
    //     { label: "Meeting Rescheduled Date", value: "" },
    //     { label: "Meeting Occurred Date", value: "" },
    //   ],
    // },
    // description: {
    //   fullWidth: [
    //     { label: "Product Interest", value: "" },
    //     { label: "Comments", value: "" },
    //     { label: "Lead Notes", value: "" },
    //   ],
    // },
    // marketing: {
    //   left: [
    //     { label: "Lead Source Details", value: "" },
    //     { label: "Lead Source Original", value: "" },
    //     { label: "Lead Source Details Original", value: "" },
    //   ],
    //   right: [
    //     { label: "Email Remarketing Lead Date", value: "" },
    //     { label: "Most Recent Activity", value: "" },
    //     { label: "Most Recent Response Type", value: "" },
    //     { label: "SharePoint Contact", value: "" },
    //   ],
    // },
    links: {
      left: [
        // {
        //   label: "18 Character Contact ID",
        //   value:
        //     "https://webtrends.lightning.force.com/servlet/servlet.Integration?lid=00b400000018LuX&eid=0031W00002d6IULQA2&ic=1",
        // },
        {
          label: "Trial Manager",
          value: (
            <Link
              href={`https://crm.webtrends.io/trialmanager/tm.aspx?trialobject=Account&trialobjectid=${contactData.ContactDetail.Contacts_AccountId}&objectType=Account&objectid=${contactData.ContactDetail.Contacts_AccountId}&objectname=${contactData.ContactDetail.Accounts_Name}`}
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
              href={`https://crm.webtrends.io/EmailHistory/default.aspx?email=${contactData.ContactDetail.Contacts_Email}&name=${contactData.ContactDetail.Contacts_FullName}&object=Contact&id=${contactData.ContactDetail.Contacts_ID}`}
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
        // { label: "No Install Admin Newsletter", value: "" },
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
        // { label: "Double Opt-In", value: "" },
        // { label: "Double Opt-In Timestamp", value: "" },
      ],
    },
    system: {
      left: [
        // { label: "NPS Score", value: "" },
        // { label: "NPS Reason", value: "" },
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
        // { label: "Default Account", value: "" },
      ],
      right: [
        // { label: "NPS Comments", value: "" },
        // { label: "NPS Reason Detractor", value: "" },
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
