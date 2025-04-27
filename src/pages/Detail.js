import React, { Suspense } from "react";
import { Await, defer, json, useAsyncError, useLoaderData } from "react-router-dom";
import UserDetail from "../components/dashboard/UserDetail";
import { getAuth } from "../utils/helper";

const Error = () => {
    const error = useAsyncError()
    const message = error.message || 'Something wrong.'
    return (
        <div className="container py-32 text-center text-[red]">{message}</div>
    )
}

const Detail = () => {
    const loadedData = useLoaderData()
    return (
        <div className="container py-5">
            <Suspense fallback={<div className="container py-32 text-center">Loading</div>}>
                <Await resolve={loadedData.detail} errorElement={<Error/>}>
                    {(data) => <UserDetail data={data.data} />}
                </Await>
            </Suspense>
        </div>
    );
};

export default Detail;

const detailLoader = async (request, params) => {
    const status = getAuth().status;
    if(status !== 'admin') {
        throw json({message: 'Unauthorized!'}, {status: 403})
    }
    const id = params.id
    const response = await fetch(process.env.REACT_APP_API_URL + '/admins/user/' + id, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuth().token
        }
    })
    if(!response.ok) {
        throw response
    }

    const resDada = await response.json()
    return resDada
}

export const loader = async ({request, params}) => {
    return defer({
        detail: detailLoader(request, params)
    })
}
