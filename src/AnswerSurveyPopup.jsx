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

import FormGroup from '@mui/material/FormGroup'
function AnswerSurveyPopup(props) {

    const [focusedSurveyIndex, set_focusedSurveyIndex] = useState(0);
    const [answeredQuestionArray, set_answeredQuestionArray] = useState(props.survey[focusedSurveyIndex].questions.map((item) => false))

    const [focusSurvey, set_focusSurvey] = useState(false);

    function handleFocus(index) {
        set_focusedSurveyIndex(index)
        set_focusSurvey(true);
    }
    function handleFormAction(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log([...data.entries()]);
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
            <div className="create-survey d-flex flex-column p-4 rounded">
                <div className="row justify-content-start" style={{ position: "relative", bottom: "10px", right: "10px" }}>
                    <div className="col">
                        <Button onClick={() => props.setAnswerSurvey(false)} className="justify-content-start">

                            <CloseIcon style={{ color: "white" }} ></CloseIcon>
                        </Button>
                    </div>
                </div>
                <Typography variant="h3" color={"white"} gutterBottom>
                    Anket Cevapla
                </Typography>

                <div className="row mt-2" style={{ flex:"1",overflowY: "auto", }}>
                    <div className="col-12">

                        {props.survey.length === 0 ? <Typography variant="h5" color={"white"} gutterBottom>
                            Henüz Anket Oluşturulmamış
                        </Typography>
                            : !focusSurvey ? props.survey.map((survey, index) =>
                                <div key={index} className='d-flex'>
                                    <Button onClick={() => handleFocus(index)} variant='contained' style={{ textTransform: "none", flex: "1" }} className='align-items-start mb-3 d-flex flex-column' >
                                        <Typography variant="h4" color={"white"} gutterBottom>
                                            {survey.surveyTitle}
                                        </Typography>
                                        <Typography style={{ textAlign: "start" }} variant="h6" color={"white"} gutterBottom>
                                            {survey.surveyText}
                                        </Typography>
                                    </Button>
                                </div>) :
                                <div style={{ backgroundColor: "#684EB2" }} className="d-flex flex-column gap-2 p-3">

                                    <Typography variant="h4" color={"white"} gutterBottom>
                                        {props.survey[focusedSurveyIndex].surveyTitle}
                                    </Typography>
                                    <Typography style={{ fontWeight: "light" }} variant="h5" color={"white"} gutterBottom>
                                        {props.survey[focusedSurveyIndex].surveyText}
                                    </Typography>
                                    <form id="answer-survey-form" method="post">
                                        {props.survey[focusedSurveyIndex].questions.map((question, index) =>
                                            <AnswerQuestionBody handleAnsweredQuestionAmount={handleAnsweredQuestionAmount} key={index} id={index} question={question} > </AnswerQuestionBody>
                                        )}

                                    </form>

                                </div>

                        }
                    </div>


                </div>
                {focusSurvey && <div className="d-flex justify-content-end mt-3 gap-3 align-items-baseline" >
                    <Typography variant="p" style={{ color: "white" }}>Cevaplanan Sorular {answeredQuestionArray.filter(c => c).length}/{props.survey[focusedSurveyIndex].questions.length}</Typography>
                    <TextField style={{ flex: "0.25" }} InputLabelProps={{ form: "answer-survey-form" }} required size="small" label="Sicil"></TextField>
                    <Button type="submit" form="answer-survey-form" className="rounded-pill" variant="contained" style={{ height: "2.7rem", textTransform: "none" }}>
                        Cevapları Gönder
                    </Button>
                </div>}

            </div>
        </div></Grow>
}

export default AnswerSurveyPopup