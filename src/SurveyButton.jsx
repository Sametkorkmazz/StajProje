import React from "react";
import Button from '@mui/material/Button';
import PollIcon from '@mui/icons-material/Poll';
import Zoom from '@mui/material/Zoom';
import Collapse from '@mui/material/Collapse';

function SurveyButton(props) {

    return <Button onClick={() => {
        props.setButton((prev) => !prev);
    }} onMouseOver={props.handleOver} onMouseOut={props.handleOut} sx={{ borderRadius: 26 }} variant="contained">
        <PollIcon className={"me-" + (props.surveyHover ? "2" : "0" + " p")}></PollIcon>
        <Collapse sx={{

        }} orientation="horizontal" in={props.surveyHover}>




            <Zoom in={props.surveyHover}><div>Anket</div></Zoom>


        </Collapse>
    </Button>
}
export default SurveyButton;