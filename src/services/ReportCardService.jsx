const rcConstants = {
  _NOT_APPLICABLE: "NA",
  ABSENT: "ABSENT",
  TYPE_1_MARK: "type-1-mark",
  TYPE_1_DEFAULT_ANNUAL: "type-1-annual",
  TYPE_1_GRADE: "type-1-grade",
  TYPE_2_MARK: "type-2-mark",
  TYPE_SKILL_ONLY: "skill_only",
  TYPE_3_SUB_SLILL: "type-3-sub_skill",
  DEFAULT_PERIODICTEST_HF: "periodic-test-hf",
  DEFAULT_PERIODICTEST_ANNUAL: "periodic-test-annual",
  _CO_SCHOLASTIC_NAME: "Co-scholastic",
  GRADE_BASED_SUBJECT_PACKAGES: ["Co-scholastic"],
  DEFAULT_REPORTCARD_PT_HF_TWO: "Periodic Test-II-Half Yearly",
  DEFAULT_REPORTCARD_PT_ANNUAL_TWO: "Periodic Test-II-Annual",
  REPORT_CARDS_PERIODIC_TEST: [
    "Periodic Test-Half Yearly",
    "Periodic Test-II-Half Yearly",
    "Periodic Test-Annual",
    "Periodic Test-II-Annual",
  ],
  DEFAULT_REPORTCARDS: [
    "Annual",
    "Half Yearly",
    "Periodic Test-Half Yearly",
    "Periodic Test-Annual",
    "Periodic Test-II-Half Yearly",
    "Periodic Test-II-Annual",
  ],
  DEFAULT_ANUAL_REPORTCARD: "Annual",
  DEFAULT_REPORTCARD_PT_ANNUAL: "Periodic Test-Annual",
  DEFAULT_REPORTCARD_PT_HF: "Periodic Test-Half Yearly",
  DEFAULT_PERIODICTEST_HF_TWO: "periodic-test-hf-2",
  DEFAULT_PERIODICTEST_ANNUAL_TWO: "periodic-test-annual-two",
  DEFAULT_HF_REPORTCARD: "Half Yearly",
  DEFAULT_REPORT_CARDS_FOR_YEAREND: ["Annual", "Half Yearly"],
  DEFAULT_YEAR_END: "default-year-end",
  EDUCORE_YEAR_END: "educore-year-end",
  EVALUATION_RC: ["Evaluation-3", "Evaluation-2", "Evaluation-1"],
  EVAL_ONE_RC: "Evaluation-1",
  EVAL_TWO_RC: "Evaluation-2",
  EVAL_THREE_RC: "Evaluation-3",
  ASSET_ME_RC_HALF: ["Term 1"],
  ASSET_ME_RC_HALF_NAME: "Term 1",
  ASSET_ME_RC_ANNUAL_NAME: "Term 2",
  ASSET_ME_RC_NAMES: ["Term 1", "Term 2"],
  TYPE_4_MARK: "type-4-mark",
  TYPE_4_ANNUAL: "type-4-annual",
  ASSET_CONSOLIDATED: "term1-term2",
  KG_CARDS: ["KG-Term-1", "KG-Term-2", "KG-Term-3"],
  KB_CARDS: ["KB-Term-1", "KB-Term-2", "KB-Term-3"],
  MONTESSORY_CARDS: [
    "MONTESSORI-Term-I",
    "MONTESSORI-Term-II",
    "MONTESSORI-Term-III",
  ],
  KG_TERM: "kg-term",
  KG_TERMS: "kg-terms",
  KB_TERMS: "kb-terms",
  MONTESSORY_TERMS: "montessory",
  MONTESSORY_CONSOLIDATED: "montessory-consolidated",
  KG_CONSOLIDATED: "kg-consolidated",
  HIGHER_SECONDARY_REPORT: "hss-template",
  CBSE_HSHF: "cbse_hss",
  NON_FINAL_SCHOOL_IDS: ["m2LMtqaESFZf6xDE8", "ps4vyLJhQvPZjfxaH"],
  MEP_STATIC_SCHOOL_IDS: ["ps4vyLJhQvPZjfxaH"],
};
function switchTemplate(template) {
  console.log(template);
  let fields = [];
  switch (template) {
    case rcConstants.TYPE_1_MARK:
      fields = [];
      break;
    case rcConstants.TYPE_1_GRADE:
      fields = [];
      break;
    case rcConstants.TYPE_2_MARK:
      fields = [];
      break;
    case rcConstants.TYPE_3_SUB_SLILL:
      fields = [];
      break;
    case rcConstants.TYPE_1_DEFAULT_ANNUAL:
      fields = [];
      break;
    case rcConstants.DEFAULT_PERIODICTEST_HF:
      fields = [
        {
          label: "General Remarks",
          field: "attendance_term1",
        },
        {
          label: "Attendance",
          field: "attendance",
        },
      ];
      break;
    case rcConstants.DEFAULT_PERIODICTEST_ANNUAL:
      fields = [
        {
          label: "General Remarks",
          field: "term_remarks",
        },
        {
          label: "Attendance",
          field: "attendance",
        },
      ];
      break;
    case rcConstants.DEFAULT_YEAR_END:
      fields = [
        {
          label: "Attendance",
          field: "attendance",
        },
      ];
      break;
    case rcConstants.EDUCORE_YEAR_END:
      fields = [
        {
          label: "Attendance",
          field: "attendance",
        },
      ];
      break;
    case rcConstants.TYPE_4_MARK:
      fields = [
        {
          label: "Attendance",
          field: "attendance",
        },
      ];
      break;
    case rcConstants.TYPE_4_ANNUAL:
      fields = [
        {
          label: "Attendance",
          field: "attendance",
        },
      ];
      break;
    case rcConstants.ASSET_CONSOLIDATED:
      fields = [
        {
          label: "Attendance",
          field: "attendance",
        },
      ];
      break;
    case rcConstants.DEFAULT_PERIODICTEST_HF_TWO:
      fields = [
        {
          label: "General Remarks",
          field: "term_remarks",
        },
        {
          label: "Attendance",
          field: "attendance",
        },
      ];
      break;
    case rcConstants.DEFAULT_PERIODICTEST_ANNUAL_TWO:
      fields = [
        {
          label: "Attendance",
          field: "attendance",
        },
      ];
      break;
    case rcConstants.KG_TERMS:
      fields = [
        {
          label: "General Remarks",
          field: "term_remarks",
        },
        {
          label: "Attendance",
          field: "attendance",
        },
      ];
      break;
    case rcConstants.KG_CONSOLIDATED:
      fields = [];
      break;
    case rcConstants.KB_TERMS:
      fields = [
        {
          label: "Attendance",
          field: "attendance",
        },
      ];
      break;
    case rcConstants.HIGHER_SECONDARY_REPORT:
      fields = [];
      break;
    case rcConstants.CBSE_HSHF:
      fields = [];
      break;
    case "term1halfyearly":
      fields = [
        {
          label: "Attendance",
          field: "attendance",
        },
      ];
      break;
    case "grade-9-annual":
      fields = [
        {
          label: "Attendance",
          field: "attendance",
        },
      ];
      break;
    case "grade-1_8-annual":
      fields = [
        {
          label: "Attendance",
          field: "attendance",
        },
      ];
      break;
    case "kb_final":
      fields = [];
      break;
    case "annual_cbse_hss":
      fields = [
        {
          label: "RESULT",
          field: "StdResult",
        },
        {
          label: "Attendance",
          field: "attendance_term1",
        },
      ];
      break;
    case "term-annual-only":
      fields = [];
      break;
    case "kb_hss_annual":
      fields = [];
      break;
    case rcConstants.MONTESSORY_TERMS:
      fields = [];
      break;
    case rcConstants.MONTESSORY_CONSOLIDATED:
      fields = [];
      break;
    case "periodic-test-hf-kb":
      fields = [
        {
          label: "Attendance",
          field: "attendance",
        },
      ];
      break;
    case "hf1-exam":
      fields = [
        {
          label: "Working Days",
          field: "working_days",
        },
        {
          label: "Days Attended",
          field: "days_attended",
        },
        {
          label: "House",
          field: "house",
        },
        {
          label: "Height",
          field: "height",
        },
        {
          label: "Weight",
          field: "weight",
        },
        {
          label: "BMI",
          field: "bmi",
        },
      ];
      break;
    case "type5_9_10_grade_term1":
      fields = [
        {
          label: "RESULT",
          field: "StdResult",
        },
        {
          label: "Promoted to Grade",
          field: "StdPromotGrade",
        },
        {
          label: "Date",
          field: "StdReportDate",
        },
      ];
      break;
    case "type5_KB_10_grade_term2":
      fields = [
        {
          label: "RESULT",
          field: "StdResult",
        },
        {
          label: "Promoted to Grade",
          field: "StdPromotGrade",
        },
        {
          label: "Term I Attendance",
          field: "attendanceKb10_term1",
        },
        {
          label: "Term II Attendance",
          field: "attendanceKb10_term2",
        },
        {
          label: "Date",
          field: "StdReportDate",
        },
      ];
      break;
    case "type5_6_8_grade_term1":
      fields = [
        {
          label: "RESULT",
          field: "StdResult",
        },
        {
          label: "Promoted to Grade",
          field: "StdPromotGrade",
        },
        {
          label: "Term I Attendance",
          field: "attendance68_term1",
        },
        {
          label: "Term II Attendance",
          field: "attendance68_term2",
        },
        {
          label: "Date",
          field: "StdReportDate",
        },
      ];
      break;
    case "type5_6_7_grade_term1":
      fields = [
        {
          label: "Teacher's Remarks",
          field: "term_remarks1",
        },
      ];
      break;

    case "type6_6_7_grade_term1":
      fields = [
        {
          label: "Working Days",
          field: "working_days",
        },
        {
          label: "Present Days",
          field: "days_attended",
        },
        {
          label: "Attendance %",
          field: "attendance_term1",
        },
        {
          label: "Teacher's Remarks",
          field: "term_remarks1",
        },
      ];
      break;
    case "type6_3_5_grade_term1":
      fields = [
        {
          label: "Teacher's Remarks",
          field: "term_remarks1",
        },
      ];
      break;

    case "type5_3_5_grade_term1":
      fields = [
        {
          label: "Teacher's Remarks",
          field: "term_remarks1",
        },
      ];
      break;
    case "type5_8_grade_term1":
      fields = [
        {
          label: "Teacher's Remarks",
          field: "term_remarks1",
        },
      ];
      break;
    case "type5_1_5_grade_term2":
      fields = [];
      break;
    case "type6_1_2_grade_term1":
      fields = [];
      break;
    case "type5_1_2_grade_term1":
      fields = [];
      break;
    case "type5_KB_8_9_grade_term3":
      fields = [];
      break;
    case "type_6_model_exam_1":
      fields = [];
      break;
    case "type_6_model_exam_1_nineten":
      fields = [];
      break;
    case "type_6_model_exam_2_nineten":
      fields = [];
      break;
    case "type_6_model_exam_2":
      fields = [];
      break;
    case "type_6_model_annualexam_2":
      fields = [];
      break;
    case "calicut_annual":
      fields = [];
      break;
    case "kg-thematicterms":
      fields = [];
      break;
    case "type9_term1_hf":
      fields = [];
      break;
    case "type9_cbse_pt1":
      fields = [];
      break;
    case "type9_grade12term2_ae":
      fields = [];
      break;
    case "type9_kb_unit_test1":
      fields = [];
      break;
    case "type9_kbterm3":
      fields = [];
      break;
    case "type12_termcbse":
      fields = [];
      break;
    case "type12_ninetentermcbse":
      fields = [];
      break;
    case "elt-report":
      fields = [];
      break;
    case "type20_KB_10_grade_term1":
      fields = [];
      break;
    case "type20_termcbse":
      fields = [];
      break;
    case "type20_termcbse18":
      fields = [];
      break;
    case "type20_KB_10_grade_term2":
      fields = [];
      break;
    case "type20_term2cbse":
      fields = [];
      break;
    case "type20_term2cbse18":
      fields = [
        {
          label: "Term 2 Remarks",
          field: "term_remarks2",
        },
        {
          label: "Promoted To",
          field: "promoted_to",
        },
        {
          label: "Term 2 Attendance",
          field: "attendance_term2",
        },
      ];
      break;
    case "type8to10_termcbse":
      fields = [];
      break;
    case "typetermcbse_8to10":
      fields = [];
      break;
    case "type6to7_alncbse":
      fields = [];
      break;
    case "type6to7_tcscbse":
      fields = [];
      break;
    case "type3to5_tcscbse":
      fields = [];
      break;
    case "type3to5_alncbse":
      fields = [];
      break;
    case "type1to2_tcscbse":
      fields = [];
      break;
    case "type7_1_2_grade_term1":
      fields = [];
      break;
    case "type30_KB_8_9_grade_term3":
      fields = [];
      break;
    case "type10_KB_grade_term1":
      fields = [];
      break;
    case "type10_KB_grade11_12_term1":
      fields = [];
      break;
    case "type02grade_11_science":
      fields = [];
      break;
    case "type02grade_12_science":
      fields = [
        {
          label: "Result",
          field: "term_remarks1",
        },
        {
          label: "Term I Attendance",
          field: "attendance_term1",
        },
        {
          label: "Term II Attendance",
          field: "attendance_term2",
        },
        {
          label: "Promoted to Grade",
          field: "promoted_to",
        },
      ];
      break;
  }
  return fields;
}
const ReportCardService = {
  template: null,
  getExtraInputs: (report = {}) => {
    if (report.template) {
      return switchTemplate(report.template);
    }
  },
};
export default ReportCardService;
