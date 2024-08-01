import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React, { useEffect, useState } from 'react';
import { Button, Collapse, RadioGroup, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Collapsible from 'react-collapsible';
import Typography from '@mui/material/Typography';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AnswerQuestionOptions from './AnswerQuestionOptions';
import { FullscreenExit } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import EditNoteIcon from '@mui/icons-material/EditNote';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Star from '@mui/icons-material/Star'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';



function AnswerQuestionBody(props) {
    const [textQuestionAnswer, set_textQuestionAnswer] = useState("");
    const [expanded, set_expanded] = useState(false)
    const choiceArray = props.question.options.map((option) => option.name)
    var choicesObject = {}
    choiceArray.forEach((choice) => choicesObject[choice] = false);
    const [checkedChoices, set_checkedChoices] = useState({ ...choicesObject })
    const [checkedChoice, set_checkedChoice] = useState("")
    for (let index = 0; index < choiceArray.length; index++) {
        choiceArray[index] = checkedChoices[choiceArray[index]];
    }
    function handleMultiChange(event, name) {
        var temp = { ...checkedChoices, [name]: event.target.checked }
        var amount = 0;
        for (var key in temp) {
            amount += (key ? 1 : 0)
        }
        props.handleAnsweredQuestionAmount(props.id,
            amount > 0
        )
        set_checkedChoices(() => ({
            ...checkedChoices,
            [name]: event.target.checked
        }))
        console.log(checkedChoices);


    }
    function handleSingleChoice(event) {
        set_checkedChoice((prev) => prev !== event.target.value ? event.target.value : "")
        props.handleAnsweredQuestionAmount(props.id,
            event.target.value !== checkedChoice
        )

    }
    const AnswerMultiChoiceQuestion = () => {



        var error;
        var disabled;
        var message = `1 adet seçebilirsiniz.`;
        var requirement;
        var requiredMessage = "En az 1 adet seçmelisiniz."




        if (props.question.multiChoice) {
            switch (props.question.multiChoiceType) {
                case "Eşit":
                    requirement = props.question.required ? (choiceArray.filter((c) => c).length === props.question.limit ? false : true) : (choiceArray.filter((c) => c).length > 0 && choiceArray.filter((c) => c).length !== props.question.limit) ? true : false;
                    requiredMessage = (props.question.limit - choiceArray.filter((c) => c).length) + " Adet daha seçmelisiniz."
                    message = `${props.question.limit} adet seçmelisiniz`
                    disabled = choiceArray.filter((c) => c).length === props.question.limit
                    break;
                case "En fazla":
                    requirement = props.question.required ? (choiceArray.filter((c) => c).length >= 1 ? false : true) : false
                    message = `En fazla ${props.question.limit} adet seçebilirsiniz`
                    disabled = choiceArray.filter((c) => c).length >= props.question.limit
                    break;
                case "Sınır yok":
                    requirement = props.question.required ? (choiceArray.filter((c) => c).length >= 1 ? false : true) : false

                    message = `İstediğiniz kadar seçenek seçebilirsiniz.`
                    disabled = false
                    error = false
                    break;
                default:
                    message = `1 adet seçebilirsiniz.`

                    break;
            }
        }
        return <FormControl className='ps-5' required={props.question.required} error={error}>
            <FormLabel component="legend">{message}</FormLabel>
            {props.question.multiChoice ?
                <FormGroup  >
                    {props.question.options.map((option, index) => <FormControlLabel key={index} name='checkbox' style={{ color: "white" }}
                        control={
                            <Checkbox
                                onInvalid={(e) => e.target.setCustomValidity(requiredMessage)} required={requirement} value={option.name} disabled={disabled && !checkedChoices[option.name]} checked={checkedChoices[option.name]} onChange={(event) => handleMultiChange(event, option.name)} name={props.question.id + " " + props.question.questionName} />
                        }
                        label={option.name}

                    />)}

                </FormGroup>

                : <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name={props.question.questionName + " " + checkedChoice}
                    value={checkedChoice}
                    onClick={handleSingleChoice}
                >
                    {props.question.options.map((option, index) => <FormControlLabel key={index} label={option.name} value={option.name} control={<Radio required={props.question.required && checkedChoice === ""}  > </Radio>} name={props.id + " " + props.question.questionName} style={{ color: "white" }}></FormControlLabel>)}
                </RadioGroup>

            }


        </FormControl>


    }


    return <Collapsible open={expanded} trigger={
        <div className='d-flex gap-1'>
            <Button variant='contained' size='large' className="mb-2 gap-2 justify-content-start" style={{ flex: "1", backgroundColor: "#684EB2", color: "white", textTransform: "none" }} onClick={() => set_expanded((prev) => !prev)}>
                {expanded ? <ExpandLessIcon fontSize='small'></ExpandLessIcon> : <ExpandMoreIcon fontSize='small'></ExpandMoreIcon>}

                {props.id + 1 + ".    " + props.question.questionName}
                {props.question.type === "seçenek" ? <RadioButtonCheckedIcon></RadioButtonCheckedIcon> : props.question.type === "metin" ? <TextFormatIcon></TextFormatIcon> : <ThumbUpOffAltIcon></ThumbUpOffAltIcon>}
                <div className='ms-1'> {props.question.required ? "    * Gerekli" : ""}</div>
            </Button>



        </ div>}
    >
        <div style={{ backgroundColor: "#684EB2" }} className='d-flex flex-column'>

            {props.question.type === "seçenek" ? <AnswerMultiChoiceQuestion> </AnswerMultiChoiceQuestion>


                : props.question.type === "metin" ?
                    <TextField multiline={true}
                        onChange={(event) => {
                            var value = event.target.value
                            var valid = !props.question.required || value.trim().length > 0
                            event.target.setCustomValidity(!valid ? "Lütfen bu alana cevabınızı yazın." : "");
                            set_textQuestionAnswer(value)
                            props.handleAnsweredQuestionAmount(props.id, value.trim().length > 0)
                        }
                        }

                        onInvalid={(event) => event.target.setCustomValidity("Lütfen bu alana cevabınızı yazın.")}
                        value={textQuestionAnswer} minRows={2} className='my-3' required={props.question.required} label="Cevabınız" InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EditNoteIcon></EditNoteIcon>
                                </InputAdornment>
                            ),

                        }} InputLabelProps={{ required: false }}>



                    </TextField>
                    : <div className='d-flex justiffy-content-center gap-1'>

                        {props.question.options[0].name.split(" ")[1] === "Yıldız" ?
                            <FormControl>

                                <RadioGroup
                                    className='align-items-center'
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name={props.question.id + " Değerlendirme"}
                                    value={checkedChoice}
                                    onClick={(event) => handleSingleChoice(event)}
                                >
                                    {props.question.options.map((option, index) => <FormControlLabel key={index} value={option.name} control={<Radio value={option.name} required={props.question.required} sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: "40px",
                                        },
                                        "& .MuiFormLabel-asterisk": {
                                            color: "red"
                                        }
                                    }} checkedIcon={<Star  ></Star>} icon={parseInt(option.name.split(" ")[0]) < parseInt(checkedChoice === undefined ? 0 : checkedChoice.split(" ")[0]) ? <Star color="primary"></Star> : <StarBorderIcon ></StarBorderIcon>} />} />)}
                                    <Box sx={{ color: "white" }}>{checkedChoice === undefined ? "" : checkedChoice.split(" ")[0]}</Box>
                                </RadioGroup>


                            </FormControl>


                            : null}
                    </div>

            }



        </div></Collapsible>
}

export default AnswerQuestionBody