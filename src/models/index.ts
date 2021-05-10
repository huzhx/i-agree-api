const baselinePreference = {
  1: {
    userId: '1',
    DOCTORSOFFICE: 93,
    HOSPITAL: 77,
    INSURANCE: 79,
    STATEHA: 111,
    GOVHA: 108,
    BIOTECHCOMPANY: 44,
    UNIVERSITY: 109,
  },
};

const consent = {
  1: {
    userId: '1',
    studyId: '1',
    consentState: 111,
    declineReason: null,
    declineReasonOther: null,
  },
  2: {
    userId: '1',
    studyId: '2',
    consentState: 109,
    declineReason: null,
    declineReasonOther: null,
  },
  3: {
    userId: '1',
    studyId: '3',
    consentState: 45,
    declineReason: null,
    declineReasonOther: null,
  },
  4: {
    userId: '1',
    studyId: '4',
    consentState: null,
    declineReason: null,
    declineReasonOther: null,
  },
};

const study = {
  1: {
    id: '1',
    title: 'Clinical-trial of COVID-19 Convalescent Plasma in Outpatients',
    purpose:
      'The overarching goal of this project is to confirm or refute the role of passive immunization as a safe and efficacious therapy in preventing the progression from mild to severe/critical COVID-19 illness and to understand the immunologic kinetics of anti-SARS-CoV-2 antibodies after passive immunization.The primary objective is to determine the efficacy and safety of a single dose of convalescent plasma (CP) for preventing the progression from mild to severe COVID-19 illness. The secondary objective is to characterize the immunologic response to CP administration.',
    institutionName: 'Stanford University',
    institutionType: 'UNIVERSITY',
    principleInvestigator:
      'Clifton W Callaway, Valerie Durkalski-Mauldin, Frederick Korley, Sharon Yeatts, Robert Silbergleit, William Barsan',
    sponsor: 'Stanford University',
    irbContent:
      'The study protocol has been approved by the Stanford University Review Board (IRB) (2020-051). Any protocol modifications will be submitted for the IRB review and approval.',
    irbApprovalDate: '08-11-2020',
    irbApprovedBy: 'Stanford University',
    additionalInfoURL: 'https://www.clinicaltrials.gov/ct2/show/NCT04355767?term=UCSD&cond=COVID-19&draw=2&rank=2',
    enrollmentDeadline: '2021-12-24',
    requiredDataElements: 105,
    status: 'Data Not Used',
  },
  2: {
    id: '2',
    title:
      'Development and validation of a prognostic model predicting symptomatic hemorrhagic transformation in acute ischemic stroke',
    purpose: 'Develop and validate a model to predict a patient’s risk of HT within 30 days of initial ischemic stroke',
    institutionName: 'Observational Health Data Sciences and Informatics (OHDSI)',
    institutionType: 'STATEHA',
    principleInvestigator: 'Qiong Wang',
    sponsor: 'Sun Yat-Sen University',
    irbContent:
      'The study protocol has been approved by the Sun Yat-Sen University Institutional Review Board (IRB) (2020-095). Any protocol modifications will be submitted for the IRB review and approval.',
    irbApprovalDate: '01/07/2020',
    irbApprovedBy: 'Sun Yat-Sen University',
    additionalInfoURL: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0226718',
    enrollmentDeadline: '2021-10-21',
    requiredDataElements: 108,
    status: 'Data Used',
  },
  3: {
    id: '3',
    title: 'COVID-19 Surveillance Based on Smart Wearable Device',
    purpose:
      "This is a prospective, multi-center cohort study. 200 subjects with COVID-19will be included . Wearable device's physiological parameters and clinical data will be continually collected , the investigators aim to explore whether using smart wearable devices is useful to early alerting deterioration of COVID-19.",
    institutionName: 'Peking University First Hospital',
    institutionType: 'UNIVERSITY',
    principleInvestigator: 'Jing Ma',
    sponsor: 'Peking University First Hospital',
    irbContent:
      'The study protocol has been approved by the Peking University First Hospital Institutional Review Board (IRB) (2020-055). Any protocol modifications will be submitted for the IRB review and approval.',
    irbApprovalDate: '03/10/2021',
    irbApprovedBy: 'Sun Yat-Sen University',
    additionalInfoURL: 'https://www.clinicaltrials.gov/ct2/show/NCT04459637?cond=COVID-19&draw=2&rank=4',
    enrollmentDeadline: '2021-10-01',
    requiredDataElements: 44,
    status: 'Data Not Used',
  },
  4: {
    id: '4',
    title: 'Analysis and classification of urinary stones',
    purpose:
      'Develop and validate the deep learning algorithm for the detection of urinary stone by using the CT images',
    institutionName: 'Medical Convergence Research Center, Wonkwang University',
    institutionType: 'UNIVERSITY',
    principleInvestigator: 'Si-Hyeong Noh',
    sponsor: 'Wonkwang University',
    irbContent:
      'The study protocol has been approved by the Wonkwang University Institutional Review Board (IRB) (2020-085). Any protocol modifications will be submitted for the IRB review and approval.',
    irbApprovalDate: '08/27/2020',
    irbApprovedBy: 'Wonkwang University',
    additionalInfoURL: 'https://link.springer.com/chapter/10.1007%2F978-3-030-55190-2_60',
    enrollmentDeadline: '2021-11-01',
    requiredDataElements: 60,
    status: 'Data Not Used',
  },
};

export default { baselinePreference, consent, study };
