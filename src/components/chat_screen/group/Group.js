import React, { useEffect } from "react";
import Header from "./Header";
import Message from "./GroupMessage";
import { useDispatch } from "react-redux";
import { groupActions } from "../../../store/group-slice";

const Group = ({data}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(groupActions.chatInit(data.messages))
    }, [data, dispatch])
    return (
        <>
            <Header group={data.group} />
            <Message totalItems={data.totalItems} />
        </>
    );
};

export default Group;
