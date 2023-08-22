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

const getContactData = (contactID: string) => {
  // TODO: Retreive contact data
  return { id: "0018Z00002eltWLQAY", name: "Mr Customer" };
};

const ContactInformation = ({ contactID }: ContactInformationProps) => {
  const contactData = getContactData(contactID);
  if (!contactData) return null;

  const contactInfo = getContactInfo(contactData);

  return (
    <>
      <ButtonNav size="small" path={`/contacts/edit/${contactData.id}`}>
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
      <Accordion defaultExpanded={true}>
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
      </Accordion>
      <Accordion defaultExpanded={true}>
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
      </Accordion>
      <Accordion defaultExpanded={true}>
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

const getContactInfo = (contactData: ContactData) => {
  return {
    info: {
      left: [
        { label: "Case Owner", value: "" },
        { label: "Name", value: "" },
        { label: "Account Name", value: "" },
        { label: "Title", value: "" },
        { label: "Reports To", value: "" },
        { label: "Job Role", value: "" },
        { label: "Contact Role", value: "" },
        { label: "Email", value: "" },
        { label: "Unconfirmed Email", value: "" },
        { label: "Most Recent Product Interest", value: "" },
        { label: "Interest", value: "" },
        { label: "Do Not Send Support Survey", value: "" },
        { label: "Webtrends OC", value: "" },
        { label: "HTML Login", value: "" },
        { label: "Flash Login", value: "" },
        { label: "EOL Product", value: "" },
      ],
      right: [
        { label: "Relationship to Webtrends", value: "" },
        { label: "Contact Status", value: "" },
        { label: "MQL Date", value: "" },
        { label: "Lead Source", value: "" },
        { label: "Phone", value: "" },
        { label: "Mobile", value: "" },
        { label: "Other Phone", value: "" },
        { label: "Fax", value: "" },
        { label: "Named Support Contact", value: "" },
        { label: "Support Contact Administrator", value: "" },
        { label: "Sync to Intacct", value: "" },
        { label: "Account Territory", value: "" },
        { label: "Account Type", value: "" },
        { label: "Target Account Type", value: "" },
        { label: "WTOD Most Recent Login", value: "" },
      ],
    },
    social: {
      left: [
        { label: "LinkedIn Profile", value: "" },
        { label: "Social Media Properties", value: "" },
      ],
      right: [
        { label: "Marked for Deletion", value: "" },
        { label: "Twitter ID", value: "" },
      ],
    },
    address: {
      left: [{ label: "Mailing Address", value: "" }],
      right: [
        { label: "Other Address", value: "" },
        { label: "Super Region", value: "" },
      ],
    },
    adr_isr: {
      left: [
        { label: "ADR/ISR Generated", value: "" },
        { label: "Meeting Scheduled Date", value: "" },
      ],
      right: [
        { label: "Meeting Rescheduled Date", value: "" },
        { label: "Meeting Occurred Date", value: "" },
      ],
    },
    description: {
      fullWidth: [
        { label: "Product Interest", value: "" },
        { label: "Comments", value: "" },
        { label: "Lead Notes", value: "" },
      ],
    },
    marketing: {
      left: [
        { label: "Lead Source Details", value: "" },
        { label: "Lead Source Original", value: "" },
        { label: "Lead Source Details Original", value: "" },
      ],
      right: [
        { label: "Email Remarketing Lead Date", value: "" },
        { label: "Most Recent Activity", value: "" },
        { label: "Most Recent Response Type", value: "" },
        { label: "SharePoint Contact", value: "" },
      ],
    },
    links: {
      left: [
        {
          label: "18 Character Contact ID",
          value:
            "https://webtrends.lightning.force.com/servlet/servlet.Integration?lid=00b400000018LuX&eid=0031W00002d6IULQA2&ic=1",
        },
        {
          label: "Trial Manager",
          value:
            "https://webtrends.lightning.force.com/servlet/servlet.Integration?lid=00b30000000jD7L&eid=0031W00002d6IULQA2&ic=1",
        },
      ],
      right: [
        {
          label: "System Sent Email History",
          value:
            "https://webtrends.lightning.force.com/servlet/servlet.Integration?lid=00b30000000fggQ&eid=0031W00002d6IULQA2&ic=1",
        },
      ],
    },
    demographic: {
      left: [
        { label: "Preferred Language", value: "" },
        { label: "Vertical", value: "" },
      ],
      right: [
        { label: "Time Zone", value: "" },
        { label: "Industry", value: "" },
      ],
    },
    communication: {
      left: [
        { label: "Email Opt Out", value: "" },
        { label: "Do Not Call", value: "" },
        { label: "No Install Admin Newsletter", value: "" },
      ],
      right: [
        { label: "Double Opt-In", value: "" },
        { label: "Double Opt-In Timestamp", value: "" },
      ],
    },
    system: {
      left: [
        { label: "NPS Score", value: "" },
        { label: "NPS Reason", value: "" },
        { label: "Created By", value: "" },
        { label: "Default Account", value: "" },
      ],
      right: [
        { label: "NPS Comments", value: "" },
        { label: "NPS Reason Detractor", value: "" },
        { label: "Last Modified By", value: "" },
      ],
    },
  };
};

interface ContactInformationProps {
  contactID: string;
}

export default ContactInformation;
