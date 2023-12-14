import { ContactForm } from "@/app/forms/contact/ContactForm";
import { createContactFormData } from "@/app/forms/contact/contactFormUtils";
import { getContactData, getMenuItems } from "@/app/utils/getData";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const EditContact = async ({ params }: { params: { contactID: string } }) => {
  const contactID = params.contactID;
  const contactDataPromise = getContactData(contactID);
  const menuItemsPromise = getMenuItems();
  const [contactData, menuItems] = await Promise.all([
    contactDataPromise,
    menuItemsPromise,
  ]);
  const contactName = `${contactData.ContactDetail.Contacts_FirstName} ${contactData.ContactDetail.Contacts_LastName}`;
  const values = await createContactFormData({ contactData });

  return (
    <ContactForm
      formTitle={`Edit Contact - ${contactName}`}
      defaultValues={values}
      menuItems={menuItems}
      contactData={contactData}
    />
  );
};

export default EditContact;
