// import { CaseData } from "../types/cases";
import { CaseFormData } from "./CaseForm";

type AllFormData = CaseFormData;

export const useForm = ({ setData }: UseFormProps) => {
  const updateFields = (fields: Partial<AllFormData>) => {
    setData((prev: CaseFormData) => {
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
  /**
   * React useState setter function for form data
   */
  setData: React.Dispatch<React.SetStateAction<CaseFormData>>;
}
