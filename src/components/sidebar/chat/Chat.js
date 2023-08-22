import React, { Suspense } from "react";
import ChatHeader from "./ChatHeader";
import ComponentLoading from "../../UI/ComponentLoading";
import { Await } from "react-router-dom";
import ComponentError from "../../UI/ComponentError";
import UserList from "./UserList";

const Chat = ({loadedData}) => {
    return (
        <>
            <ChatHeader/>
            <section className="p-5 overflow-y-scroll overflow-x-hidden no-scrollbar" style={{ height: 'calc(100vh - 140px)' }}>
                <div className="h-full">
                    <Suspense fallback={<ComponentLoading/>}>
                        <Await resolve={loadedData.data} errorElement={<ComponentError/>}>
                            {(data) => <UserList users={data.data.users}/> }
                        </Await>
                    </Suspense>
                    
                </div>
            </section>
        </>
    );
};

export default Chat;
