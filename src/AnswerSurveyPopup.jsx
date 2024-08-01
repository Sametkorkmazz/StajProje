import React, { useEffect } from "react";
import Grow from '@mui/material/Grow';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import QuestionType from "./QuestionType";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import Question from "./Question";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Collapsible from "react-collapsible";
import AnswerQuestionBody from "./AnswerQuestionBody";
import { useState } from "react";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from "@mui/material/Box";
import { backdropClasses } from "@mui/material";
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SurveyResults from "./SurveyResults";
function AnswerSurveyPopup(props) {

    const ColoredButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText("#9C27B0"),
        backgroundColor: "#A182FA",
        '&:hover': {
            backgroundColor: "#6342CB",
        },
    }));
    for (let i = 0; i < props.survey.length; i++) {
        props.survey["index"] = i;
    }
    var sortedSurveys = props.survey.map(item => item);
    sortedSurveys.sort((a, b) => new Date(a.expireDate) - new Date(b.expireDate))


    const [surveyResults, set_surveyResults] = useState("cevapla");

    const [focusedSurveyIndex, set_focusedSurveyIndex] = useState(0);
    const [originalIndex, set_originalIndex] = useState(0);

    var questionAmount = sortedSurveys.length > 0 ? sortedSurveys[focusedSurveyIndex].questions.map((item) => false) : []

    const [answeredQuestionArray, set_answeredQuestionArray] = useState(questionAmount)
    const [cevaplayanSicil, set_cevaplayanSicil] = useState("");
    const [focusSurvey, set_focusSurvey] = useState(false);
    const [finishSurveyDialog, set_finishSurveyDialog] = useState(false);
    const [dataSet, set_dataSet] = useState([]);
    function createResultGraphs() {
        if (sortedSurveys.length !== 0) {

            var allAnswers = [];
            sortedSurveys[focusedSurveyIndex].questions.forEach((question, index) => {
                var temp = []
                question.options.forEach((option, index) => {

                    temp.push({ optionName: option.name, answeredAmount: option.answers.length })
                })
                allAnswers.push(temp)


            })

            set_dataSet([...allAnswers])
        }
    }

    function toLocalTime(date) {
        var local = date.split("-");
        return `${local[2]}-${local[1]}-${local[0]}`
    }
    function calculateRemainingDays(surveyDate) {
        return new Date(new Date(surveyDate) - new Date()).getDate();

    }

    function handleFocus(index) {
        set_focusedSurveyIndex(index)
        set_focusSurvey(true);
    }
    function handleFormAction(event) {
        event.preventDefault();
        if (answeredQuestionArray.filter(c => c).length !== questionAmount.length) {

            set_finishSurveyDialog(true);

        }
        else {
            set_cevaplayanSicil("")
            set_answeredQuestionArray(questionAmount)
            sendAnswers();
        }

    }
    function sendAnswers() {
        var formData = $('#answer-survey-form').serializeArray();
        console.log(formData);
        var modifiedSurvey = sortedSurveys[focusedSurveyIndex];
        for (let index = 0; index < formData.length - 1; index++) {
            var values = formData[index].name.split(" ");
            var questionIndex = parseInt(values[0])
            var answer = formData[index].value;
            var modifiedQuestion = modifiedSurvey.questions[questionIndex]
            if (modifiedQuestion.type !== "metin") {
                let choiceIndex = modifiedQuestion.options.findIndex((item) => item.name === answer)

                modifiedQuestion.options[choiceIndex].answers.push(formData[formData.length - 1].value)
            }

            modifiedSurvey.questions[questionIndex] = modifiedQuestion
        }
        props.updateSurvey(modifiedSurvey, sortedSurveys[focusedSurveyIndex].index);
        set_focusSurvey(false);


    }
    function handleAnsweredQuestionAmount(id, value) {
        var newArray = answeredQuestionArray.map((item) => item)
        newArray[id] = value;
        set_answeredQuestionArray([...newArray])


    }
    return <Grow in={true}>

        <div
            className="flex-container"  >
            <Dialog open={finishSurveyDialog}
                onClose={() => set_finishSurveyDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle >
                    {"Cevaplanmamış sorular var. Anketi cevaplamayı bitirmek ister misiniz?"}
                </DialogTitle>
                <DialogContent>

                    <DialogContentText>
                        Cevapladığınız Sorular {answeredQuestionArray.filter(c => c).length}/{questionAmount.length}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button style={{ textTransform: "none" }} onClick={() => set_finishSurveyDialog(false)}>Geri dön</Button>
                    <Button style={{ textTransform: "none" }} onClick={() => {

                        sendAnswers();
                        set_finishSurveyDialog(false)

                    }}
                    >Evet</Button>
                </DialogActions>

            </Dialog>
            <div className="create-survey d-flex flex-column p-4 rounded" style={{ flexShrink: surveyResults === "sonuçlar" ? "0" : "1" }} >
                <div className="d-flex" >
                    <Typography className="me-auto" variant="h3" color={"white"} gutterBottom>
                        {focusSurvey ? sortedSurveys[focusedSurveyIndex].surveyTitle : "Anket Cevapla"}
                    </Typography>
                    <div style={{ position: "relative", bottom: "10px", left: "10px" }}>
                        <Button onClick={() => props.setAnswerSurvey(false)} className="justify-content-center">

                            <CloseIcon style={{ color: "white" }} ></CloseIcon>
                        </Button>
                    </div>

                </div>

                {focusSurvey && <div className="d-flex justify-content-between">
                    <Button style={{ fontSize: "medium", color: "white", textTransform: "none" }} onClick={() => {
                        set_focusSurvey(false)
                        set_answeredQuestionArray(questionAmount)
                        set_cevaplayanSicil("");
                        set_surveyResults("cevapla")
                    }} className="justify-content-start">

                        <ArrowBackIcon className="me-1" style={{ color: "white" }}></ArrowBackIcon>
                        Geri
                    </Button>
                    <Typography style={{ fontWeight: "200" }} variant="h6" color={"white"} gutterBottom>
                        {new Date() < new Date(sortedSurveys[focusedSurveyIndex].expireDate) ? `Anketin bitmesine son ${calculateRemainingDays(sortedSurveys[focusedSurveyIndex].expireDate) + 1} gün.` : "Anket bitmiştir."}

                    </Typography>
                </div>}

                <div className="px-3 d-flex gap-3 flex-column mt-2" style={{ flex: "1", overflowY: "auto" }}>


                    {sortedSurveys.length === 0 ? <Typography variant="h5" color={"white"} gutterBottom>
                        Henüz Anket Oluşturulmamış
                    </Typography>
                        : !focusSurvey ? sortedSurveys.map((survey, index) => {

                            var localTime = toLocalTime(survey.expireDate)

                            var remaningDays = calculateRemainingDays(survey.expireDate)
                            return <div key={index} className='d-flex flex-column rounded' style={{ backgroundColor: "#A182FA" }} >
                                <ColoredButton onClick={() => handleFocus(index)} variant='contained' style={{
                                    textTransform: "none", flex: "1"
                                }}
                                    sx={{
                                        backgroundColor: remaningDays > 0 ? "#A182FA" : "#703579"
                                    }}
                                    disableElevation className='align-items-start gap-1  d-flex flex-column' >
                                    <Typography style={{ fontWeight: "200" }} className="col-12 text-end" variant="h5" color={"white"} gutterBottom>
                                        {remaningDays > 0 ? `Anketin bitmesine son ${remaningDays + 1} gün.` : "Anket bitmiştir."}
                                    </Typography>
                                    <Typography style={{ fontWeight: "200" }} variant="h4" color={"white"} gutterBottom>
                                        {survey.surveyTitle}
                                    </Typography>
                                    <Typography style={{ fontWeight: "200", textAlign: "start" }} variant="h6" color={"white"} gutterBottom>
                                        {survey.surveyText}
                                    </Typography>
                                    <div className="col-12 d-flex px-2 rounded justify-content-between"  >
                                        <Typography style={{ fontWeight: "100" }} variant="h6" color={"white"} gutterBottom>
                                            Anketi oluşturan: {survey.ownerId}
                                        </Typography>
                                        <Typography style={{ fontWeight: "100" }} variant="h6" color={"white"} gutterBottom>
                                            Bitiş tarihi: {localTime}
                                        </Typography>
                                    </div>
                                </ColoredButton>

                            </div>
                        }) :
                            <div style={{ flex: "1", backgroundColor: "#684EB2" }} className="d-flex flex-column gap-2 p-3" >


                                <div className="d-flex flex-wrap justify-content-between">
                                    <Typography style={{ fontWeight: "200" }} variant="h6" color={"white"} gutterBottom>
                                        Anketi oluşturan: {sortedSurveys[focusedSurveyIndex].ownerId}

                                    </Typography>
                                    <Typography style={{ fontWeight: "200" }} variant="h6" color={"white"} gutterBottom>
                                        Bitiş tarihi: {toLocalTime(sortedSurveys[focusedSurveyIndex].expireDate)}

                                    </Typography>
                                </div>


                                <Typography style={{ fontWeight: "200" }} variant="h5" color={"white"} gutterBottom>
                                    {sortedSurveys[focusedSurveyIndex].surveyText}
                                </Typography>
                                <div className="d-flex justify-content-center  mb-2">
                                    <Tabs
                                        value={surveyResults}
                                        onChange={(event, newValue) => {
                                            createResultGraphs();
                                            set_surveyResults(newValue)
                                            console.log(dataSet);

                                        }}
                                        style={{ fontSize: "large" }}
                                        aria-label="secondary tabs example"
                                        textColor="primary"
                                        indicatorColor="primary"

                                    >
                                        <Tab style={{ textTransform: "none", fontSize: "medium" }} className="me-1" value="cevapla" label="Cevapla" />
                                        <Tab style={{ textTransform: "none", fontSize: "medium" }} value="sonuçlar" label="Sonuçlar" />

                                    </Tabs>
                                </div>
                                {surveyResults === "cevapla" ?
                                    <form id="answer-survey-form" method="post" onSubmit={handleFormAction}>
                                        {sortedSurveys[focusedSurveyIndex].questions.map((question, index) =>
                                            <AnswerQuestionBody handleAnsweredQuestionAmount={handleAnsweredQuestionAmount} key={index} id={index} question={question} > </AnswerQuestionBody>
                                        )}
                                    </form>

                                    : sortedSurveys[focusedSurveyIndex].questions.map((question, index) => <SurveyResults dataSet={dataSet[index]} key={index} id={index} question={question}> </SurveyResults>)}


                            </div>

                    }



                </div>
                {focusSurvey && <div className="d-flex justify-content-end mt-3 gap-3 align-items-baseline" >
                    <Typography variant="p" style={{ color: "white" }}>Cevaplanan Sorular {answeredQuestionArray.filter(c => c).length}/{questionAmount.length}</Typography>
                    <TextField name="cevaplayanSicil"

                        onInvalid={(event) => event.target.setCustomValidity(event.target.value.trim().length === 0 ? "Sicilinizi giriniz" : "")}
                        onChange={(event) => {
                            event.target.setCustomValidity(event.target.value.trim().length === 0 ? "Sicilinizi giriniz" : "");
                            set_cevaplayanSicil(event.target.value)

                        }}
                        value={cevaplayanSicil} style={{ flex: "0.25" }} inputProps={{ form: "answer-survey-form" }} required size="small" label="Sicil"></TextField>
                    <Button type="submit" form="answer-survey-form" className="rounded-pill" variant="contained" style={{ height: "2.7rem", textTransform: "none" }}>
                        Cevapları Gönder
                    </Button>
                </div>}

            </div>
        </div></Grow >
}

export default AnswerSurveyPopup