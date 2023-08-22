import React from "react";

const Profile = (props) => {
    const user = props.data.user
    return (
        <section className="p-5">
            <h1 className="text-[22px] mb-5">My Profile</h1>
            <div className="flex flex-col items-center w-full">
                <img src={user.image} className="w-[100px] h-[100px] rounded-full mb-3" alt="" />
                <h1 className="mb-1">{user.name}</h1>
                <p className="text-[#ffffffa4]">{user.email}</p>
            </div>
        </section>
    );
};

export default Profile;
