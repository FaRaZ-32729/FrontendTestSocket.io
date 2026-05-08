// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useSocket } from "./SocketContext";

// const DeviceContext = createContext();

// export const useDevices = () => useContext(DeviceContext);

// const API_BASE = "http://localhost:6008/device";

// export const DeviceProvider = ({ children }) => {
//     const [devices, setDevices] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { socket } = useSocket();

//     const fetchDevices = async () => {
//         try {
//             setLoading(true);
//             setError(null);

//             const res = await axios.get(`${API_BASE}/all-devices`, {
//                 withCredentials: true
//             });

//             const deviceList = res.data?.devices || [];
//             setDevices(deviceList);
//         } catch (err) {
//             console.error(err);
//             setError("Failed to load devices");
//             setDevices([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Real-time updates
//     useEffect(() => {
//         if (!socket) return;

//         const handleUpdate = (updatedDevice) => {
//             setDevices(prev =>
//                 prev.map(device =>
//                     device.deviceId === updatedDevice.deviceId ? updatedDevice : device
//                 )
//             );
//         };

//         socket.on("deviceUpdate", handleUpdate);

//         return () => {
//             socket.off("deviceUpdate", handleUpdate);
//         };
//     }, [socket]);

//     useEffect(() => {
//         fetchDevices();
//     }, []);

//     return (
//         <DeviceContext.Provider value={{ devices, loading, error, fetchDevices }}>
//             {children}
//         </DeviceContext.Provider>
//     );
// };



import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSocket } from "./SocketContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const DeviceContext = createContext();

export const useDevices = () => useContext(DeviceContext);

const API_BASE = `${backendUrl}/device`;

export const DeviceProvider = ({ children }) => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { socket } = useSocket();

    // Fetch devices initially
    const fetchDevices = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await axios.get(`${API_BASE}/all-devices`, {
                withCredentials: true
            });

            const deviceList = res.data?.devices || res.data || [];
            setDevices(deviceList);
            console.log("📥 Initial devices loaded:", deviceList.length);
        } catch (err) {
            console.error(err);
            setError("Failed to load devices");
            setDevices([]);
        } finally {
            setLoading(false);
        }
    };

    // Real-time updates from Socket.io
    useEffect(() => {
        if (!socket) return;

        const handleDeviceUpdate = (updatedDevice) => {
            console.log("🔴 Real-time update received:", updatedDevice.deviceId);

            setDevices(prevDevices =>
                prevDevices.map(device =>
                    device.deviceId === updatedDevice.deviceId
                        ? { ...device, ...updatedDevice }
                        : device
                )
            );
        };

        socket.on("deviceUpdate", handleDeviceUpdate);

        return () => {
            socket.off("deviceUpdate", handleDeviceUpdate);
        };
    }, [socket]);

    // Initial fetch
    useEffect(() => {
        fetchDevices();
    }, []);

    return (
        <DeviceContext.Provider value={{
            devices,
            loading,
            error,
            fetchDevices
        }}>
            {children}
        </DeviceContext.Provider>
    );
};