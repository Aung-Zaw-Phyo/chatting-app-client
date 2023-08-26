import { defer, json } from "react-router-dom"

const loader = async () => {
    const response = await fetch('http://localhost:5000/chat/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

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