import React, { useState } from 'react'
import './style.css'
import moment from 'moment'
import { SENDDATA } from '../Reducer/action/action'
import { useDispatch } from 'react-redux'
import Charts from './Charts2'
import { toast } from 'react-toastify'


const Form = () => {


    const INITIALSTATE = {
        discription: "",
        amount: "",
        date: "",
        month: ""
    }


    const dispatch = useDispatch()
    const [formdata, setFormdata] = useState(INITIALSTATE)
    // console.log(formdata, '---->formdata');

    const { discription, amount, date } = formdata


    const DATE = moment(date, "YYYY-MM-DD").format("DD-MM-YYYY")
    const MONTH = moment(date, "YYYY-MM-DD").format("MM")

    const handelchange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const handelNumber = (e) => {
        const value = e.target.value.replace(/\D/g, "")
        setFormdata({ ...formdata, [e.target.name]: value })
    }


    const handelsubmit = async (e) => {
        e.preventDefault()
        if (!discription && !amount && !date) {
            toast.warn("Please fill all field!", {
                position: toast.POSITION.TOP_LEFT
            });
        } else if (!/[0-9]/g.test(amount)) {
            toast.warn("Please Enter amount !", {
                position: toast.POSITION.TOP_LEFT
            });
        } else if(!date){
            toast.warn("Please Enter Date!", {
                position: toast.POSITION.TOP_LEFT
            });
        } else if(!discription){
            toast.warn("Please Enter discription!", {
                position: toast.POSITION.TOP_LEFT
            });
        } else{
            dispatch(SENDDATA({ ...formdata, date: DATE, month: parseInt(MONTH) }))
            setFormdata({
                discription: "",
                amount: "",
                date: "",
                month: ""
            })
        }
    }



    return (
        <>
            <div className="container mt-3">
                <div className='color'>
                    <h4>Expenses Tracker</h4>
                </div>
                <div className="form-border mt-3">
                    <div className="row">
                        <form onSubmit={(e) => handelsubmit(e)}>
                            <div className=' col-12'>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    name='discription'
                                    value={discription}
                                    placeholder="Expenses Description"
                                    onChange={(e) => handelchange(e)}
                                    autoComplete='off' />
                            </div>
                            <div className='d-flex mt-3'>
                                <div className=" col-lg-4 col-md-6 col-sm-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        name='amount'
                                        value={amount}
                                        placeholder="Amount"
                                        onChange={(e) => handelNumber(e)}
                                        autoComplete='off' />
                                </div>
                                <div className='col-lg-4 col-md-6 col-sm-12 mx-2'>
                                    <input
                                        type="date"
                                        id="floatingInput"
                                        className="form-control"
                                        name='date'
                                        value={date}
                                        placeholder="name@example.com"
                                        onChange={(e) => handelchange(e)} />
                                </div>
                                <div className='col-lg-4 col-md-6 col-sm-12 text-center'>
                                    <input type="submit" className='btn btn-color ' value="Submit" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* <Charts/> */}
            <Charts />
        </>
    )
}

export default Form
