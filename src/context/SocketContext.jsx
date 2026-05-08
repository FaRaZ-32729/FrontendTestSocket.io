import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

// Use empty string if using Vite proxy, otherwise full URL
const SOCKET_URL = backendUrl;

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        console.log("🔌 Attempting Socket.io connection to:", SOCKET_URL);

        const socketInstance = io(SOCKET_URL, {
            transports: ['polling', 'websocket'],     // Polling first = more reliable
            withCredentials: true,
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 1500,
            timeout: 30000,
            forceNew: true,
        });

        socketInstance.on("connect", () => {
            console.log("✅ SOCKET CONNECTED SUCCESSFULLY");
            setIsConnected(true);
        });

        socketInstance.on("disconnect", (reason) => {
            console.log("🔴 Socket Disconnected:", reason);
            setIsConnected(false);
        });

        socketInstance.on("connect_error", (err) => {
            console.error("❌ Socket Connect Error:", err.message);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};