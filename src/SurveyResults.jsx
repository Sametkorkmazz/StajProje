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
function SurveyResults(props) {


    const [resultGraphType, set_resultGraphType] = useState("bar")
    const [resultType, set_resultType] = useState("grafik")
    const [questionsAnswered, set_questionAnswered] = useState(false);
    const [pieData, set_pieData] = useState([]);
    const [tableData, set_tableData] = useState({});
    useEffect(() => {
        for (let index = 0; index < props.dataSet.length; index++) {
            const element = props.dataSet[index];
            if (element.answeredAmount > 0) {
                set_questionAnswered(true)
                break;
            }

        }

        var pieTemp = []
        var tableTemp = { columns: [{ field: 'id', headerName: "Sicil" }], rows: [] }
        props.question.options.forEach((option, index) => {
            tableTemp.columns.push({ field: option.name, headerName: option.name, renderCell: () => <CheckBoxIcon /> })
            option.answers.forEach((answer, index) => {
                var index = tableTemp.rows.length;
                tableTemp.rows.forEach((row, index) => {
                    if (row["sicil"] ?? row["sicil"] === answer) {
                        index = row;
                    }
                })
                if (index === tableTemp.rows.length) {
                    tableTemp.rows.push({ id: answer, [option.name]: option.name })
                }
                else {
                    tableTemp.rows[index][option.name] = option.name;
                }
            }

            )
        })
        set_tableData({ ...tableTemp });
        props.dataSet.forEach((element, index) => {

            pieTemp.push({ id: index, value: element.answeredAmount, label: element.optionName.length < 30 ? String.fromCharCode(65 + index) + " " + element.optionName : String.fromCharCode(65 + index) + " Uzun seçenek" })
        });
        set_pieData([...pieTemp])




    }, [props.page])

    const chartSetting = {
        xAxis: [
            {
                label: 'Seçilme miktarı',



            },
        ],

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

                <Tab icon={<InsertChartIcon></InsertChartIcon>} style={{ textTransform: "none", fontSize: "medium" }} className="me-1" value="grafik" />
                <Tab icon={<PersonOutlineIcon></PersonOutlineIcon>} style={{ textTransform: "none", fontSize: "medium" }} value="tablo" />

            </Tabs>
        </div>

        <div>
            {resultType === "grafik" && <Tabs

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
                resultType === "grafik" ? resultGraphType === "bar" ?

                    <BarChart

                        margin={{ left: 150 }}
                        dataset={props.dataSet}
                        yAxis={[{
                            valueFormatter: (optionName, context) =>
                            (context.location === 'tick'
                                ? optionName.length > 30 ? "Uzun seçenek" : optionName : optionName)
                            ,
                            scaleType: 'band', dataKey: 'optionName'
                        }]}
                        series={[{
                            dataKey: 'answeredAmount',
                            label: (location) => {
                                if (location === "tooltip") {
                                    return `Seçilme miktarı`
                                }
                                return props.question.questionName
                            }
                        }]}
                        layout="horizontal"
                        {...chartSetting}
                        barLabel="value"



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
                            },

                        }}
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
                        checkboxSelection
                        disableRowSelectionOnClick
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                    />
                : <h1>Bu soruya henüz cevap verilmemiş.</h1>}


        </div>
    </div>

}

export default SurveyResults