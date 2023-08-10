export interface CaseData {
  id: string;
  subject: string;
  accountName: string;
  status: string;
  opened: string;
  hibernateDate: string | null;
  isTamCase: boolean;
  description: string;
  comments?: CaseComments[];
}

interface CaseComments {
  id: number;
  user: string;
  public: boolean;
  createDate: Date;
  comment: string;
}
