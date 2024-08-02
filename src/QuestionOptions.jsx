import React, { useState } from "react";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Select, TextField } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Collapse from '@mui/material/Collapse';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
function QuestionOptions(props) {



    const [questionButtons, set_questionButtons] = useState(false);


    return props.type === "seçenek" ?


        <div className="d-flex align-items-center flex-wrap gap-2" onMouseOver={() => set_questionButtons(true)} onMouseOut={() => set_questionButtons(false)}>
            <div className="d-flex gap-2 flex-grow-1" >
                {
                    !props.multiChoice ?
                        <RadioButtonUncheckedIcon className="align-self-center"></RadioButtonUncheckedIcon>
                        :
                        <CheckBoxOutlineBlankIcon className="align-self-center"></CheckBoxOutlineBlankIcon>
                }


                <TextField
                    className=""
                    id="outlined-required"
                    style={{ flex: "1" }}
                    onChange={(event) => props.changeOptionName(props.id, event.target.value)}
                    value={props.name}
                    size="small" fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}

                ></TextField>

            </div>
            <div className="d-flex" style={{ flex: "0.3" }} >
                <FormControl fullWidth >
                    <InputLabel >Gün</InputLabel>
                    <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"].includes(props.name) ? props.name : ""}
                        label="Age"
                        onChange={(event) => {
                            var value = event.target.value;

                            props.changeOptionName(props.id, value)
                        }}
                    >
                        <MenuItem value="Pazartesi">Pzt</MenuItem>
                        <MenuItem value="Salı">Sal</MenuItem>
                        <MenuItem value="Çarşamba">Çar</MenuItem>
                        <MenuItem value="Perşembe">Per</MenuItem>
                        <MenuItem value="Cuma">Cum</MenuItem>
                        <MenuItem value="Cumartesi">Cmt</MenuItem>
                        <MenuItem value="Pazar">Paz</MenuItem>

                    </Select>
                </FormControl>
            </div>
            {<div className="d-flex" style={{ visibility: questionButtons ? "visible" : "hidden" }} >
                <Button className="" onClick={() => props.deleteOption(props.id)}>
                    <DeleteOutlineIcon className="" ></DeleteOutlineIcon>
                </Button>
                <Button onClick={() => props.changeOptionOrder(props.id, -1)}>
                    <ArrowUpwardIcon></ArrowUpwardIcon>
                </Button>

                <Button onClick={() => props.changeOptionOrder(props.id, 1)}>

                    <ArrowDownwardIcon></ArrowDownwardIcon>
                </Button></div>}


        </div>

        : props.type === "metin" ?
            <TextField
                style={{ flex: 1 }}
                disabled
                id="outlined-disabled"
                size="small"
                defaultValue="Yanıtınızı Giriniz"
            />
            :


            <StarBorderIcon fontSize="large"></StarBorderIcon>






}

export default QuestionOptions