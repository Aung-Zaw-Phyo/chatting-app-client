import { defer, json } from "react-router-dom"
import { getAuth } from "./helper";

const loader = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/chat/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuth().token
        }
    })

    if(response.status === 401) {
        throw json({message: 'Something wrong.'}, {status: 500})
    }

    if(!response.ok) {
        throw json({message: 'Something wrong.'}, {status: 500})
    }

    const resData = await response.json()
    return resData
}

export const usersLoader = () => {
    return defer({
        data: loader(),
    })
}