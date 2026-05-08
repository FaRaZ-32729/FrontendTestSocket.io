import DeviceCard from "../component/DeviceCard";
import { useDevices } from "../context/DeviceContext";

const Dashboard = () => {
    const { devices, loading, error, fetchDevices } = useDevices();

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Devices</h1>
                <a
                    href="/add-device"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition flex items-center gap-2"
                >
                    + Add New Device
                </a>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6">
                    {error}
                    <button
                        onClick={fetchDevices}
                        className="ml-4 underline hover:no-underline"
                    >
                        Retry
                    </button>
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 mt-4">Loading devices...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* {Array.isArray(devices) && devices.length > 0 ? (
                        devices.map((device) => (
                            <DeviceCard
                                key={device._id || device.deviceId}
                                device={device}
                            />
                        ))
                    ) : (
                        !loading && !error && (
                            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-gray-100">
                                <p className="text-6xl mb-4">📡</p>
                                <p className="text-xl text-gray-400">No devices found</p>
                            </div>
                        )
                    )} */}
                    {devices.map((device) => (
                        <DeviceCard
                            key={device._id || device.deviceId}
                            device={device}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;