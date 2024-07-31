import React from "react";
import { autocompleteClasses, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Collapse from '@mui/material/Collapse';
import Slide from '@mui/material/Slide';
function QuestionType(props) {
    const containerRef = React.useRef < HTMLElement > (null);
    return <Collapse in={true} orientation="horizontal">
        <div className="col d-flex gap-3 question-type rounded justify-content-center"   >


            <Button className="" style={{ height: "2.7rem", textTransform: "none", backgroundColor: "white" }} onClick={() => props.setSoruEkle(prev => !prev)}  >
                <AddIcon>

                </AddIcon>
            </Button>

            <Button onClick={() =>
                props.set_soruArray("seçenek")} 
                className="my-1" style={{ textTransform: "none", backgroundColor: "white" }}>
                <RadioButtonCheckedIcon ></RadioButtonCheckedIcon>
                Seçenek
            </Button>

            <Button onClick={() => props.set_soruArray("metin")} className="my-1" style={{ textTransform: "none", backgroundColor: "white" }} >

                <TextFormatIcon></TextFormatIcon>
                Metin
            </Button >
            <Button onClick={() => props.set_soruArray("değerlendirme")} className="my-1 me-1" style={{ textTransform: "none", backgroundColor: "white" }}>

                <ThumbUpOffAltIcon>
                </ThumbUpOffAltIcon>
                Değerlendirme

            </Button>

        </div >
    </Collapse >

}

export default QuestionType