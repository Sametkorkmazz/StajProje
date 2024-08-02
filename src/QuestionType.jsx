import React from "react";
import { autocompleteClasses, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Collapse from '@mui/material/Collapse';
import Slide from '@mui/material/Slide';
import Grow from "@mui/material/Grow";
function QuestionType(props) {
    return <Collapse in={true} orientation="horizontal" >
        <div className="col d-flex gap-3 question-type rounded "   >


            <Button variant="contained" style={{ height: "2.7rem", textTransform: "none" }} onClick={() => props.setSoruEkle(prev => !prev)}  >
                <AddIcon>

                </AddIcon>
            </Button>

            <Button variant="contained" onClick={() =>
                props.set_soruArray("seçenek")}
                className="my-1" style={{ textTransform: "none" }}>
                <RadioButtonCheckedIcon ></RadioButtonCheckedIcon>
                Seçenek
            </Button>

            <Button variant="contained" onClick={() => props.set_soruArray("metin")} className="my-1" style={{ textTransform: "none" }} >

                <TextFormatIcon></TextFormatIcon>
                Metin
            </Button >
            <Button variant="contained" onClick={() => props.set_soruArray("değerlendirme")} className="my-1 me-1" style={{ textTransform: "none" }}>

                <ThumbUpOffAltIcon>
                </ThumbUpOffAltIcon>
                Değerlendirme

            </Button>

        </div >
    </Collapse >

}

export default QuestionType