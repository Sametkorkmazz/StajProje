import React from "react";
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
function AnswerSurveyPopup(props) {

    const ColoredButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText("#9C27B0"),
        backgroundColor: "#A182FA",
        '&:hover': {
            backgroundColor: "#6342CB",
        },
    }));
    const [focusedSurveyIndex, set_focusedSurveyIndex] = useState(0);
    var questionAmount = props.survey.length > 0 ? props.survey[focusedSurveyIndex].questions.map((item) => false) : []
    var sortedSurveys = props.survey.map(item => item);
    sortedSurveys.sort((a, b) => new Date(a.expireDate) - new Date(b.expireDate))
    const [answeredQuestionArray, set_answeredQuestionArray] = useState(questionAmount)
    const [cevaplayanSicil, set_cevaplayanSicil] = useState("");
    const [focusSurvey, set_focusSurvey] = useState(false);
    const [finishSurveyDialog, set_finishSurveyDialog] = useState(false);

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
            event.target.submit();
        }
    }
    function handleAnsweredQuestionAmount(id, value) {
        var newArray = answeredQuestionArray.map((item) => item)
        console.log(value);
        newArray[id] = value;
        set_answeredQuestionArray([...newArray])
        console.log(answeredQuestionArray);

    }
    return <Grow in={true}>

        <div className="flex-container">
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
                    <Button style={{ textTransform: "none" }} onClick={() => set_finishSurveyDialog(false)}>Evet</Button>
                </DialogActions>

            </Dialog>
            <div className="create-survey d-flex flex-column p-4 rounded">
                <div className="d-flex justify-content-end" >
                    <div style={{ position: "relative", bottom: "10px", left: "10px" }}>
                        <Button onClick={() => props.setAnswerSurvey(false)} className="justify-content-center">

                            <CloseIcon style={{ color: "white" }} ></CloseIcon>
                        </Button>
                    </div>
                </div>
                <Typography variant="h3" color={"white"} gutterBottom>
                    Anket Cevapla
                </Typography>
                {focusSurvey && <div>
                    <Button style={{ fontSize: "medium", color: "white", textTransform: "none" }} onClick={() => set_focusSurvey(false)} className="justify-content-start">

                        <ArrowBackIcon className="me-1" style={{ color: "white" }}></ArrowBackIcon>
                        Geri
                    </Button>
                </div>}

                <div className="px-3 d-flex gap-3 flex-column mt-2" style={{ flex: "1", overflowY: "auto", }}>


                    {props.survey.length === 0 ? <Typography variant="h5" color={"white"} gutterBottom>
                        Henüz Anket Oluşturulmamış
                    </Typography>
                        : !focusSurvey ? sortedSurveys.map((survey, index) => {
                            var expireDate = survey.expireDate.split("-");
                            var localTime = [expireDate[2], expireDate[1], expireDate[0]].join("-")

                            var remaningDays = new Date(new Date(survey.expireDate) - new Date()).getDate();

                            return <div key={index} className='d-flex flex-column rounded' style={{ backgroundColor: "#A182FA" }} >
                                <ColoredButton onClick={() => handleFocus(index)} variant='contained' style={{
                                    textTransform: "none", flex: "1"
                                }} disableElevation className='align-items-start gap-1  d-flex flex-column' >
                                    <Typography style={{ fontWeight: "200" }} className="col-12 text-end" variant="h5" color={"white"} gutterBottom>
                                        {`Anketin bitmesine son ${remaningDays} gün.`}
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
                            <div style={{ backgroundColor: "#684EB2" }} className="d-flex flex-column gap-2 p-3">


                                <Typography variant="h4" color={"white"} gutterBottom>
                                    {props.survey[focusedSurveyIndex].surveyTitle}
                                </Typography>
                                <Typography style={{ fontWeight: "light" }} variant="h5" color={"white"} gutterBottom>
                                    {props.survey[focusedSurveyIndex].surveyText}
                                </Typography>

                                <form id="answer-survey-form" method="post" onSubmit={handleFormAction}>
                                    {props.survey[focusedSurveyIndex].questions.map((question, index) =>
                                        <AnswerQuestionBody handleAnsweredQuestionAmount={handleAnsweredQuestionAmount} key={index} id={index} question={question} > </AnswerQuestionBody>
                                    )}

                                </form>

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