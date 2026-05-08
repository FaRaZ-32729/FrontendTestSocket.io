import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDevices } from "../context/DeviceContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddDevice = () => {
    const { fetchDevices } = useDevices();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        deviceId: "",
        name: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(
                `${backendUrl}/device/create-device`,
                formData,
                { withCredentials: true }
            );
            alert("Device added successfully!");
            fetchDevices();
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Failed to add device");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-20 px-6">
            <div className="bg-white rounded-3xl shadow-lg p-10">
                <h2 className="text-3xl font-bold mb-8 text-center">Add New Device</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Device ID
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.deviceId}
                            onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                            placeholder="ESP32-001"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Device Name (Optional)
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Living Room Sensor"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-2xl transition disabled:opacity-70"
                    >
                        {loading ? "Adding Device..." : "Add Device"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDevice;