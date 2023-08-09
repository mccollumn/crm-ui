import { NewCaseData } from "@/app/forms/NewCaseForm";

type AllFormData = NewCaseData;

export const useForm = ({ setData }: UseFormProps) => {
  const updateFields = (fields: Partial<AllFormData>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // Input ID values must match the field name
  const handleInputChange = (e: any) => {
    updateFields({ [e.target.id]: e.target.value });
  };

  // Input ID values must match the field name
  const handleCheckboxChange = (e: any) => {
    updateFields({ [e.target.id]: e.target.checked });
  };

  return {
    updateFields,
    handleInputChange,
    handleCheckboxChange,
  };
};

interface UseFormProps {
  setData: React.Dispatch<React.SetStateAction<NewCaseData>>;
}
