import { InstitutionTypeInterface } from '../institution/institution-type-interface';
export interface StudyInterface {
  id: string;
  title: string;
  purpose: string;
  institutionName: string;
  institutionType: InstitutionTypeInterface;
  principleInvestigator: string;
  sponsor: string;
  irbContent: string;
  irbApprovalDate: string;
  irbApprovedBy: string;
  additionalInfoURL: string;
  enrollmentDeadline: string;
  requiredDataElements: number;
  status: string;
}
