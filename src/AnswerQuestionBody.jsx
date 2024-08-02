import React, { useEffect, useState } from 'react';
import { Button, Collapse, RadioGroup, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { removeLocalizedDigits } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


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

        var temp = {
            ...checkedChoices,
            [name]: event.target.checked
        }
        var amount = 0;
        for (var key in temp) {
            amount += (temp[key] ? 1 : 0)
        }
        props.handleAnsweredQuestionAmount(props.id,
            amount > 0
        )
        set_checkedChoices(() => ({
            ...checkedChoices,
            [name]: event.target.checked
        }))



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
        return <FormControl className='ps-2' required={props.question.required} error={error}>
            <FormLabel component="legend">{message}</FormLabel>
            {props.question.multiChoice ?
                <FormGroup  >
                    {props.question.options.map((option, index) => <FormControlLabel key={index} name='checkbox'
                        control={
                            <Checkbox
                                onInvalid={(e) => e.target.setCustomValidity(requiredMessage)} required={requirement} value={option.name} disabled={disabled && !checkedChoices[option.name]} checked={checkedChoices[option.name]} onChange={(event) => handleMultiChange(event, option.name)} name={props.id + " " + props.question.questionName} />
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
                    {props.question.options.map((option, index) => <FormControlLabel key={index} label={option.name} value={option.name} control={<Radio required={props.question.required && checkedChoice === ""}  > </Radio>} name={props.id + " " + props.question.questionName} ></FormControlLabel>)}
                </RadioGroup>

            }


        </FormControl>


    }


    return <Accordion  style={{ border: "1px solid #12065c" }}  expanded={expanded} >
        <AccordionSummary  style={{borderBottom:"1px solid #12065c"}}  aria-controls="panel2-content" expandIcon={<ArrowDropDownIcon />} onClick={() => set_expanded((prev) => !prev)}>

            <Button variant='contained' className="d-flex gap-2 justify-content-start" style={{ textTransform: "none" }} >

                {props.id + 1 + ". " + props.question.questionName}
                {props.question.type === "seçenek" ? <RadioButtonCheckedIcon></RadioButtonCheckedIcon> : props.question.type === "metin" ? <TextFormatIcon></TextFormatIcon> : <ThumbUpOffAltIcon></ThumbUpOffAltIcon>}
                <div className='ms-1'> {props.question.required ? "    * Gerekli" : ""}</div>
            </Button>



        </AccordionSummary>
        <AccordionDetails>
            <Card style={{ border: "none", boxShadow: "none" }} >
                <CardContent>


                    <div className='d-flex flex-column'>

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
                                    name={props.id + " " + props.question.questionName}

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
                                                name={props.id + " " + props.question.questionName}
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
                                                <Box >{checkedChoice === undefined ? "" : checkedChoice.split(" ")[0]}</Box>
                                            </RadioGroup>


                                        </FormControl>


                                        : null}
                                </div>

                        }



                    </div>
                </CardContent>
            </Card>
        </AccordionDetails>

    </Accordion>
}

export default AnswerQuestionBody