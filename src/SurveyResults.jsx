import React from "react";
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
function SurveyResults(props) {


    const [resultGraphType, set_resultGraphType] = useState("bar")
    const [resultType, set_resultType] = useState("grafik")
    const [pieData, set_pieData] = useState([]);


    const chartSetting = {
        xAxis: [
            {
                label: 'Seçilme miktarı',
            },
        ],

        grid: { vertical: true },


    };
    var labelChar = "A"
    function createPieData() {
        var temp = []
        props.dataSet.forEach((element, index) => {
            console.log(element);
            temp.push({ id: index, value: element.answeredAmount, label: String.fromCharCode(65 + index) + " " + element.optionName })
        });
        console.log(temp);
        set_pieData([...temp])
    }

    function handleGraphChange(value) {
        if (value === "pie") {
            createPieData();
        }

        console.log(pieData);
        set_resultGraphType(value);
    }

    return <div className="d-flex flex-column" style={{ flex: "1" }} >
        <div className="">
            <Tabs

                value={resultType}
                onChange={(event, newValue) => set_resultType(newValue)}
                style={{ fontSize: "small" }}
                aria-label="secondary tabs example"
                textColor="primary"
                indicatorColor="primary"

            >

                <Tab icon={<InsertChartIcon></InsertChartIcon>} style={{ textTransform: "none", fontSize: "medium" }} className="me-1" value="grafik" />
                <Tab icon={<PersonOutlineIcon></PersonOutlineIcon>} style={{ textTransform: "none", fontSize: "medium" }} value="tablo" />

            </Tabs>
            <Tabs

                value={resultGraphType}
                onChange={(event, newValue) => handleGraphChange(newValue)}
                style={{ fontSize: "small" }}
                aria-label="secondary tabs example"
                textColor="primary"
                indicatorColor="primary"

            >
                <Tab icon={<EqualizerIcon style={{ rotate: "90deg" }}></EqualizerIcon>} style={{ textTransform: "none", fontSize: "medium" }} className="me-1" value="bar" />
                <Tab icon={<PieChartIcon></PieChartIcon>} style={{ textTransform: "none", fontSize: "medium" }} value="pie" />

            </Tabs>
        </div>
        <div className="d-flex flex-column" style={{ flexGrow: "1", flexShrink: "0", flexBasis: "0" }}>
            {resultGraphType === "bar" ?
                <BarChart

                    margin={{ left: 150 }}
                    dataset={props.dataSet}
                    yAxis={[{ scaleType: 'band', dataKey: 'optionName' }]}
                    series={[{ dataKey: 'answeredAmount', label: props.question.questionName }]}
                    layout="horizontal"
                    {...chartSetting}
                    barLabel="value"


                />
                : <div className="d-flex align-items-center" style={{ flex: "1" }}>

                    <h1 style={{color:"white"}}>{props.question.questionName}</h1>
                    <PieChart
                        series={[
                            {
                                data: pieData,
                                arcLabel: (item) => `${item.label.split(" ")[0]} (${item.value})`,

                                arcLabelMinAngle: 45,

                            },
                        ]}

                    /></div>}


        </div>
    </div>

}

export default SurveyResults