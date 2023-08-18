import React from "react";
import { NavLink } from "react-router-dom";

const UserList = ({users}) => {
    return (
        <>
            {
            users.map(user => (
                <NavLink key={user.id}
                    className={({isActive}) => isActive ? 'bg-[#36404A]': ''}
                    to={`/${user.id}`}
                >
                    <div className="flex items-center py-2 rounded cursor-pointer hover:bg-[#36404A] duration-300">
                        <img className="w-[45px] h-[45px] rounded-full mr-3" src={user.image} alt="" />
                        <div>
                            <h1>{user.name}</h1>
                            <p className="text-[12px]">{user.email}</p>
                        </div>
                    </div>
                </NavLink>
            ))
        }
        </>
    );
};

export default UserList;
