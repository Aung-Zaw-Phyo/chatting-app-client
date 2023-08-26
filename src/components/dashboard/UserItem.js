import React from "react";
import { Link } from "react-router-dom";

const UserItem = ({user}) => {
    return (
        <Link to={`/admin/detail/${user.id}`}>
            <div className="bg-[#36404A] rounded-lg flex flex-col justify-center items-center p-3">
                <img className="w-[120px] h-[120px] rounded-full mb-3" src={user.image} alt="" />
                <h1 className="text-[20px] mb-1">{user.name}</h1>
                <p className="">{user.email}</p>
            </div>
        </Link>
    );
};

export default UserItem;
