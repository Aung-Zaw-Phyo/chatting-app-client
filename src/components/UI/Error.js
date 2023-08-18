import React from "react";

const Error = (props) => {
  return (
    <>
        { props.error && <div className={`${props.className} p-2 text-center text-[red] mb-3`}>{props.error}</div> }
    </>
  );
};

export default Error;
