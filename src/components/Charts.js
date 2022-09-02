import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import './style.css'
import Alldata from './Alldata'

const Charts = () => {

    const INITIALSTATE = [
        {
            month: 1,
            data: [],
            amount: [],
            total: 0
        },
        {
            month: 2,
            data: [],
            amount: [],
            total: 0
        },
        {
            month: 3,
            data: [],
            amount: [],
            total: 0
        },
        {
            month: 4,
            data: [],
            amount: [],
            total: 0
        },
        {
            month: 5,
            data: [],
            amount: [],
            total: 0
        },
        {
            month: 6,
            data: [],
            amount: [],
            total: 0
        },
        {
            month: 7,
            data: [],
            amount: [],
            total: 0
        },
        {
            month: 8,
            data: [],
            amount: [],
            total: 0
        },
        {
            month: 9,
            data: [],
            amount: [],
            total: 0
        },
        {
            month: 10,
            data: [],
            amount: [],
            total: 0
        },
        {
            month: 11,
            data: [],
            amount: [],
            total: 0
        },
        {
            month: 12,
            data: [],
            amount: [],
            total: 0
        }
    ]

    const [getalldata, setGetalldata] = useState()
    const [inputvalue, setInputvalue] = useState()
    const [allfinaldata, setAllfinaldata] = useState()
    const [stateData, setStateData] = useState()


    const getapidata = async () => {
        const resultdata = await axios.get('https://expense-tracker-6953c-default-rtdb.firebaseio.com/expenses-tracker.json')
        setGetalldata(Object.values(resultdata.data))

        const key = Object.keys(resultdata.data).map((data) => {return {...resultdata.data[data], _id:data}})
        setGetalldata(key)
    }

    const MONTH = []
    const YEAR = []

    getalldata?.map((data) => {
        const mm = moment(data.date, "DD-MM-YYYY").format("MM")

        if (!MONTH.includes(mm)) {
            MONTH.push(mm)
        }

        const YYY = moment(data.date, "DD-MM-YYYY").format("YYYY")
        if (!YEAR.includes(YYY)) {
            YEAR.push(YYY)
        }
    })

    const handelchange = async (e) => {
        setInputvalue(e.target.value)
    }


    const ALL_DATA = []
    const ALL_MONTH = []

    const filteringdata = () => {
        const Filterapidata = getalldata?.filter((data) => moment(data.date, "DD-MM-YYYY").format("YYYY") == inputvalue)
        console.log(Filterapidata, '---->Filterapidata');

        Filterapidata?.filter((data) => {
            const getmonth = moment(data.date, "DD-MM-YYYY").format("MM")

            if(MONTH.includes(getmonth)){
                ALL_DATA.push(data)
            }

            if(!ALL_MONTH.includes(moment(data.date, "DD-MM-YYYY").format("MMMM"))){
                ALL_MONTH.push(moment(data.date, "DD-MM-YYYY").format("MMMM"))
            }
        })

        console.log(ALL_DATA, '--->ALL_DATA');
        console.log(ALL_MONTH, '--->ALL_MONTH');
        Allfinaldata(ALL_DATA)
    }

    

    const Allfinaldata = (ALL_DATA) => {

        ALL_DATA.map((data) => {
            INITIALSTATE?.map((element) => {
                if (element.month == data.month) {
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
            INITIALSTATE[i].range = eval(e)
            FINAL_DATA.push(e)
        }
    }

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
                        <select name="getyaer" id="cars" className='select-color'  onChange={(e) => handelchange(e)} >
                            {
                                YEAR?.map((data, index) => <option value={data} key={index} name='getyaer' className='option'>{data}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="outchart">
                    <div className="row">
                        {
                            allfinaldata == undefined ?
                                stateData?.map((data, index) =>
                                    <div className="col-1 px-1 px-md-4 mt-3" key={index} >
                                        <div className="progress" style={{ height: "400px", position: "relative" }} >
                                            <div className="real-time-progress bg-dark rounded progress-bar-striped progress-bar-animated shadow" style={{ height: `${data}%`, width: "100%", position: "absolute", bottom: "0" }}>
                                            </div>
                                        </div>
                                        <h6 className='text-center mt-3'>{moment(data.month, "MM").format("MMM")}</h6>
                                    </div>
                                ) :
                                allfinaldata?.map((data, index) =>
                                    <div className='col-1 px-1 px-md-4 mt-3' key={index}>
                                        <div className='progress' style={{ height: "400px", position: "relative" }}>
                                            <div className='real-time-progress rounded progress-bar-striped progress-bar-animated shadow' style={{ height: `${data.range}%`, width: "100%", position: "absolute", bottom: "0", backgroundColor: "#6C3483"}}></div>
                                        </div>
                                        <h6 className='text-center mt-3'>{moment(data.month, "MM").format("MMM")}</h6>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
            {/* <Alldata year={YEAR} month={month} all_data={year} function={getapidata}/> */}
        </>
    )
}

export default Charts
