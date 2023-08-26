import React from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const CloseSideBar = (params) => {
    const dispatch = useDispatch()
    const classes = `${params.className} md:hidden cursor-pointer text-[#ffffff76] hover:text-[white] duration-300`
    return (
        <AiOutlineMenuFold size={25}  className={classes}
            onClick={() => dispatch(uiActions.sideBarChangeHandler(false))}
        />
    );
};

export default CloseSideBar;
