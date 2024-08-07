import React, { useEffect } from "react";
import Collapsible from 'react-collapsible';
import { Button, Collapse, RadioGroup, TextField } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { BarChart } from '@mui/x-charts/BarChart';
import { Height } from "@mui/icons-material";
import { PieChart } from '@mui/x-charts/PieChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon fontSize='large' color="error" />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon fontSize='large' color="error" />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon fontSize='large' color="warning" />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon fontSize='large' color="success" />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon fontSize='large' color="success" />,
        label: 'Very Satisfied',
    },
};
function SurveyResults(props) {
    const [resultGraphType, set_resultGraphType] = useState("bar")
    const [resultType, set_resultType] = useState(props.question.type === "metin" ? "tablo" : "grafik")
    const [questionsAnswered, set_questionAnswered] = useState();
    const [pieData, set_pieData] = useState([]);
    const faceValues = { 1: "Kesinlikle katılmıyorum", 2: "Katılmıyorum", 3: "Kararsızım", 4: "Katılıyorum", 5: "Kesinlikle katılıyorum" }
    
    const [tableData, set_tableData] = useState({});

    useEffect(() => {

        set_resultType(props.question.type === "metin" ? "tablo" : "grafik")
        var answered = true;
        console.log(props.dataSet);

        props.dataSet.forEach(element => {

            if (element["answeredAmount"] > 0) {
                answered = true;

            }
        })
        set_questionAnswered(answered);
        var pieTemp = []
        var tableTemp = { columns: [{ field: 'id', headerName: "Sicil" },], rows: [] }
        props.question.options.forEach((option, index) => {
            tableTemp.columns.push({
                field: option.name, headerName: option.name.split(" ")[1] !== "Yüz" ? option.name : faceValues[index + 1]  , flex: 1,


                valueGetter: (value) => {
                    if (!value) {
                        return ""
                    }
                    return props.question.type !== "metin" ? "işaretlenmiş" : value
                },

                renderCell: (params) => {
                    if (props.question.type === "metin") {
                        return params.row[option.name]
                    }
                    if (params.row[option.name] === true) {
                        return props.question.type !== "değerlendirme" ? <CheckBoxIcon></CheckBoxIcon> : option.name.split(" ")[1] === "Yüz" ? customIcons[index + 1].icon
                        :option.name.split(" ")[1] === "Yıldız" ? <StarIcon fontSize="large" style={{color:"#F3AA00"}}></StarIcon> : <FavoriteIcon fontSize="large" style={{color:'#ff6d75'}}></FavoriteIcon>;
                    }

                    return ""

                },
            })

            option.answers.forEach((answer, index) => {


                var previouslyAddedIndex = tableTemp.rows.length;
                tableTemp.rows.forEach((row, rowIndex) => {


                    if (row["id"] === answer) {
                        previouslyAddedIndex = rowIndex;
                    }
                })
                if (previouslyAddedIndex === tableTemp.rows.length) {


                    if (props.question.type === "metin") {
                        tableTemp.rows.push({ id: answer.sicil, [option.name]: answer.answerValue })

                    }
                    else {
                        tableTemp.rows.push({ id: answer, [option.name]: true })


                    }
                }
                else {

                    tableTemp.rows[previouslyAddedIndex][option.name] = true;
                }
            }

            )
        })
        set_tableData({ ...tableTemp });
        props.dataSet.forEach((element, index) => {

            pieTemp.push({ id: index, value: element.answeredAmount, label: element.barName.length < 30 ? String.fromCharCode(65 + index) + " " + element.barName : String.fromCharCode(65 + index) + " Uzun seçenek" })
        });
        set_pieData([...pieTemp])




    }, [props.page])

    const chartSetting = {
        yAxis: [{

            tickMinStep: 1,
        }],


        grid: { vertical: true },
    };





    function handleGraphChange(value) {

        set_resultGraphType(value);
    }

    return <div className="d-flex flex-column gap-2" style={{ flex: "1" }} >
        <div className="justify-content-center d-flex">
            <Tabs

                value={resultType}
                onChange={(event, newValue) => set_resultType(newValue)}
                style={{ fontSize: "small" }}
                aria-label="secondary tabs example"
                textColor="primary"
                indicatorColor="primary"

            >

                <Tab disabled={props.question.type === "metin"} icon={<InsertChartIcon></InsertChartIcon>} style={{ textTransform: "none", fontSize: "medium" }} className="me-1" value="grafik" />
                <Tab icon={<PersonOutlineIcon></PersonOutlineIcon>} style={{ textTransform: "none", fontSize: "medium" }} value="tablo" />

            </Tabs>
        </div>

        <div>
            {(resultType === "grafik" && props.question.type !== "metin") && <Tabs

                value={resultGraphType}
                onChange={(event, newValue) => handleGraphChange(newValue)}
                style={{ fontSize: "small" }}
                aria-label="secondary tabs example"
                textColor="primary"
                indicatorColor="primary"

            >
                <Tab icon={<EqualizerIcon style={{ rotate: "90deg" }}></EqualizerIcon>} style={{ textTransform: "none", fontSize: "medium" }} className="me-1" value="bar" />
                <Tab icon={<PieChartIcon></PieChartIcon>} style={{ textTransform: "none", fontSize: "medium" }} value="pie" />

            </Tabs>}
        </div>
        <div className="d-flex flex-column" style={{ flexGrow: "1", flexShrink: "0", flexBasis: "0" }}>

            {questionsAnswered ?
                (props.question.type !== "metin" && resultType === "grafik") ? resultGraphType === "bar" ?

                    <BarChart
                        dataset={props.dataSet}

                        xAxis={[
                            {
                                colorMap: {
                                    type: 'ordinal',
                                    colors: ['#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#08589e']
                                },

                                scaleType: "band",
                                dataKey: "barName",
                                categoryGapRatio: 0.3,


                            }
                        ]}
                        margin={{ left: 60, top: 100, right: 30 }}
                        series={
                            [{
                                dataKey: "answeredAmount",
                            }]
                            // props.question.options.map(option=>({dataKey:option.name,label:option.name}))
                        }
                        {...chartSetting}
                        barLabel={"value"}




                    />
                    :

                    <PieChart
                        margin={{ right: 200 }}
                        series={[
                            {
                                data: pieData,

                                arcLabel: (item) => `${item.label.split(" ")[0]} (${item.value})`,

                                arcLabelMinAngle: 45,

                            },
                        ]}

                    /> :
                    <DataGrid
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                                printOptions: {
                                    hideFooter: true,
                                    hideToolbar: true,
                                }
                            },

                        }}
                        sx={{ "& .MuiChartsAxis-tickLabel tspan": { fontSize: "2em" } }}
                        rows={tableData.rows}
                        columns={tableData.columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}

                        disableRowSelectionOnClick


                    />
                : <h1 style={{ flex: 1 }}>Bu soruya henüz cevap verilmemiş.</h1>
            }


        </div>
    </div>

}

export default SurveyResults