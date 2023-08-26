import React, { useEffect } from "react";
import GroupItem from "./GroupItem";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui-slice";

const GroupList = ({data}) => {
    const dispatch = useDispatch()
    const groups = useSelector(state => state.ui.groups)
    useEffect(() => {
        dispatch(uiActions.initGroups(data.groups))
    }, [data, dispatch]);
    return (
        <>
            {
                groups.map(group => (
                    <GroupItem group={group} key={group.id}/>
                ))
            }
        </>
    );
};

export default GroupList;
