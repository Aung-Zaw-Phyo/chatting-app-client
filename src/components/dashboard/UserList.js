import React from "react";
import UserItem from "./UserItem";

const UserList = (props) => {
    const users = props.data.data.users
    return (
        <div className="grid grid-cols-4 gap-3">
            {
                users && users.map(user => (
                    <UserItem key={user.id} user={user}/>
                ))
            }
        </div>
    );
};

export default UserList;
