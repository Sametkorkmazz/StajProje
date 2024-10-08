import React, { useState } from "react";
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
import CloseIcon from '@mui/icons-material/Close';
import Collapsible from "react-collapsible";
import { Expand, OfflineShareTwoTone } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
function SurveyPopup(props) {

    const [questionArray, set_questionArray] = useState([

    ]);

    const [emptySurveyError, set_emptySurveyError] = useState({ empty: false, message: "" });

    const [addQuestionClicked, set_addQuestionClicked] = useState(false);

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1)
    const minDate = currentDate.toISOString().split("T")[0] + "T00:00"
    var maxAllowedDate = new Date();
    maxAllowedDate.setMonth(maxAllowedDate.getMonth() + 3)
    const maxDate = maxAllowedDate.toISOString().split("T")[0] + "T00:00"



    const [surveyPreferences, setSurveyPreferences] = useState({
        surveyTitle: "",
        surveyText: "",
        anonimAnswer: false,
        anonimResult: false,
        expireDate: currentDate.toISOString().split("T")[0] + "T23:59",
        ownerId: ""
    })



    function finishSurveyCreation(event) {
        event.preventDefault();
        if (questionArray.length === 0) {
            set_emptySurveyError({ empty: true, message: "Boş anket gönderilemez." });


        }

        else {
            console.log(surveyPreferences);

            for (let index = 0; index < questionArray.length; index++) {
                const element = questionArray[index];
                if (element.options.length === 0) {
                    set_emptySurveyError({ empty: true, message: "Ankette boş soru olamaz." });
                    return
                }
                var optionNames = element.options.map(option => option.name)
                if (new Set(optionNames).size !== optionNames.length) {
                    set_emptySurveyError({ empty: true, message: "Ankette aynı isimde seçenekler olamaz." });
                    return
                }
            }


            props.addSurvey({ ...surveyPreferences, questions: [...questionArray] })
            props.postSurvey({ ...surveyPreferences, questions: [...questionArray] });
            props.setOpenSurveyCreation(false);
        }


    }

    function handleSurveyPreferences(event) {

        const { name, value } = event.target
        setSurveyPreferences(prev => ({ ...prev, [name]: value }))
    }

    function newQuestion(type) {

        var newQ = {
            questionName: "Soru",
            options: [{
                name: "Seçenek 1",
                answers: []
            }],
            multiChoice: false,
            multiChoiceType: "Sınır yok",

            limit: 1,
            type: type,
            required: false,
            expanded: true,

        };
        if (type === "değerlendirme") {
            newQ.options = Array.from({ length: 5 }, (_, index) => {
                return { name: index + 1 + " Yıldız", answers: [] }
            });
        }
        else if (type === "seçenek") {
            newQ.options.push({
                name: "Seçenek 2",
                answers: []
            })

        }
        else {
            newQ.options[0].name = "Soru"
        }
        set_addQuestionClicked(false)
        set_questionArray((prev) => [...prev.map(item => ({ ...item, expanded: false })), newQ]

        );
        document.getElementById("questions-body").scrollTo({ left: 0, top: document.getElementById("questions-body").scrollHeight, behavior: "smooth" });


    }
    function deleteQuestion(id) {
        set_questionArray(prev => prev.filter((soru, index) => index !== id))

    }
    function changeOrder(id, direction) {
        var soru = questionArray[id];
        var newIndex = id + direction;
        var tempArray = questionArray.filter((soru, index) => index !== id)
        var newArray = [...tempArray.slice(0, newIndex), soru, ...tempArray.slice(newIndex)]
        set_questionArray(() => [...newArray])



    }

    function setExpanded(id, value) {
        var newArray = questionArray.map((item) => item)
        var prev = newArray[id].required
        newArray[id].expanded = value;

        set_questionArray(() => [...newArray])

    }

    function setRequired(id) {
        var newArray = questionArray.map((item) => item)
        var prev = newArray[id].required
        newArray[id].required = !prev;

        set_questionArray(() => [...newArray])

    }

    function setMultiChoice(id) {
        var newArray = questionArray.map((item) => item)
        var prev = newArray[id].multiChoice
        if (prev) {
            newArray[id].multiChoice = false
            newArray[id].limit = 1
            newArray[id].multiChoiceType = "Sınır yok"


        }
        newArray[id].multiChoice = !prev;



        set_questionArray(() => [...newArray])
    }

    function changeAnswerLimit(id, type, value) {
        var newArray = questionArray.map((item) => item)

        newArray[id].limit = value;
        newArray[id].multiChoiceType = type;

        set_questionArray(() => [...newArray])
    }

    function changeQuestionName(id, value) {
        var newArray = questionArray.map(item => item);
        newArray[id].questionName = value;
        if (newArray[id].type === "metin") {
            newArray[id].options[0].name = value
        }


        set_questionArray([...newArray])


    }

    function changeOptionsOrder(id, value) {
        var newArray = questionArray.map((item) => item)
        newArray[id].options = value;
        if (newArray[id].options.length < 2) {
            newArray[id].multiChoiceType = "Sınır yok"
        }
        set_questionArray(() => [...newArray])


    }

    const answerCreationFeedback = (message, variant, color) => {

        return <Snackbar

            autoHideDuration={4000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            onClose={(event, reason) => {
                if (reason === 'clickaway') {
                    return;
                }
                set_emptySurveyError((prev) => ({ ...prev, empty: false }))
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
                    set_emptySurveyError((prev) => ({ ...prev, empty: false }))
                }
                }
                severity={variant}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    }



    return <Grow in={true}>
        <div>
            <svg style={{left:"0px",top:"0px", position: "absolute" }} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none">
                <path d="M-22 -13H1923V1081H-22V-13Z" fill="#1C1B1B" fill-opacity="0.5" />
            </svg>
            <div className="flex-container" style={{ zIndex: "1" }}>
                {emptySurveyError.empty && answerCreationFeedback(emptySurveyError.message, "error", "secondary")}

                <Card className="">
                    <CardContent className="d-flex">
                        <div className="create-survey d-flex flex-column p-4 rounded" >
                            <div className="d-flex justify-content-end" >

                                <Button style={{ position: "relative", bottom: "10px", left: "10px" }} onClick={() => props.setOpenSurveyCreation(false)} className="justify-content-center">

                                    <CloseIcon ></CloseIcon>
                                </Button>

                            </div>
                            <div className="row" style={{}}>

                                <div className="col">
                                    <Typography variant="h3" gutterBottom>
                                        Yeni Anket
                                    </Typography>
                                </div>


                            </div>
                            <div className="row py-2">
                                <div className="col-6">

                                    <TextField
                                        required
                                        style={{ fontSize: "1.2rem" }}
                                        id="surveyTitle"
                                        name="surveyTitle"
                                        label="Başlığı buraya giriniz *"
                                        variant="outlined" size="small" fullWidth
                                        value={surveyPreferences.surveyTitle}
                                        onChange={(event) => {
                                            event.target.setCustomValidity(event.target.value.trim().length === 0 ? "Bir başlık girin" : "");
                                            handleSurveyPreferences(event);
                                        }}
                                        InputLabelProps={{
                                            shrink: true,


                                        }}
                                        onInvalid={(event) => event.target.setCustomValidity("Bir başlık girin.")}
                                        inputProps={{
                                            form: "create-survey-form",


                                        }}
                                    ></TextField>

                                </div>
                                <div className="col">
                                    <TextField
                                        style={{ fontSize: "3rem" }}

                                        id="standard"
                                        name="surveyText"
                                        label="Anket açıklamasını buraya girebilirsiniz"
                                        value={surveyPreferences.surveyText}
                                        onChange={(event) => handleSurveyPreferences(event)}
                                        variant="outlined" size="small" fullWidth InputLabelProps={{
                                            shrink: true,
                                            required: false,
                                        }} >


                                    </TextField>
                                </div>
                            </div>
                            <div className="row pb-2 mt-1" id="questions-body" style={{ flex: "1", overflowY: "auto", }}>

                                <div className="col-12">
                                    {questionArray.map((soru, index) =>
                                        <Question

                                            setExpanded={setExpanded} setRequired={setRequired} setMultiChoice={setMultiChoice} changeAnswerLimit={changeAnswerLimit} changeOptionsOrder={changeOptionsOrder} deleteQuestion={deleteQuestion} changeOrder={changeOrder} changeQuestionName={changeQuestionName} question={soru} key={index} id={index}></Question>)}

                                </div>

                            </div>
                            <div className="d-flex flex-column">
                                {!addQuestionClicked ?
                                    <div className="col-12 mt-2 d-flex mb-auto" >
                                        <Button colorpalette={"red"} onClick={() => set_addQuestionClicked((prev) => !prev)} variant="contained" style={{ height: "2.7rem", textTransform: "none" }}>
                                            <AddIcon></AddIcon> Yeni soru</Button></div>
                                    : <div className="col d-flex">  <QuestionType set_soruArray={newQuestion} setSoruEkle={set_addQuestionClicked} /> </div>}
                                <div className="row mt-4 d-flex flex-column justify-content-between">




                                    <div className="col-12 mt-2 d-flex gap-3 flex-wrap">
                                        <FormControlLabel style={{ flex: "0.9" }} control={<Switch size="small" name="anonimAnswer" value={surveyPreferences.anonimAnswer} onClick={(event) => handleSurveyPreferences(event)} />} label="Anonim sonuçlar" />

                                        <FormControlLabel style={{ flex: "0.8" }} control={<Switch size="small" name="anonimResult" value={surveyPreferences.anonimResult} onClick={(event) => handleSurveyPreferences(event)} />} label="Anonim cevap" />
                                        <label className="align-self-center" htmlFor="expire-date">Bitiş tarihi:</label>

                                        <input form="create-survey-form" min={minDate} max={maxDate} required className="rounded"
                                            style={{ color: "#12065c", border: "1px solid gray", flex: "1", }} value={surveyPreferences.expireDate}
                                            onInvalid={(event) => event.target.setCustomValidity("Lütfen izin verilen aralıkta bir tarih giriniz.")}
                                            onChange={(event) => {
                                                handleSurveyPreferences(event)

                                            }} type="datetime-local" id="expire-date" name="expireDate" />
                                        <form id="create-survey-form" onSubmit={(event) => finishSurveyCreation(event)}>
                                            <TextField onInvalid={(event) => event.target.setCustomValidity("Sicilinizi giriniz")} style={{ flex: "1", minWidth: "70px" }} className="pe-2" id="outlined-basic" name="ownerId" required label="Sicil *" variant="outlined" size="small" value={surveyPreferences.ownerId}
                                                onChange={(event) => {
                                                    event.target.setCustomValidity(event.target.value.trim().length === 0 ? "Sicilinizi giriniz" : "")
                                                    handleSurveyPreferences(event)
                                                }} />


                                        </form>
                                        <Button type="submit" form="create-survey-form" className="rounded-pill" variant="contained" style={{ height: "2.7rem", flex: "0.7", textTransform: "none" }}>
                                            Anketi Bitir
                                        </Button>
                                    </div>
                                </div>





                            </div>



                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    </Grow >

        ;
}

export default SurveyPopup;