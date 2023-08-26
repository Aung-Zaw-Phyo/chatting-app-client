import React, { Suspense } from "react";
import GroupChatHeader from "./GroupChatHeader";
import { Await } from "react-router-dom";
import ComponentLoading from "../../UI/ComponentLoading";
import ComponentError from "../../UI/ComponentError";
import GroupList from "./GroupList";

const GroupChat = ({loadedData}) => {
    return (
        <>
            <GroupChatHeader/>
            <section className="p-5 overflow-y-scroll overflow-x-hidden no-scrollbar" style={{ height: 'calc(100vh - 140px)' }}>
                <div className="h-full">
                    <Suspense fallback={<ComponentLoading/>}>
                        <Await resolve={loadedData.data} errorElement={<ComponentError/>}>
                            {(data) => <GroupList data={data.data}/> }
                        </Await>
                    </Suspense>
                </div>
            </section>
        </>
    );
};

export default GroupChat;
