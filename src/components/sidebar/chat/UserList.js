import React, { useEffect } from "react";
import User from "./User";
import {getSocket} from '../../../Socket'
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui-slice";

const UserList = ({data}) => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.ui.users)

    useEffect(() => {
        dispatch(uiActions.initUsers(data.users))
        const socket = getSocket()
        data.groups.forEach(group => {
            // console.log(group.id)
            socket.emit('join-room', group.id);
        })
        return () => {
            socket.on('disconnect')
        }
    }, [data, dispatch]);

    return (
        <>
            {
                users.map(user => (
                    <User user={user} key={user.id}/>
                ))
            }
        </>
    );
};

export default UserList;
