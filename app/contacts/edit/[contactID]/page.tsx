import { ContactForm } from "@/app/forms/contact/ContactForm";
import { createContactFormData } from "@/app/forms/contact/contactFormUtils";
import { getContactData, getMenuItems } from "@/app/utils/getData";

const EditContact = async ({ params }: { params: { contactID: string } }) => {
  const contactID = params.contactID;
  const contactDataPromise = getContactData(contactID);
  const menuItemsPromise = getMenuItems();
  const [contactData, menuItems] = await Promise.all([
    contactDataPromise,
    menuItemsPromise,
  ]);
  const contactName = contactData?.ContactDetail?.Contacts_FullName;
  const values = await createContactFormData(contactData);

  return (
    <ContactForm
      formTitle={`Edit Contact - ${contactName}`}
      defaultValues={values}
      menuItems={menuItems}
    />
  );
};

export default EditContact;
