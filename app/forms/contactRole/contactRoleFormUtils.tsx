import { convertStringToArray, unEscape } from "@/app/utils/utils";
import { ContactRole } from "@/app/types/opportunities";

/**
 * Generates an object containing the default values for a new/empty contact role form.
 * @returns Initial contact role form data.
 */
const generateInitialContactRoleFormData = async () => {
  const initialOpportunityFormData = {
    id: null,
    contact: {
      id: null,
      name: null,
      isPrimary: false,
    },
    role: {
      name: null,
    },
  };

  return initialOpportunityFormData;
};

/**
 * Returns a contact role data object to be passed to the contact role form.
 * @param contactRoleData Data from an existing contact role. (optional)
 * @returns Contact role data object.
 */
export const createContactRoleFormData = async (
  contactRoleData?: ContactRole
) => {
  const initialOpportunityFormData = await generateInitialContactRoleFormData();

  if (!contactRoleData) {
    return initialOpportunityFormData;
  }

  return {
    ...initialOpportunityFormData,
    id: contactRoleData.OpportunityContactRoles_ID,
    contact: {
      id: contactRoleData.OpportunityContactRoles_ContactId,
      name: contactRoleData.Contacts_Name,
      isPrimary: !!Number(contactRoleData.OpportunityContactRoles_IsPrimary),
    },
    role: {
      name: contactRoleData.OpportunityContactRoles_Role,
    },
  };
};
