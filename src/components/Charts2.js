import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import './style.css'
import Alldata from './Alldata'
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts'

const Charts = () => {

    const INITIALSTATE = [
        {
            month: "January",
            data: [],
            amount: [],
            total: 0,
            range: 0
        },
        {
            month: "February",
            data: [],
            amount: [],
            total: 0,
            range: 0
        },
        {
            month: "March",
            data: [],
            amount: [],
            total: 0,
            range: 0
        },
        {
            month: "April",
            data: [],
            amount: [],
            total: 0,
            range: 0
        },
        {
            month: "May",
            data: [],
            amount: [],
            total: 0,
            range: 0
        },
        {
            month: "June",
            data: [],
            amount: [],
            total: 0,
            range: 0
        },
        {
            month: "July",
            data: [],
            amount: [],
            total: 0,
            range: 0
        },
        {
            month: "Auguat",
            data: [],
            amount: [],
            total: 0,
            range: 0
        },
        {
            month: "September",
            data: [],
            amount: [],
            total: 0,
            range: 0
        },
        {
            month: "October",
            data: [],
            amount: [],
            total: 0,
            range: 0
        },
        {
            month: "November",
            data: [],
            amount: [],
            total: 0,
            range: 0
        },
        {
            month: "December",
            data: [],
            amount: [],
            total: 0,
            range: 0
        }
    ]

    const [getalldata, setGetalldata] = useState()
    const [inputvalue, setInputvalue] = useState()
    const [allfinaldata, setAllfinaldata] = useState()
    const [stateData, setStateData] = useState()
    const [alldata, setAlldata] = useState()
    const [staticdata, setStaticdata] = useState([])

    const getapidata = async () => {
        const resultdata = await axios.get('https://expense-tracker-6953c-default-rtdb.firebaseio.com/expenses-tracker.json')
        setGetalldata(Object.values(resultdata.data))

        const key = Object.keys(resultdata.data).map((data) => { return { ...resultdata.data[data], _id: data } })
        setGetalldata(key)
        return resultdata.data
    }

    const MONTH = []
    const YEAR = []

    if (!getalldata) {
        YEAR.push(new Date().getFullYear())
        getapidata()
    } else {
        getalldata?.map((data) => {
            const mm = moment(data.date, "DD-MM-YYYY").format("MMMM")

            if (!MONTH.includes(mm)) {
                MONTH.push(mm)
            }

            const YYY = moment(data.date, "DD-MM-YYYY").format("YYYY")
            if (!YEAR.includes(YYY)) {
                YEAR.push(YYY)
            }
        })
    }


    const handelchange = async (e) => {
        setInputvalue(e.target.value)
    }


    const ALL_DATA = []
    const ALL_MONTH = []

    const filteringdata = async () => {
        const Filterapidata = getalldata?.filter((data) => moment(data.date, "DD-MM-YYYY").format("YYYY") == inputvalue)

        Filterapidata?.filter((data) => {
            const getmonth = moment(data.date, "DD-MM-YYYY").format("MMMM")

            if (MONTH.includes(getmonth)) {
                ALL_DATA.push(data)
            }

            if (!ALL_MONTH.includes(moment(data.date, "DD-MM-YYYY").format("MMMM"))) {
                ALL_MONTH.push(moment(data.date, "DD-MM-YYYY").format("MMMM"))
            }
        })

        Allfinaldata(ALL_DATA)
        setStateData(ALL_MONTH)
        setAlldata(ALL_DATA)


      await getapidata()

    }

    const Allfinaldata = (ALL_DATA) => {

        ALL_DATA.map((data) => {
            INITIALSTATE?.map((element) => {
                if (element.month == moment(data.month, "MM").format("MMMM")) {
                    element.data.push(data)
                }
            })
        })

        INITIALSTATE.map((data) => {
            const a = data.data.map((element) => {
                data.amount.push(eval(element.amount))

                for (let i = 0; i < data.amount.length; i++) {
                    data.total += data.amount[i]
                }
            })
        })

        setAllfinaldata(INITIALSTATE)
        Amountrate(INITIALSTATE)
    }

    const Amountrate = (INITIALSTATE) => {

        const getamount = INITIALSTATE.map((data) => {
            return data.total
        })


        const a = Math.max(...getamount)
        const b = a + ((a * 20) / 100)
        const FINAL_DATA = []

        for (let i = 0; i < getamount.length; i++) {
            const e = (getamount[i] * 100) / b
            INITIALSTATE[i].range = eval(e).toFixed(2)
            FINAL_DATA.push(e)
        }
    }


    const defultdata = () => {
        if (!inputvalue) {
            filteringdata()
        }

        const allstaticdata = []

        getalldata?.map((data) => {
            if (moment(data.date, "DD-MM-YYYY").format("YYYY") == YEAR[0]) {
                allstaticdata.push(data)
                setStaticdata(allstaticdata)
            }
        })

        allstaticdata.map((data1) => {
            INITIALSTATE.map((data) => {
                if (moment(data.month, "MMMM").format("MM") == data1.month) {
                    data.data.push(data1)

                    data.data.map((element) => {
                        data.amount.push(eval(element.amount))
                    })

                    for (let i = 0; i < data.amount.length; i++) {
                        data.total += data.amount[i]
                    }

                    const a = Math.max(data.total)
                    const b = a + ((a * 20) / 100)
                    const c = (data.total * 100) / b
                    data.range = eval(c).toFixed(2)
                    return data
                }
                return data
            })
        })

        return INITIALSTATE
    }



    // tooltip-charts

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`amount : ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    useEffect(() => {
        defultdata()
    }, [getalldata])

    useEffect(() => {
        getapidata()
    }, [MONTH])

    useEffect(() => {
        filteringdata()
    }, [inputvalue])


    return (
        <>
            <div className="container mt-3">
                <div className="row text-end">
                    <div className="col-12">
                        <select name="getyaer" id="cars" className='select-color' onClick={(e) => handelchange(e)} >
                            {
                                YEAR?.map((data, index) => <option value={data} key={index} name='getyaer' className='option'>{data}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="outchart">
                    <div className="row">
                        <ResponsiveContainer width="100%" aspect={3} className="mt-3">{
                            <BarChart
                                width={500}
                                height={300}
                                data={allfinaldata}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <ReferenceLine y={0} stroke="#000" />
                                <Bar dataKey="range" fill="#BB8FCE" />
                            </BarChart>
                        }
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <Alldata year={YEAR} month={stateData} all_data={alldata} apidata={getalldata} function={getapidata} charts={staticdata} />
        </>
    )
}

export default Charts
