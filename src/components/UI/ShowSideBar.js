import React from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const ShowSideBar = () => {
    const dispatch = useDispatch()
    return (
        <AiOutlineMenuUnfold size={25} className="ms-4 md:hidden cursor-pointer text-[#ffffff76] hover:text-[white] duration-300"
            onClick={() => dispatch(uiActions.sideBarChangeHandler(true))}
        />
    );
};

export default ShowSideBar;
