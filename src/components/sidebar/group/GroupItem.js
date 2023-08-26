import React from "react";
import { NavLink, useParams } from "react-router-dom";

const GroupItem = ({group}) => {
    const params = useParams()
    const id = params.id
    return (
        <NavLink
            className={`${group.id === id ? ' bg-[#36404A] block rounded-lg ' : ''}`}
            to={`/g/${group.id}`}
        >
            <div className="flex items-center py-2 rounded-lg cursor-pointer hover:bg-[#36404A] duration-300">
                <img className="w-[45px] h-[45px] rounded-full mr-3" src={group.image} alt="" />
                <div>
                    <h1>{group.name}</h1>
                </div>
            </div>
        </NavLink>
    );
};

export default GroupItem;
