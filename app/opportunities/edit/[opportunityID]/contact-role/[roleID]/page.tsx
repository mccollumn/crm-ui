"use client";

import { useRouter } from "next/navigation";
import { ContactRoleForm } from "@/app/forms/ContactRoleForm";

const EditContactRole = ({
  params,
}: {
  params: { opportunityID: string; roleID: string };
}) => {
  const router = useRouter();

  const opportunityID = params.opportunityID;
  const roleID = params.roleID;
  const values = getContactRoleData(roleID);

  const onSuccess = (values: any) => {
    console.log("Success values", values);
    // TODO:
    // PUT data
    // Verify successful response
    router.push(`/opportunities/view/${opportunityID}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ContactRoleForm
      formTitle="Edit Contact Role"
      onSuccess={onSuccess}
      onCancel={handleCancel}
      defaultValues={values}
    />
  );
};

const getContactRoleData = async (roleID: string) => {
  // TODO: Retreive data.
  return {};
};

export default EditContactRole;
