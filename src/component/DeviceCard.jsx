// const DeviceCard = ({ device }) => {
//   const isOnline = device.connectionStatus === "ONLINE";

//   return (
//     <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
//       <div className="p-6">
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="text-xl font-semibold text-gray-800">{device.deviceId}</h3>
//             <p className="text-sm text-gray-500 mt-1">{device.name || "Smart Device"}</p>
//           </div>
//           <span
//             className={`px-3 py-1 rounded-full text-xs font-medium ${
//               isOnline
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {device.connectionStatus}
//           </span>
//         </div>

//         <div className="mt-6 grid grid-cols-2 gap-4">
//           <div className="bg-gray-50 rounded-xl p-4">
//             <p className="text-xs text-gray-500">Temperature</p>
//             <p className="text-2xl font-semibold text-gray-800 mt-1">
//               {device.temperature ? `${device.temperature}°C` : "--"}
//             </p>
//           </div>
//           <div className="bg-gray-50 rounded-xl p-4">
//             <p className="text-xs text-gray-500">Humidity</p>
//             <p className="text-2xl font-semibold text-gray-800 mt-1">
//               {device.humidity ? `${device.humidity}%` : "--"}
//             </p>
//           </div>
//         </div>

//         <div className="mt-4 flex items-center justify-between text-sm">
//           <div>
//             <span className="text-gray-500">Power: </span>
//             <span className={`font-medium ${device.powerStatus === "ON" ? "text-emerald-600" : "text-orange-600"}`}>
//               {device.powerStatus || "UNKNOWN"}
//             </span>
//           </div>
//           <div className="text-gray-400 text-xs">
//             {device.lastUpdateTime && new Date(device.lastUpdateTime).toLocaleTimeString()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeviceCard;

const backendUrl = import.meta.env.VITE_BACKEND_URL;

import { useState } from "react";
import axios from "axios";

const DeviceCard = ({ device }) => {
  const isOnline = device.connectionStatus === "ONLINE";
  const isPowerOn = device.powerStatus === "ON";

  const [isToggling, setIsToggling] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handlePowerToggle = async () => {
    if (!isOnline) return;

    setIsToggling(true);
    const newStatus = isPowerOn ? "OFF" : "ON";

    try {
      const res = await axios.post(
        `${backendUrl}/device/control-power`,
        {
          deviceId: device.deviceId,
          powerStatus: newStatus
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        showToast(`✅ Power turned ${newStatus}`, "success");
      }
    } catch (error) {
      console.error(error);
      showToast("❌ Failed to send command", "error");
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 relative">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`absolute top-3 right-3 px-4 py-2 rounded-xl text-sm font-medium shadow-lg z-50 transition-all ${toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
            }`}
        >
          {toast.message}
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{device.deviceId}</h3>
            <p className="text-sm text-gray-500 mt-1">{device.name || "Smart Device"}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${isOnline ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
          >
            {device.connectionStatus}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500">Temperature</p>
            <p className="text-2xl font-semibold text-gray-800 mt-1">
              {device.temperature ? `${device.temperature}°C` : "--"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500">Humidity</p>
            <p className="text-2xl font-semibold text-gray-800 mt-1">
              {device.humidity ? `${device.humidity}%` : "--"}
            </p>
          </div>
        </div>

        {/* Power Control Section */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <span className="text-gray-500">Power Status: </span>
            <span className={`font-semibold ${isPowerOn ? "text-emerald-600" : "text-orange-600"}`}>
              {device.powerStatus || "OFF"}
            </span>
          </div>

          <button
            onClick={handlePowerToggle}
            disabled={!isOnline || isToggling}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all min-w-[110px] ${isPowerOn
                ? "bg-red-500 hover:bg-red-600"
                : "bg-emerald-500 hover:bg-emerald-600"
              } text-white disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
          >
            {isToggling ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Sending...
              </>
            ) : (
              isPowerOn ? "TURN OFF" : "TURN ON"
            )}
          </button>
        </div>

        <div className="text-gray-400 text-xs mt-4">
          Last Updated: {device.lastUpdateTime ? new Date(device.lastUpdateTime).toLocaleTimeString() : "--"}
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;