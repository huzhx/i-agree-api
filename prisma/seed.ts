import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

const studies = [
  {
    title: 'Clinical-trial of COVID-19 Convalescent Plasma in Outpatients',
    purpose:
      'The overarching goal of this project is to confirm or refute the role of passive immunization as a safe and efficacious therapy in preventing the progression from mild to severe/critical COVID-19 illness and to understand the immunologic kinetics of anti-SARS-CoV-2 antibodies after passive immunization.The primary objective is to determine the efficacy and safety of a single dose of convalescent plasma (CP) for preventing the progression from mild to severe COVID-19 illness. The secondary objective is to characterize the immunologic response to CP administration.',
    piNames:
      'Clifton W Callaway, Valerie Durkalski-Mauldin, Frederick Korley, Sharon Yeatts, Robert Silbergleit, William Barsan',
    sponsor: 'Stanford University',
    irbContent:
      'The study protocol has been approved by the Stanford University Review Board (IRB) (2020-051). Any protocol modifications will be submitted for the IRB review and approval.',
    irbApprovalDate: '2020-08-11',
    irbApprovedBy: 'Stanford University',
    institutionName: 'Stanford University',
    institutionType: 'UNIVERSITY',
    requiredDataElements: 87,
    enrollmentDeadline: '2022-03-14',
    url: 'https://www.clinicaltrials.gov/ct2/show/NCT04355767?term=UCSD&cond=COVID-19&draw=2&rank=2',
  },
  {
    title:
      'Development and validation of a prognostic model predicting symptomatic hemorrhagic transformation in acute ischemic stroke',
    purpose: 'Develop and validate a model to predict a patient’s risk of HT within 30 days of initial ischemic stroke',
    piNames: 'Qiong Wang',
    sponsor: 'Sun Yat-Sen University',
    irbContent:
      'The study protocol has been approved by the Sun Yat-Sen University Institutional Review Board (IRB) (2020-095). Any protocol modifications will be submitted for the IRB review and approval.',
    irbApprovalDate: '2020-01-07',
    irbApprovedBy: 'Sun Yat-Sen University',
    institutionName: 'Observational Health Data Sciences and Informatics (OHDSI)',
    institutionType: 'STATEHA',
    requiredDataElements: 77,
    enrollmentDeadline: '2022-03-14',
    url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0226718',
  },
  {
    title: 'COVID-19 Surveillance Based on Smart Wearable Device',
    purpose:
      "This is a prospective, multi-center cohort study. 200 subjects with COVID-19will be included . Wearable device's physiological parameters and clinical data will be continually collected , the investigators aim to explore whether using smart wearable devices is useful to early alerting deterioration of COVID-19.",
    piNames: 'Jing Ma',
    sponsor: 'Peking University First Hospital',
    irbContent:
      'The study protocol has been approved by the Peking University First Hospital Institutional Review Board (IRB) (2020-055). Any protocol modifications will be submitted for the IRB review and approval.',
    irbApprovalDate: '2021-03-10',
    irbApprovedBy: 'Peking University First Hospital',
    institutionName: 'Peking University First Hospital',
    institutionType: 'HOSPITAL',
    requiredDataElements: 111,
    enrollmentDeadline: '2022-03-14',
    url: 'https://www.clinicaltrials.gov/ct2/show/NCT04459637?cond=COVID-19&draw=2&rank=4',
  },
  {
    title: 'Analysis and classification of urinary stones',
    purpose:
      'Develop and validate the deep learning algorithm for the detection of urinary stone by using the CT images',
    piNames: 'Si-Hyeong Noh',
    sponsor: 'Wonkwang University',
    irbContent:
      'The study protocol has been approved by the Wonkwang University Institutional Review Board (IRB) (2020-085). Any protocol modifications will be submitted for the IRB review and approval.',
    irbApprovalDate: '2020-08-27',
    irbApprovedBy: 'Wonkwang University',
    institutionName: 'Medical Convergence Research Center, Wonkwang University',
    institutionType: 'UNIVERSITY',
    requiredDataElements: 59,
    enrollmentDeadline: '2022-03-14',
    url: 'https://link.springer.com/chapter/10.1007%2F978-3-030-55190-2_60',
  },
];

async function main() {
  const studiesUpserted = studies.map((study) =>
    prisma.study.upsert({
      where: { url: study.url },
      update: {},
      create: {
        ...study,
        id: uuid(),
      },
    })
  );
  await Promise.all(studiesUpserted);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
