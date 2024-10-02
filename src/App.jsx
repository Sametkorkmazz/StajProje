import { useState } from "react";
import SurveyButton from "./SurveyButton";
import SurveyPopup from "./SurveyPopup";
import SurveyMenu from "./SurveyMenu";
import { themeOptions } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import AnswerSurveyPopup from "./AnswerSurveyPopup";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SurveyDetailsPieChart from "./SurveyDetailsPieChart.jsx";

let surveyController = new AbortController();

function App() {
  const [surveyHover, setSurveyHover] = useState(false);
  const [buttonClicked, setButton] = useState(false);
  const [openSurveyCreation, set_OpenSurveyCreation] = useState(false);
  const [surveyArray, setSurveyArray] = useState([]);
  const [openSurveyAnswer, set_OpenSurveyAnswer] = useState(false);
  const [feedbackOpen, set_feedbackOpen] = useState({
    open: false,
    message: "",
    severity: "",
    color: "",
  });

  const feedBack = (feedbackValues) => {
    const { message, severity, color } = feedbackValues;
    return (
      <Snackbar
        open={true}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          set_feedbackOpen((prev) => ({ ...prev, open: false }));
        }}
        key={"top" + "center"}
      >
        <Alert
          color={color}
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }
            set_feedbackOpen((prev) => ({ ...prev, open: false }));
          }}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    );
  };

  async function postSurvey(survey) {
    surveyController.abort();
    surveyController = new AbortController();
    console.log(survey);
    var formattedSurvey = {
      surveyName: survey.surveyTitle,
      creatorId: survey.ownerId,
      surveyInfo: survey.surveyText,
      teamId: "1234",
      onlyForTeam: true,
      creationTime: new Date().toISOString().split("T")[0],
      deadline: survey.expireDate,
      questionDTOList: [
        survey.questions.map((question) => ({
          questionText: question.questionName,
          questionType:
            question.type === "seçenek"
              ? "MULTIPLECHOICE"
              : question.type === "metin"
                ? "OPENENDED"
                : "RATING",
          ratingMaxValue: question.options.length,
          choices: [
            question.options.map((option) => ({ choiceText: option.name })),
          ],
        })),
      ],
    };
    console.log(formattedSurvey);

    set_feedbackOpen({
      open: true,
      message: "Anket oluşturuldu.",
      severity: "success",
      color: "primary",
    });
  }

  function handleOver() {
    setSurveyHover(true);
  }

  function handleOut() {
    if (!buttonClicked) {
      setSurveyHover(false);
    }
  }

  function addSurvey(survey) {
    setSurveyArray((prev) => [...prev, survey]);
  }

  function updateSurvey(survey, index) {
    var temp = surveyArray.map((survey) => survey);
    temp[index] = survey;
    setSurveyArray([...temp]);
    console.log(surveyArray);
  }

  return (
    <ThemeProvider theme={themeOptions}>
      <div className="">
        {feedbackOpen.open && feedBack(feedbackOpen)}
        {openSurveyCreation ? (
          <SurveyPopup
            postSurvey={postSurvey}
            addSurvey={addSurvey}
            setOpenSurveyCreation={set_OpenSurveyCreation}
          />
        ) : (
          openSurveyAnswer && (
            <AnswerSurveyPopup
              updateSurvey={updateSurvey}
              survey={surveyArray}
              setAnswerSurvey={set_OpenSurveyAnswer}
            ></AnswerSurveyPopup>
          )
        )}
        <div
          style={{
            opacity: openSurveyCreation || openSurveyAnswer ? "20%" : "100%",
            pointerEvents:
              openSurveyCreation || openSurveyAnswer ? "none" : "auto",
          }}
          className="d-flex flex-column"
        >
          <div className="d-flex justify-content-end pe-5">
            <SurveyButton
              handleOut={handleOut}
              handleOver={handleOver}
              setButton={setButton}
              surveyHover={surveyHover}
            ></SurveyButton>
          </div>

          {buttonClicked && (
            <div className="d-flex justify-content-end">
              <SurveyMenu
                set_OpenSurveyAnswer={set_OpenSurveyAnswer}
                set_OpenSurveyCreation={set_OpenSurveyCreation}
              ></SurveyMenu>
            </div>
          )}
        </div>
        <SurveyDetailsPieChart></SurveyDetailsPieChart>
      </div>
    </ThemeProvider>
  );
}

export default App;
