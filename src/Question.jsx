import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import QuestionOptions from "./QuestionOptions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";

import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function Question(props) {
  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon fontSize="inherit" color="error" />,
      label: "Very Dissatisfied",
    },
    2: {
      icon: <SentimentDissatisfiedIcon fontSize="inherit" color="error" />,
      label: "Dissatisfied",
    },
    3: {
      icon: <SentimentSatisfiedIcon fontSize="inherit" color="warning" />,
      label: "Neutral",
    },
    4: {
      icon: <SentimentSatisfiedAltIcon fontSize="inherit" color="success" />,
      label: "Satisfied",
    },
    5: {
      icon: <SentimentVerySatisfiedIcon fontSize="inherit" color="success" />,
      label: "Very Satisfied",
    },
  };

  const [faceText, set_faceText] = useState(3);
  const [buttonsHovered, set_buttonsHovered] = useState(false);
  const [faceTextHover, set_faceTextHover] = useState(-1);

  function changeOptionsOrder(id, direction) {
    var option = props.question.options[id];
    var newIndex = id + direction;
    var tempArray = props.question.options.filter(
      (option, index) => id !== index,
    );
    var newArray = [
      ...tempArray.slice(0, newIndex),
      option,
      ...tempArray.slice(newIndex),
    ];
    props.changeOptionsOrder(props.id, newArray);
  }

  const faceValues = {
    1: "Kesinlikle katılmıyorum",
    2: "Katılmıyorum",
    3: "Kararsızım",
    4: "Katılıyorum",
    5: "Kesinlikle katılıyorum",
  };
  const [ratingEmoji, set_ratingEmoji] = useState({
    type: "yıldız",
    selected: 2,
  });

  function addOption() {
    var newOption = [
      ...props.question.options,
      {
        name: "Seçenek " + (props.question.options.length + 1),
        answers: [],
      },
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
      (option, index) => index !== id,
    );
    props.changeOptionsOrder(props.id, newOptions);
  }

  function changeYıldızSayısı(value, type) {
    var newOptions = Array.from({ length: value }, (_, index) => {
      return {
        name:
          index +
          1 +
          (type === "yıldız" ? " Yıldız" : type === "kalp" ? " Kalp" : " Yüz"),
        answers: [],
      };
    });
    props.changeOptionsOrder(props.id, newOptions);
  }

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };
  const [questionExpanded, set_questionExpanded] = useState(false);
  const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
      color: theme.palette.action.disabled,
    },
  }));
  return (
    <div
      style={{
        height: questionExpanded ? "70%" : "40px",
        border: "1px solid #12065c",
        transition: "height 2s",
      }}
      className="mb-2"
    >
      <div className="d-flex gap-1 col">
        <Button
          variant="contained"
          className="gap-2 justify-content-start"
          style={{ textTransform: "none" }}
          onMouseEnter={() => set_questionExpanded((prev) => !prev)}
        >
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
          <div className="ms-auto me-4 d-flex">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                props.deleteQuestion(props.id);
              }}
            >
              <DeleteOutlineIcon fontSize="small"></DeleteOutlineIcon>
            </Button>

            <Button
              onClick={(e) => {
                e.stopPropagation();

                props.changeOrder(props.id, -1);
              }}
            >
              <ArrowUpwardIcon fontSize="small"></ArrowUpwardIcon>
            </Button>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                props.changeOrder(props.id, 1);
              }}
            >
              <ArrowDownwardIcon fontSize="small"></ArrowDownwardIcon>
            </Button>
          </div>
        )}
      </div>
      <Card
        style={{
          height: questionExpanded ? "200px" : "0px",
          visibility: questionExpanded ? "visible" : "hidden",
          transition: "height 2s",
          border: "none",
          boxShadow: "none",
        }}
      >
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
              {props.question.type !== "değerlendirme" ? (
                props.question.options.map((option, index) => (
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
                ))
              ) : ratingEmoji.type !== "yüz" ? (
                <Rating
                  name="değerlendirme-emoji"
                  value={ratingEmoji.selected}
                  max={props.question.options.length}
                  onChange={(event, newValue) => {
                    set_ratingEmoji((prev) => ({
                      ...prev,
                      selected: newValue,
                    }));
                  }}
                  sx={
                    ratingEmoji.type === "kalp" && {
                      "& .MuiRating-iconFilled": {
                        color: "#ff6d75",
                      },
                      "& .MuiRating-iconHover": {
                        color: "#ff3d47",
                      },
                    }
                  }
                  icon={
                    ratingEmoji.type === "yıldız" ? (
                      <StarIcon fontSize="inherit"></StarIcon>
                    ) : (
                      <FavoriteIcon fontSize="inherit" />
                    )
                  }
                  emptyIcon={
                    ratingEmoji.type === "yıldız" ? (
                      <StarIcon fontSize="inherit"></StarIcon>
                    ) : (
                      <FavoriteBorderIcon fontSize="inherit"></FavoriteBorderIcon>
                    )
                  }
                  size="large"
                />
              ) : (
                <div className="d-flex gap-4 ">
                  <StyledRating
                    size="large"
                    name="highlight-selected-only"
                    IconContainerComponent={IconContainer}
                    highlightSelectedOnly
                    value={faceText}
                    onChange={(event, value) => set_faceText(value)}
                    onChangeActive={(event, newHover) => {
                      set_faceTextHover(newHover);
                    }}
                  />
                  <p>
                    {faceText > 0 &&
                      faceValues[
                        faceTextHover !== -1 ? faceTextHover : faceText
                      ]}
                  </p>
                </div>
              )}
            </div>

            <div className="d-flex mt-3 justify-content-between">
              {props.question.type === "seçenek" ? (
                <Button onClick={addOption} variant="text">
                  <AddCircleOutlineIcon className="me-1"></AddCircleOutlineIcon>
                  Yeni Seçenek
                </Button>
              ) : props.question.type === "değerlendirme" ? (
                <div className="d-flex" style={{ flex: "1" }}>
                  <FormControl style={{ flex: "0.2" }} className="ms-3 mt-3">
                    <InputLabel id="demo-simple-select-label">
                      En fazla
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(event) =>
                        changeYıldızSayısı(event.target.value, ratingEmoji.type)
                      }
                      label="En fazla"
                      value={props.question.options.length}
                      disabled={ratingEmoji.type === "yüz"}
                    >
                      <MenuItem value={1}>1</MenuItem>

                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>

                      {ratingEmoji.type !== "yüz" &&
                        Array.from({ length: 5 }, (_, index) => {
                          return (
                            <MenuItem value={index + 6}>{index + 6}</MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                  <FormControl className="ms-3 mt-3">
                    <InputLabel id="demo-simple-select-label">Emoji</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(event) => {
                        set_ratingEmoji((prev) => ({
                          selected:
                            event.target.value === "yüz" ? 2 : prev.selected,
                          type: event.target.value,
                        }));
                        changeYıldızSayısı(
                          event.target.value === "yüz"
                            ? 5
                            : props.question.options.length,
                          event.target.value,
                        );
                      }}
                      label="Emoji"
                      value={ratingEmoji.type}
                    >
                      <MenuItem value={"yıldız"}>Yıldız</MenuItem>
                      <MenuItem value={"kalp"}>Kalp</MenuItem>
                      <MenuItem value={"yüz"}>Yüz</MenuItem>
                    </Select>
                  </FormControl>
                </div>
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
                          : props.question.limit,
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
                        event.target.value,
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
      )
    </div>
  );
}

export default Question;
