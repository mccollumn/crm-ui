"use client";

import { useRouter } from "next/navigation";
import { TaskForm } from "@/app/forms/TaskForm";

const NewTask = ({ params }: { params: { opportunityID: string } }) => {
  const router = useRouter();
  const opportunityID = params.opportunityID;

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
      formTitle="New Task"
      onSuccess={onSuccess}
      onCancel={handleCancel}
    />
  );
};

export default NewTask;
