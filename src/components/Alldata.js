import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import './style.css'
import { DELETEDATA } from '../Reducer/action/action'
import { useDispatch } from 'react-redux'
import { UPDATEDATA } from '../Reducer/action/action'

const Alldata = (props) => {

    const initialstate = {
        amount: '',
        discription: ''
    }

    // console.log(props.month, '--->props.month');
    const dishpatch = useDispatch()

    const [filterdata, setFilterdata] = useState()
    const [inputvalue, setInputvalue] = useState()
    const [eidtbutton, setEidtbutton] = useState(false)
    const [editdata, setEditdata] = useState(initialstate)
    // console.log(editdata, '--->editdata');


    const handelchange = (e) => {
        setInputvalue(e.target.value)
    }

    const outdata = () => {
        const filterdata = props.all_data?.filter((data) => moment(data.date, "DD-MM-YYYY").format("MMMM") == inputvalue)
        setFilterdata(filterdata)
    }

    const deletedata = async (e, id) => {
        dishpatch(DELETEDATA(id))
        handelchange({ target: { value: filterdata } })
        await props.function()
    }

    const handeledit = () => {
        setEidtbutton(true)
    }

    const handelsave = (e, key) => {
        setEidtbutton(false)

        const UPDATE_DATA = props.all_data.find((data) => data._id == key)
        const DataKey = UPDATE_DATA._id

        if (editdata.amount == '') {
            editdata.amount = UPDATE_DATA.amount
        } else {
            UPDATE_DATA.amount = editdata.amount
        }

        if (editdata.discription == '') {
            editdata.discription = UPDATE_DATA.discription
        } else {
            UPDATE_DATA.discription = editdata.discription
        }

        // delete UPDATE_DATA._id
        dishpatch(UPDATEDATA(UPDATE_DATA, DataKey))
        props.function()
    }

    const handelsave1 = (e, key) => {
        setEidtbutton(false)

        const UPDATE_DATA = props.charts.find((data) => data._id == key)
        const DataKey = UPDATE_DATA._id

        if (editdata.amount == '') {
            editdata.amount = UPDATE_DATA.amount
        } else {
            UPDATE_DATA.amount = editdata.amount
        }

        if (editdata.discription == '') {
            editdata.discription = UPDATE_DATA.discription
        } else {
            UPDATE_DATA.discription = editdata.discription
        }

        // delete UPDATE_DATA._id
        dishpatch(UPDATEDATA(UPDATE_DATA, DataKey))
        props.function()
    }

    const handelinput = (e, id) => {
        const finddata = props.all_data.find((data) => data._id == id)
        setEditdata(finddata)
        setEditdata({ ...editdata, [e.target.name]: e.target.value })
    }

    // console.log(props.charts, '----->charts');

    useEffect(() => {
        outdata()
    }, [inputvalue])

    return (
        <>
            <div className="container mt-3">
                <div className="row text-end">
                    <div className="col-12">{
                        !inputvalue ?
                            <select name="getyaer" id="cars" className='select-color' onClick={(e) => handelchange(e)}>
                                {
                                    !props.apidata ?

                                        <option value={new Date().getMonth()} name='getyaer' className='option'>{moment(new Date().getMonth() + 1, "MM").format("MMMM")}</option>
                                        :
                                        props.charts?.map((data) => <option value={data.month} key={data._id} name='getyaer' className='option' >{moment(data.month, "MM").format("MMMM")}</option>)
                                }
                            </select> :
                            <select name="getyaer" id="cars" className='select-color' onClick={(e) => handelchange(e)}>
                                {
                                    props.month?.map((data, index) => <option value={data} key={index} name='getyaer' className='option' >{data}</option>)
                                }
                            </select>
                    }
                    </div>
                </div>
                <div className="mt-3">
                    {
                        !inputvalue ?

                            props.charts?.map((data) =>
                                <div className="border-color my-3 " key={data._id}>
                                    <div className="d-flex">
                                        <div className="left-side col-lg-3 col-md-6 col-sm-12 me-3">
                                            <h3>{moment(data.date, "DD-MM-YYYY").format("DD")}</h3>
                                            <h4>{moment(data.date, "DD-MM-YYYY").format("MMMM")}</h4>
                                        </div>
                                        <div className="col-lg-9 col-md-6 col-sm-12">
                                            {
                                                !eidtbutton ?
                                                    <div>
                                                        <p className='amout'>{data.amount}</p>
                                                        <p className='amout' style={{ fontWeight: '400', fontSize: '17px', paddingTop: '20px' }}>{data.discription}</p>
                                                    </div> :
                                                    <div>
                                                        <input type='text' name='amount' defaultValue={data.amount} className='amout' onChange={(e) => handelinput(e, data._id)} />
                                                        <input type='text' name='discription' defaultValue={data.discription} className='amout my-3' onChange={(e) => handelinput(e, data._id)} style={{ fontWeight: '400', fontSize: '17px', paddingTop: '20px', marginBottom: '1rem' }} />
                                                    </div>
                                            }

                                            <div className='d-flex justify-content-end margin'>
                                                {
                                                    !eidtbutton ?
                                                        <p className='button1' onClick={(e) => handeledit(e, data._id)}>Edit</p> : <p className='button1' onClick={(e) => handelsave1(e, data._id)}>Save</p>
                                                }
                                                <p className='ms-3 button2' onClick={(e) => deletedata(e, data._id)}>Delete</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                            :
                            filterdata?.map((data) =>
                                <div className="border-color my-3 " key={data._id}>
                                    <div className="d-flex">
                                        <div className="left-side col-lg-3 col-md-6 col-sm-12 me-3">
                                            <h3>{moment(data.date, "DD-MM-YYYY").format("DD")}</h3>
                                            <h4>{moment(data.date, "DD-MM-YYYY").format("MMMM")}</h4>
                                        </div>
                                        <div className="col-lg-9 col-md-6 col-sm-12">
                                            {
                                                !eidtbutton ?
                                                    <div>
                                                        <p className='amout'>{data.amount}</p>
                                                        <p className='amout' style={{ fontWeight: '400', fontSize: '17px', paddingTop: '20px' }}>{data.discription}</p>
                                                    </div> :
                                                    <div>
                                                        <input type='text' name='amount' defaultValue={data.amount} className='amout' onChange={(e) => handelinput(e, data._id)} />
                                                        <input type='text' name='discription' defaultValue={data.discription} className='amout my-3' onChange={(e) => handelinput(e, data._id)} style={{ fontWeight: '400', fontSize: '17px', paddingTop: '20px', marginBottom: '1rem' }} />
                                                    </div>
                                            }

                                            <div className='d-flex justify-content-end margin'>
                                                {
                                                    !eidtbutton ?
                                                        <p className='button1' onClick={(e) => handeledit(e, data._id)}>Edit</p> : <p className='button1' onClick={(e) => handelsave(e, data._id)}>Save</p>
                                                }
                                                <p className='ms-3 button2' onClick={(e) => deletedata(e, data._id)}>Delete</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default Alldata
