import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { uiActions } from "../../../store/ui-slice";
import { useDispatch } from "react-redux";
import { generateMailFormat, getAuth } from "../../../utils/helper";

const User = ({ user }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const userId = getAuth().id;
  const hidePicker = () => {
    dispatch(uiActions.emojiPickerHandler("HIDE"));
  };
  return (
    <>
      {userId !== user.id && (
        <NavLink
          key={user.id}
          className={`${
            user.id === id ? " bg-[#36404A] block rounded-lg " : ""
          }`}
          to={`/p/${user.id}`}
          onClick={hidePicker}
        >
          <div className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-[#36404A] duration-300">
            <img
              className="w-[45px] h-[45px] rounded-full mr-3"
              src={user.image}
              alt=""
            />
            <div>
              <h1>{user.name}</h1>
              <p className="text-[12px]">{generateMailFormat(user.email)}</p>
            </div>
          </div>
        </NavLink>
      )}
    </>
  );
};

export default User;
