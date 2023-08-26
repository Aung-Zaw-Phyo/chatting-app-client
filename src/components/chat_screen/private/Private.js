import React, { useEffect } from "react";
import Header from "./Header";
import Message from "./Message";
import { useDispatch } from "react-redux";
import { privateActions } from "../../../store/private-slice";

const Private = ({data}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(privateActions.chatInit(data.messages))
    }, [data, dispatch])
    return (
        <>
            <Header user={data.to_account} />
            <Message totalItems={data.totalItems}/>
        </>
    );
};

export default Private;
