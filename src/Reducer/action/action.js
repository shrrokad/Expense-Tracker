export const SENDDATA = (item) => {
    return{
        type:"TRACKERDATA",
        data:item,
        isHttpsAction : true,
        url:"/expenses-tracker.json",
        method: "POST"
    }
}

export const DELETEDATA = (item) => {
    return{
        type:"TDELETEDATA",
        data:item,
        isHttpsAction : true,
        url:`/expenses-tracker/${item}.json`,
        method: "DELETE"
    }
}

export const UPDATEDATA = (UPDATE_VALUE, id) => {
    return{
        type:"UPDATEDATA",
        data:UPDATE_VALUE,
        isHttpsAction : true,
        url:`/expenses-tracker/${id}.json`,
        method: "PATCH"
    }
}