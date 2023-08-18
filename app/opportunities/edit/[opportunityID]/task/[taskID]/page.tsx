"use client";

import { useRouter } from "next/navigation";
import { TaskForm } from "@/app/forms/TaskForm";

const EditTask = ({
  params,
}: {
  params: { opportunityID: string; taskID: string };
}) => {
  const router = useRouter();

  const opportunityID = params.opportunityID;
  const taskID = params.taskID;
  const values = getTaskData(taskID);

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
    <TaskForm
      formTitle="Edit Task"
      onSuccess={onSuccess}
      onCancel={handleCancel}
      defaultValues={values}
    />
  );
};

const getTaskData = async (roleID: string) => {
  // TODO: Retreive data.
  return {};
};

export default EditTask;
