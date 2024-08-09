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
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from "@mui/material/Box";
import { backdropClasses, CardActionArea } from "@mui/material";
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SurveyResults from "./SurveyResults";
import Pagination from '@mui/material/Pagination';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import { Snackbar, Alert } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function AnswerSurveyPopup(props) {



    const [feedBackOpen, set_feedBackOpen] = useState({ open: false, message: "", severity: "", color: "" })
    const feedBack = (feedbackValues) => {
        const { message, severity, color } = feedbackValues;
        return <Snackbar
            open={true}
            autoHideDuration={2000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}

            onClose={(event, reason) => {
                if (reason === 'clickaway') {
                    return;
                }
                set_feedBackOpen((prev) => ({ ...prev, open: false }))
            }
            }
            key={"top" + "center"}
        >
            <Alert
                color={color}
                onClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }
                    set_feedBackOpen((prev) => ({ ...prev, open: false }))

                }
                }
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    }
    for (let i = 0; i < props.survey.length; i++) {
        props.survey["index"] = i;
    }
    var sortedSurveys = props.survey.map(item => item);
    sortedSurveys.sort((a, b) => new Date(a.expireDate) - new Date(b.expireDate))

    const [focusedQuestion, set_focusedQuestion] = useState(1);
    const [surveyResults, set_surveyResults] = useState("cevapla");

    const [focusedSurveyIndex, set_focusedSurveyIndex] = useState(0);

    var questionAmount = sortedSurveys.length > 0 ? sortedSurveys[focusedSurveyIndex].questions.map((item) => false) : []

    const [answeredQuestionArray, set_answeredQuestionArray] = useState(questionAmount)
    const [cevaplayanSicil, set_cevaplayanSicil] = useState("");
    const [focusSurvey, set_focusSurvey] = useState(false);
    const [finishSurveyDialog, set_finishSurveyDialog] = useState(false);
    const [dataSet, set_dataSet] = useState([]);
    const faceValues = { 1: "Kesinlikle katılmıyorum", 2: "Katılmıyorum", 3: "Kararsızım", 4: "Katılıyorum", 5: "Kesinlikle katılıyorum" }

    function createResultGraphs() {
        if (sortedSurveys.length !== 0) {

            var allAnswers = [];
            sortedSurveys[focusedSurveyIndex].questions.forEach((question, index) => {
                var temp = {}
                var tempObject = {}
                var tempArray = []
                question.options.forEach((option, index) => {

                    tempArray.push({ answeredAmount: option.answers.length, barName: option.name.split(" ")[1] !== "Yüz" ? option.name : faceValues[index + 1] })
                    // tempObject[option.name] = option.answers.length


                })
                // temp = { ...tempObject, barName: question.questionName }
                // allAnswers.push(temp)
                allAnswers.push(tempArray)


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
            set_feedBackOpen({ open: true, message: "Anket cevaplandı!", severity: "success", color: "primary" })
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
            let choiceIndex = modifiedQuestion.options.findIndex((item) => {
                if (modifiedQuestion.type === "metin") {
                    return true;
                }
                else if (modifiedQuestion.type === "değerlendirme") {
                    return item.name.split(" ")[0] === answer
                }
                return item.name === answer

            })

            if (modifiedQuestion.type !== "metin") {

                modifiedQuestion.options[choiceIndex].answers.push(formData[formData.length - 1].value)
            }
            else {
                modifiedQuestion.options[choiceIndex].answers.push({ answerValue: formData[index].value, sicil: formData[formData.length - 1].value })
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
    const [za, set_za] = useState("");

    return <Grow in={true} >

        <div className="flex-container" >
            {feedBackOpen.open && feedBack(feedBackOpen)}

            <Card variant="outlined" style={{ flexShrink: surveyResults === "sonuçlar" ? "0" : "1" }}   >
                <CardContent className="d-flex">
                    <div className="create-survey d-flex flex-column p-4 rounded" >
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

                        <div className="d-flex justify-content-between">
                            <Typography className="me-auto" variant="h3" gutterBottom>
                                {focusSurvey ? sortedSurveys[focusedSurveyIndex].surveyTitle : "Anket Cevapla"}
                            </Typography>
                            <div style={{ position: "relative", bottom: "10px", left: "10px" }}>
                                <Button onClick={() => props.setAnswerSurvey(false)} className="justify-content-center">

                                    <CloseIcon  ></CloseIcon>
                                </Button>
                            </div>

                        </div>

                        {focusSurvey && <div className="d-flex justify-content-between">
                            <Button style={{ fontSize: "medium", textTransform: "none" }} onClick={() => {
                                set_focusSurvey(false)
                                set_answeredQuestionArray(questionAmount)
                                set_cevaplayanSicil("");
                                set_surveyResults("cevapla")
                            }} className="justify-content-start">

                                <ArrowBackIcon className="me-1" ></ArrowBackIcon>
                                Geri
                            </Button>
                            <Typography style={{ fontWeight: "200" }} variant="h6" gutterBottom>
                                {new Date() < new Date(sortedSurveys[focusedSurveyIndex].expireDate) ? `Anketin bitmesine son ${calculateRemainingDays(sortedSurveys[focusedSurveyIndex].expireDate) + 1} gün` : "Anket bitmiştir"}

                            </Typography>
                        </div>}




                        {sortedSurveys.length === 0 ? <Typography variant="h5" gutterBottom>
                            Henüz Anket Oluşturulmamış
                        </Typography>
                            : !focusSurvey ? <div className="d-flex flex-column " style={{ overflowY: "auto", flex: "1" }}> {sortedSurveys.map((survey, index) => {

                                var localTime = toLocalTime(survey.expireDate)

                                var remaningDays = calculateRemainingDays(survey.expireDate)
                                return <div key={index} className='d-flex mb-3 flex-column rounded'>
                                    <Button onClick={() => handleFocus(index)} variant='outlined' style={{
                                        textTransform: "none", flex: "1",
                                       
                                    }}
                                        color= {remaningDays > 0 ? "primary" : "secondary"
}
                                        disableElevation className='align-items-start gap-1  d-flex flex-column' >
                                        <Typography style={{ fontWeight: "200" }} className="col-12 text-end" variant="h6" gutterBottom>
                                            {remaningDays > 0 ? `Anketin bitmesine son ${remaningDays + 1} gün` : "Anket bitmiştir"}
                                        </Typography>
                                        <Typography style={{ fontWeight: "200" }} variant="h4" gutterBottom>
                                            {survey.surveyTitle}
                                        </Typography>
                                        <Typography style={{ fontWeight: "200", textAlign: "start" }} variant="h6" gutterBottom>
                                            {survey.surveyText}
                                        </Typography>
                                        <div className="col-12 d-flex px-2 rounded justify-content-between"  >
                                            <Typography style={{ fontWeight: "100" }} variant="h6" gutterBottom>
                                                Anketi oluşturan: {survey.ownerId}
                                            </Typography>
                                            <Typography style={{ fontWeight: "100" }} variant="h6" gutterBottom>
                                                Bitiş tarihi: {localTime}
                                            </Typography>
                                        </div>
                                    </Button>

                                </div>
                            })}</div> :

                                <div className="d-flex flex-column" >


                                    <div className="d-flex flex-wrap justify-content-between">
                                        <Typography style={{ fontWeight: "200" }} variant="h6" gutterBottom>
                                            Anketi oluşturan: {sortedSurveys[focusedSurveyIndex].ownerId}

                                        </Typography>
                                        <Typography style={{ fontWeight: "200" }} variant="h6" gutterBottom>
                                            Bitiş tarihi: {toLocalTime(sortedSurveys[focusedSurveyIndex].expireDate)}

                                        </Typography>
                                    </div>


                                    <Typography style={{ fontWeight: "200" }} variant="h5" gutterBottom>
                                        {sortedSurveys[focusedSurveyIndex].surveyText}
                                    </Typography>
                                    <div className="d-flex justify-content-center  mb-2">
                                        <Tabs
                                            value={surveyResults}
                                            onChange={(event, newValue) => {
                                                createResultGraphs();
                                                set_answeredQuestionArray(questionAmount);
                                                set_cevaplayanSicil("");
                                                set_surveyResults(newValue)




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



                                </div>

                        }

                        {focusSurvey && (surveyResults === "cevapla" ?
                            <form style={{ overflowY: "auto", flex: "1" }} id="answer-survey-form" method="post" onSubmit={handleFormAction}>
                                {sortedSurveys[focusedSurveyIndex].questions.map((question, index) =>
                                    <AnswerQuestionBody handleAnsweredQuestionAmount={handleAnsweredQuestionAmount} key={index} id={index} question={question} > </AnswerQuestionBody>
                                )}
                            </form>
                            : <div className="d-flex flex-column" style={{ flex: "1" }}>
                                <SurveyResults page={focusedQuestion - 1} dataSet={dataSet[focusedQuestion - 1]} question={sortedSurveys[focusedSurveyIndex].questions[focusedQuestion - 1]}> </SurveyResults>
                                <div className="d-flex mt-3 justify-content-end align-items-center gap-3" >
                                    <FormControl size="small">
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={focusedQuestion}
                                            onChange={(event) => set_focusedQuestion(event.target.value)}
                                        >
                                            {sortedSurveys[focusedSurveyIndex].questions.map((question, index) => <MenuItem value={index + 1}>{question.questionName}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <Pagination showFirstButton showLastButton onChange={(event, value) => set_focusedQuestion(value)} page={focusedQuestion} count={sortedSurveys[focusedSurveyIndex].questions.length} color="primary" />

                                </div>
                            </div>)}


                        {(focusSurvey && surveyResults === "cevapla") && <div className="d-flex justify-content-end mt-3 gap-3 align-items-baseline" >
                            <Typography variant="p" >Cevaplanan Sorular {answeredQuestionArray.filter(c => c).length}/{questionAmount.length}</Typography>
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
                </CardContent>
            </Card>
        </div>
    </Grow >


}

export default AnswerSurveyPopup