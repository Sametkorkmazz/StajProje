import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Button, Collapse } from "@mui/material";
import TextField from "@mui/material/TextField";
import QuestionOptions from "./QuestionOptions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Collapsible from "react-collapsible";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
function Question(props) {
  const [buttonsHovered, set_buttonsHovered] = useState(false);

  function changeOptionsOrder(id, direction) {
    var option = props.question.options[id];
    var newIndex = id + direction;
    var tempArray = props.question.options.filter(
      (option, index) => id !== index
    );
    var newArray = [
      ...tempArray.slice(0, newIndex),
      option,
      ...tempArray.slice(newIndex),
    ];
    props.changeOptionsOrder(props.id, newArray);
  }

  function addOption() {
    var newOption = [
      ...props.question.options,
      { name: "Seçenek " + (props.question.options.length + 1), answers: [] },
    ];
    props.changeOptionsOrder(props.id, newOption);
  }
  function changeOptionName(id, value) {
    var newOptions = props.question.options.map((option, index) => {
      if (index === id) {
        option.name = value;
      }
      return option;
    });
    props.changeOptionsOrder(props.id, newOptions);
  }
  function deleteOption(id) {
    var newOptions = props.question.options.filter(
      (option, index) => index !== id
    );
    props.changeOptionsOrder(props.id, newOptions);
  }

  function changeYıldızSayısı(value) {
    var newOptions = Array.from({ length: value }, (_, index) => {
      return { name: index + 1 + " Yıldız", answers: [] };
    });
    props.changeOptionsOrder(props.id, newOptions);
  }

  return (
    <Collapsible
      className="mb-2"
      open={props.question.expanded}
      trigger={
        <div
          className="d-flex gap-1"
          onMouseOver={() => set_buttonsHovered(true)}
          onMouseOut={() => set_buttonsHovered(false)}
        >
          <Button
            variant="contained"
            className="gap-2 justify-content-start"
            style={{ textTransform: "none" }}
            onClick={() => {
              props.setExpanded(props.id, !props.question.expanded);
            }}
          >
            {props.question.expanded ? (
              <ExpandLessIcon fontSize="small"></ExpandLessIcon>
            ) : (
              <ExpandMoreIcon fontSize="small"></ExpandMoreIcon>
            )}

            {props.id + 1 + ".    " + props.question.questionName}
            {props.question.type === "seçenek" ? (
              <RadioButtonCheckedIcon></RadioButtonCheckedIcon>
            ) : props.question.type === "metin" ? (
              <TextFormatIcon></TextFormatIcon>
            ) : (
              <ThumbUpOffAltIcon></ThumbUpOffAltIcon>
            )}
          </Button>
          {buttonsHovered && (
            <div className="d-flex">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  props.deleteQuestion(props.id);
                }}
              >
                <DeleteOutlineIcon></DeleteOutlineIcon>
              </Button>

              <Button
                onClick={(e) => {
                  e.stopPropagation();

                  props.changeOrder(props.id, -1);
                }}
              >
                <ArrowUpwardIcon></ArrowUpwardIcon>
              </Button>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  props.changeOrder(props.id, 1);
                }}
              >
                <ArrowDownwardIcon></ArrowDownwardIcon>
              </Button>
            </div>
          )}
        </div>
      }
    >
      <div className="d-flex"></div>
      <Card variant="outlined" className="me-2 mb-2">
        <CardContent>
          <div className="container">
            <div className="d-flex justify-content-end">
              <Button onClick={() => props.deleteQuestion(props.id)}>
                <DeleteOutlineIcon></DeleteOutlineIcon>
              </Button>

              <Button onClick={() => props.changeOrder(props.id, -1)}>
                <ArrowUpwardIcon></ArrowUpwardIcon>
              </Button>

              <Button onClick={() => props.changeOrder(props.id, 1)}>
                <ArrowDownwardIcon></ArrowDownwardIcon>
              </Button>
            </div>

            <div className="d-flex">
              <p className="me-3">{props.id + 1 + ". "}</p>

              <TextField
                onChange={(event) =>
                  props.changeQuestionName(props.id, event.target.value)
                }
                id="standard"
                value={props.question.questionName}
                variant="standard"
                size="small"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  required: false,
                }}
              ></TextField>
            </div>
            <div
              className={
                "d-flex" +
                (props.question.type === "seçenek"
                  ? " flex-column gap-3"
                  : props.question.type === "değerlendirme"
                  ? " gap-4 mt-2 ms-3"
                  : "")
              }
            >
              {props.question.options.map((option, index) => (
                <QuestionOptions
                  deleteOption={deleteOption}
                  changeOptionName={changeOptionName}
                  multiChoice={props.question.multiChoice}
                  parentId={props.id}
                  changeOptionOrder={changeOptionsOrder}
                  key={index}
                  id={index}
                  name={option.name}
                  type={props.question.type}
                ></QuestionOptions>
              ))}
            </div>

            <div className="d-flex mt-3 justify-content-between">
              {props.question.type === "seçenek" ? (
                <Button onClick={addOption} variant="text">
                  <AddCircleOutlineIcon className="me-1"></AddCircleOutlineIcon>
                  Yeni Seçenek
                </Button>
              ) : props.question.type === "değerlendirme" ? (
                <FormControl style={{ flex: "0.2" }} className="ms-3 mt-3">
                  <InputLabel id="demo-simple-select-label">
                    Yıldız Sayısı
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(event) => changeYıldızSayısı(event.target.value)}
                    label="Yıldız Sayısı"
                    value={props.question.options.length}
                  >
                    <MenuItem value={1}>1</MenuItem>

                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <div></div>
              )}
            </div>
            {props.question.multiChoice && (
              <div className="mt-1 d-flex gap-3 align-items-baseline">
                <p>Toplam seçenek belirleyin: </p>

                <Select
                  style={{ flex: 0.1 }}
                  size="small"
                  label=""
                  onChange={(event) =>
                    props.changeAnswerLimit(
                      props.id,
                      event.target.value,
                      event.target.value === "Sınır yok"
                        ? props.question.options.length
                        : props.question.limit < 2
                        ? 2
                        : props.question.limit
                    )
                  }
                  value={props.question.multiChoiceType}
                >
                  <MenuItem value="Sınır yok">Sınır yok</MenuItem>
                  <MenuItem
                    disabled={props.question.options.length < 2}
                    value="Eşit"
                  >
                    Eşit
                  </MenuItem>
                  <MenuItem
                    disabled={props.question.options.length < 2}
                    value="En fazla"
                  >
                    En fazla
                  </MenuItem>
                </Select>
                {props.question.multiChoiceType !== "Sınır yok" && (
                  <Select
                    style={{ flex: 0.1 }}
                    size="small"
                    value={props.question.limit}
                    onChange={(event) =>
                      props.changeAnswerLimit(
                        props.id,
                        props.question.multiChoiceType,
                        event.target.value
                      )
                    }
                  >
                    {props.question.options.slice(1).map((item, index) => (
                      <MenuItem value={index + 2}>{index + 2}</MenuItem>
                    ))}
                  </Select>
                )}
              </div>
            )}
            <div className="d-flex justify-content-end">
              {props.question.type === "seçenek" && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={props.question.multiChoice}
                      onClick={() => props.setMultiChoice(props.id)}
                    />
                  }
                  label="Birden çok yanıt"
                />
              )}
              <FormControlLabel
                control={
                  <Switch
                    checked={props.question.required}
                    onClick={() => props.setRequired(props.id)}
                  />
                }
                label="Gerekli"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Collapsible>
  );
}

export default Question;
