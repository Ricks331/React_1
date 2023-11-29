import React, { useState } from "react";
import ReportCardService from "services/ReportCardService";
import { Box, TextField, Card, CardContent, Button } from "@mui/material";
const ExtraInfo = (props) => {
  const [childData, setChildData] = useState("");
  const result = props.apiRes;
  let inputs = ReportCardService.getExtraInputs(
    props.apiRes.report_card_template
  );

  inputs.map((item, index) => {
    if (result.extra_info && result.extra_info[item.field]) {
      return (item.value = result.extra_info[item.field]);
    } else {
      return (item.value = result[item.field]);
    }
  });
  const [extra_inputs, stateExtraInputs] = useState(inputs || []);
  const handleButtonClick = () => {
    let requestBody = {};
    let extra_info = {};
    requestBody["term_remarks"] = rootScope.term_remarks;
    requestBody["attendance"] = rootScope.attendance;
    requestBody["term_remarks1"] = rootScope.term_remarks1;
    requestBody["promoted_to"] = rootScope.promoted_to;
    if (rootScope.house) {
      extra_info.house = rootScope.house;
    }
    if (rootScope.height) {
      extra_info.height = rootScope.height;
    }
    if (rootScope.weight) {
      extra_info.weight = rootScope.weight;
    }
    if (rootScope.bmi) {
      extra_info.bmi = rootScope.bmi;
    }
    if (rootScope.working_days) {
      extra_info.working_days = rootScope.working_days;
    }
    if (rootScope.selectedLevel) {
      extra_info.selectedLevel = rootScope.selectedLevel;
    }
    if (rootScope.days_attended) {
      extra_info.days_attended = rootScope.days_attended;
    }
    if (rootScope.attendance_term1) {
      extra_info.attendance_term1 = rootScope.attendance_term1;
    }
    if (rootScope.attitudeselction) {
      extra_info.attitudeselction = rootScope.attitudeselction;
    }
    if (rootScope.lifeskillselction) {
      extra_info.lifeskillselction = rootScope.lifeskillselction;
    }

    if (rootScope.attendance_term2) {
      extra_info.attendance_term2 = rootScope.attendance_term2;
    }
    if (rootScope.attendance68_term1) {
      extra_info.attendance68_term1 = rootScope.attendance68_term1;
    }
    if (rootScope.lifeskillselection) {
      extra_info.lifeskillselection = rootScope.lifeskillselection;
    }
    if (rootScope.attitudeselection) {
      extra_info.attitudeselection = rootScope.attitudeselection;
    }
    if (rootScope.attitudeDataByIndex) {
      extra_info.attitudeDataByIndex = rootScope.attitudeDataByIndex;
    }
    if (rootScope.lifeskillDataByIndex) {
      extra_info.lifeskillDataByIndex = rootScope.lifeskillDataByIndex;
    }
    if (rootScope.attendance68_term2) {
      extra_info.attendance68_term2 = rootScope.attendance68_term2;
    }
    if (rootScope.attendanceKb89_term1) {
      extra_info.attendanceKb89_term1 = rootScope.attendanceKb89_term1;
    }
    if (rootScope.attendanceKb89_term2) {
      extra_info.attendanceKb89_term2 = rootScope.attendanceKb89_term2;
    }
    if (rootScope.attendanceKb89_term3) {
      extra_info.attendanceKb89_term3 = rootScope.attendanceKb89_term3;
    }
    if (rootScope.attendanceKb10_term1) {
      extra_info.attendanceKb10_term1 = rootScope.attendanceKb10_term1;
    }
    if (rootScope.attendanceKb10_term2) {
      extra_info.attendanceKb10_term2 = rootScope.attendanceKb10_term2;
    }
    if (rootScope.StdResult) {
      extra_info.StdResult = rootScope.StdResult;
    }
    if (rootScope.StdPromotGrade) {
      extra_info.StdPromotGrade = rootScope.StdPromotGrade;
    }
    if (rootScope.StdReportDate) {
      extra_info.StdReportDate = rootScope.StdReportDate;
    }
    if (rootScope.promoted_to) {
      extra_info.promoted_to = rootScope.promoted_to;
    }
    if (rootScope.term_remarks1) {
      extra_info.term_remarks1 = rootScope.term_remarks1;
    }
    if (rootScope.term_remarks2) {
      extra_info.term_remarks2 = rootScope.term_remarks2;
    }
    if (rootScope.attendancetenKb10_term1) {
      extra_info.attendancetenKb10_term1 = rootScope.attendancetenKb10_term1;
    }
    if (rootScope.attendancetenKb10_term2) {
      extra_info.attendancetenKb10_term2 = rootScope.attendancetenKb10_term2;
    }
    requestBody["extra_info"] = extra_info;
    // Simulate data being generated in the child component
    let data = requestBody;

    // Call the parent's callback function to send data
    props.sendDataToParent(data);

    // Optionally, update the child's state
    setChildData(data);
  };
  const rootScope = {};
  function resetInputs() {
    rootScope.attendance = undefined;
    rootScope.house = undefined;
    rootScope.height = undefined;
    rootScope.weight = undefined;
    rootScope.bmi = undefined;
    rootScope.working_days = undefined;
    rootScope.selectedLevel = undefined;

    rootScope.days_attended = undefined;
    rootScope.term_remarks = undefined;
    rootScope.attendance_term1 = undefined;

    rootScope.attendance_term2 = undefined;
    rootScope.lifeskillselection = undefined;
    rootScope.attitudeselection = undefined;
    rootScope.attitudeDataByIndex = undefined;
    rootScope.lifeskillDataByIndex = undefined;
    rootScope.attendance68_term1 = undefined;
    rootScope.attendance68_term2 = undefined;
    rootScope.attendanceKb89_term1 = undefined;
    rootScope.attendanceKb89_term2 = undefined;
    rootScope.attendanceKb89_term3 = undefined;
    rootScope.attendanceKb10_term1 = undefined;
    rootScope.attendanceKb10_term2 = undefined;
    rootScope.StdResult = undefined;
    rootScope.StdPromotGrade = undefined;
    rootScope.StdReportDate = undefined;
    rootScope.term_remarks1 = undefined;
    rootScope.promoted_to = undefined;
    rootScope.term_remarks2 = undefined;
    rootScope.attitudeselction = undefined;
    rootScope.lifeskillselction = undefined;
    rootScope.attendancetenKb10_term1 = undefined;
    rootScope.attendancetenKb10_term2 = undefined;
  }
  resetInputs();
  function setValues(result = {}) {
    let attendanceObject = extra_inputs.find(
      (item) => item.field === "attendance"
    );
    rootScope.attendance =
      attendanceObject && attendanceObject.value
        ? attendanceObject.value
        : result.attendance;

    let remarkObject = extra_inputs.find(
      (item) => item.field === "term_remarks"
    );
    rootScope.term_remarks =
      remarkObject && remarkObject.value
        ? remarkObject.value
        : result.term_remarks;

    if (result.extra_info) {
      let houseObject = extra_inputs.find((item) => item.field === "house");
      rootScope.house =
        houseObject && houseObject.value
          ? houseObject.value
          : result.extra_info.house;

      let heightObject = extra_inputs.find((item) => item.field === "height");
      rootScope.height =
        heightObject && heightObject.value
          ? heightObject.value
          : result.extra_info.height;

      let weightObject = extra_inputs.find((item) => item.field === "weight");
      rootScope.weight =
        weightObject && weightObject.value
          ? weightObject.value
          : result.extra_info.weight;

      let bmiObject = extra_inputs.find((item) => item.field === "bmi");
      rootScope.bmi =
        bmiObject && bmiObject.value ? bmiObject.value : result.extra_info.bmi;

      let daysObject = extra_inputs.find(
        (item) => item.field === "working_days"
      );
      rootScope.working_days =
        daysObject && daysObject.value
          ? daysObject.value
          : result.extra_info.working_days;

      let attendedObject = extra_inputs.find(
        (item) => item.field === "days_attended"
      );
      rootScope.days_attended =
        attendedObject && attendedObject.value
          ? attendedObject.value
          : result.extra_info.days_attended;

      let term1Object = extra_inputs.find(
        (item) => item.field === "attendance_term1"
      );
      rootScope.attendance_term1 =
        term1Object && term1Object.value
          ? term1Object.value
          : result.extra_info.attendance_term1;

      let term2Object = extra_inputs.find(
        (item) => item.field === "attendance_term2"
      );
      rootScope.attendance_term2 =
        term2Object && term2Object.value
          ? term2Object.value
          : result.extra_info.attendance_term2;

      let attendance68term1Object = extra_inputs.find(
        (item) => item.field === "attendance68_term1"
      );
      rootScope.attendance68_term1 =
        attendance68term1Object && attendance68term1Object.value
          ? attendance68term1Object.value
          : result.extra_info.attendance68_term1;

      let attendance68term2Object = extra_inputs.find(
        (item) => item.field === "attendance68_term2"
      );
      rootScope.attendance68_term2 =
        attendance68term2Object && attendance68term2Object.value
          ? attendance68term2Object.value
          : result.extra_info.attendance68_term2;

      let Kb89term1Object = extra_inputs.find(
        (item) => item.field === "attendanceKb89_term1"
      );
      rootScope.attendanceKb89_term1 =
        Kb89term1Object && Kb89term1Object.value
          ? Kb89term1Object.value
          : result.extra_info.attendanceKb89_term1;

      let Kb89term2Object = extra_inputs.find(
        (item) => item.field === "attendanceKb89_term2"
      );
      rootScope.attendanceKb89_term2 =
        Kb89term2Object && Kb89term2Object.value
          ? Kb89term2Object.value
          : result.extra_info.attendanceKb89_term2;

      let Kb89term3Object = extra_inputs.find(
        (item) => item.field === "attendanceKb89_term3"
      );
      rootScope.attendanceKb89_term3 =
        Kb89term3Object && Kb89term3Object.value
          ? Kb89term3Object.value
          : result.extra_info.attendanceKb89_term3;

      let Kb10term1Object = extra_inputs.find(
        (item) => item.field === "attendanceKb10_term1"
      );
      rootScope.attendanceKb10_term1 =
        Kb10term1Object && Kb10term1Object.value
          ? Kb10term1Object.value
          : result.extra_info.attendanceKb10_term1;

      let Kb10term2Object = extra_inputs.find(
        (item) => item.field === "attendanceKb10_term2"
      );
      rootScope.attendanceKb10_term2 =
        Kb10term2Object && Kb10term2Object.value
          ? Kb10term2Object.value
          : result.extra_info.attendanceKb10_term2;

      let resultObject = extra_inputs.find(
        (item) => item.field === "StdResult"
      );
      rootScope.StdResult =
        resultObject && resultObject.value
          ? resultObject.value
          : result.extra_info.StdResult;

      let promotObject = extra_inputs.find(
        (item) => item.field === "promoted_to"
      );
      rootScope.StdPromotGrade =
        promotObject && promotObject.value
          ? promotObject.value
          : result.extra_info.StdPromotGrade;

      let stdreportObject = extra_inputs.find(
        (item) => item.field === "StdReportDate"
      );
      rootScope.StdReportDate =
        stdreportObject && stdreportObject.value
          ? stdreportObject.value
          : result.extra_info.StdReportDate;

      let remark1Object = extra_inputs.find(
        (item) => item.field === "term_remarks1"
      );
      rootScope.term_remarks1 =
        remark1Object && remark1Object.value
          ? remark1Object.value
          : result.extra_info.term_remarks1;

      let toObject = extra_inputs.find((item) => item.field === "promoted_to");
      rootScope.promoted_to =
        toObject && toObject.value
          ? toObject.value
          : result.extra_info.promoted_to;

      let remark2Object = extra_inputs.find(
        (item) => item.field === "term_remarks2"
      );
      rootScope.term_remarks2 =
        remark2Object && remark2Object.value
          ? remark2Object.value
          : result.extra_info.term_remarks2;

      let selctionObject = extra_inputs.find(
        (item) => item.field === "attitudeselction"
      );
      rootScope.attitudeselction =
        selctionObject && selctionObject.value
          ? selctionObject.value
          : result.extra_info.attitudeselction;

      let skillObject = extra_inputs.find(
        (item) => item.field === "lifeskillselction"
      );
      rootScope.lifeskillselction =
        skillObject && skillObject.value
          ? skillObject.value
          : result.extra_info.lifeskillselction;

      let lifeskillObject = extra_inputs.find(
        (item) => item.field === "lifeskillselction"
      );
      rootScope.lifeskillselection =
        lifeskillObject && lifeskillObject.value
          ? lifeskillObject.value
          : result.extra_info.lifeskillselection;

      let attitudeObject = extra_inputs.find(
        (item) => item.field === "attitudeselection"
      );
      rootScope.attitudeselection =
        attitudeObject && attitudeObject.value
          ? attitudeObject.value
          : result.extra_info.attitudeselection;

      let dataObject = extra_inputs.find(
        (item) => item.field === "attitudeDataByIndex"
      );
      rootScope.attitudeDataByIndex =
        dataObject && dataObject.value
          ? dataObject.value
          : result.extra_info.attitudeDataByIndex;

      let skilldataObject = extra_inputs.find(
        (item) => item.field === "lifeskillDataByIndex"
      );
      rootScope.lifeskillDataByIndex =
        skilldataObject && skilldataObject.value
          ? skilldataObject.value
          : result.extra_info.lifeskillDataByIndex;

      let tenKb10Object = extra_inputs.find(
        (item) => item.field === "attendancetenKb10_term1"
      );
      rootScope.attendancetenKb10_term1 =
        tenKb10Object && tenKb10Object.value
          ? tenKb10Object.value
          : result.extra_info.attendancetenKb10_term1;

      let tenKb10term2Object = extra_inputs.find(
        (item) => item.field === "attendancetenKb10_term2"
      );
      rootScope.attendancetenKb10_term2 =
        tenKb10term2Object && tenKb10term2Object.value
          ? tenKb10term2Object.value
          : result.extra_info.attendancetenKb10_term2;
    }
    let keys = Object.keys(rootScope);
    for (let index = 0; index < keys.length; index++) {
      let element = keys[index];
    }
  }
  setValues(result);
  let setTextValue = (box, value) => {
    rootScope[box.field] = value;
  };
  const updateState = (e, index) => {
    const newArray = extra_inputs.map((item, i) => {
      if (index === i) {
        {
          item.value = e.target.value;
        }
        return { ...item, [e.target.name]: e.target.value };
      } else {
        return item;
      }
    });
    stateExtraInputs(newArray);
  };
  return (
    <Card className="card_class" sx={{ borderRadius: "20px !important" }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
      >
        <CardContent>
          {extra_inputs && extra_inputs.length
            ? extra_inputs.map((box, index) => (
                <TextField
                  id={index + "_id"}
                  label={box.label}
                  key={index}
                  name={box.field}
                  value={box.value && box.value ? box.value : ""}
                  onChange={(e) => updateState(e, index)}
                  //   onChange={event => {
                  //     setTextValue(box, event.target.value);
                  //   }}
                />
              ))
            : ""}
          <Button
            onClick={handleButtonClick}
            sx={{
              marginTop: "20px",
            }}
            variant="contained"
          >
            Save
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ExtraInfo;
