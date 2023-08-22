import { io } from "socket.io-client";


let socket;

export const initSocket = (http) => {
    socket = io(http)
    return socket
} 

export const getSocket = () => {
    return socket
}