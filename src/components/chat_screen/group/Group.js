import React, { useEffect } from "react";
import Header from "./Header";
import Message from "./GroupMessage";
import { useDispatch } from "react-redux";
import { groupActions } from "../../../store/group-slice";
import { getSocket } from "../../../Socket";
import { useParams } from "react-router-dom";

const Group = ({data}) => {
    const dispatch = useDispatch()
    const params = useParams()
    const group_id = params.id

    useEffect(() => {
        const socket = getSocket()
        socket.emit('join-room', group_id);
    }, [group_id])

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
