import { ContactData } from "@/app/types/contacts";
import { getDefaultOwner } from "@/app/utils/forms";

/**
 * Generates and object containing the default values for a new/empty case form.
 * @returns Initial case form data.
 */
const generateInitialContactFormData = async () => {
  const defaultOwner = await getDefaultOwner();

  const initialContactFormData = {
    contactID: null,
    owner: defaultOwner,
    salutation: null,
    firstName: null,
    lastName: null,
    account: { id: null, name: null, site: null },
    title: null,
    jobRole: null,
    contactRole: null,
    email: null,
    relationship: null,
    contactStatus: null,
    phone: null,
    mobile: null,
    otherPhone: null,
    namedSupportContact: false,
    supportContactAdmin: false,
    address: {
      mailing: {
        street: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
      },
      other: {
        street: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
      },
      superRegion: null,
    },
  };

  return initialContactFormData;
};

/**
 * Returns a contact data object to be passed to the contact form.
 * @param contactData Data from an existing contact. (optional)
 * @returns Contact data object.
 */
export const createContactFormData = async (contactData?: ContactData) => {
  const initialContactFormData = await generateInitialContactFormData();

  if (!contactData) {
    return initialContactFormData;
  }

  // TODO: fill in this object
  return {
    ...initialContactFormData,
    contactID: null,
    owner: null,
    salutation: null,
    firstName: null,
    lastName: null,
    account: { id: null, name: null, site: null },
    title: null,
    jobRole: null,
    contactRole: null,
    email: null,
    relationship: null,
    contactStatus: null,
    phone: null,
    mobile: null,
    otherPhone: null,
    namedSupportContact: false,
    supportContactAdmin: false,
    address: {
      mailing: {
        street: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
      },
      other: {
        street: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
      },
      superRegion: null,
    },
  };
};
