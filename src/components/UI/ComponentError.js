import React from "react";
import { useAsyncError } from "react-router-dom";

const ComponentError = () => {
    const error = useAsyncError()
    const message = error.message || 'Something wrong!' 
    return <p className="text-center py-6 text-[red]">{message}</p>
}

export default ComponentError;
