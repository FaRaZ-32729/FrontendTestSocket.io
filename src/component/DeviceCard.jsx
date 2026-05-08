const DeviceCard = ({ device }) => {
  const isOnline = device.connectionStatus === "ONLINE";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{device.deviceId}</h3>
            <p className="text-sm text-gray-500 mt-1">{device.name || "Smart Device"}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isOnline
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
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

        <div className="mt-4 flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-500">Power: </span>
            <span className={`font-medium ${device.powerStatus === "ON" ? "text-emerald-600" : "text-orange-600"}`}>
              {device.powerStatus || "UNKNOWN"}
            </span>
          </div>
          <div className="text-gray-400 text-xs">
            {device.lastUpdateTime && new Date(device.lastUpdateTime).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;