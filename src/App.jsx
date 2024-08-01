import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Button from '@mui/material/Button';
import PollIcon from '@mui/icons-material/Poll';
import Zoom from '@mui/material/Zoom';
import Collapse from '@mui/material/Collapse';
import Grow from '@mui/material/Grow';
import SurveyButton from './SurveyButton';
import './App.css'
import SurveyPopup from './SurveyPopup';
import SurveyMenu from './SurveyMenu';
import { themeOptions } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import AnswerSurveyPopup from './AnswerSurveyPopup';
import { TextField } from '@mui/material';
function App() {
  const [surveyHover, setSurveyHover] = useState(false);
  const [buttonClicked, setButton] = useState(false);
  const [openSurveyCreation, set_OpenSurveyCreation] = useState(false);
  const [surveyArray, setSurveyArray] = useState([])
  const [openSurveyAnswer, set_OpenSurveyAnswer] = useState(false)

  function handleOver() {
    setSurveyHover(true);
  }

  function handleOut() {
    if (!buttonClicked) {
      setSurveyHover(false);
    }

  }
  function addSurvey(survey) {

    setSurveyArray(prev => [...prev, survey])
  }
  function updateSurvey(survey, index) {
    var temp = surveyArray.map(survey => survey)
    temp[index] = survey;
    setSurveyArray([...temp])
    console.log(surveyArray);

  }

  function textForm(event) {
    event.preventDefault();
    console.log(event.target.email.value);
  }
  return <ThemeProvider theme={themeOptions}>
    <div className="" >

      {openSurveyCreation ?
        <SurveyPopup addSurvey={addSurvey} setOpenSurveyCreation={set_OpenSurveyCreation} /> : (openSurveyAnswer) && <AnswerSurveyPopup updateSurvey={updateSurvey} survey={surveyArray} setAnswerSurvey={set_OpenSurveyAnswer}></AnswerSurveyPopup>
      }
      <div style={{
        opacity: (openSurveyCreation || openSurveyAnswer) ? "20%" : "100%",
        pointerEvents: (openSurveyCreation || openSurveyAnswer) ? "none" : "auto",
      }} className='d-flex flex-column' >


        <div className="d-flex justify-content-end pe-5">

          <SurveyButton handleOut={handleOut} handleOver={handleOver} setButton={setButton} surveyHover={surveyHover}></SurveyButton>

        </div>



        {buttonClicked &&
          <div className="d-flex justify-content-end">
            <SurveyMenu set_OpenSurveyAnswer={set_OpenSurveyAnswer} set_OpenSurveyCreation={set_OpenSurveyCreation}></SurveyMenu>
          </div>

        }
      </div>

    </div>
  </ThemeProvider>

}

export default App
