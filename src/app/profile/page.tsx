"use client";

import { Cog, Sun, CloudRain } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from 'react-hot-toast'
import { useRouter } from "next/navigation";

export default function MainPage() {
    const router = useRouter()

    const citiesData = [
        { name: "Delhi", latitude: 28.6139, longitude: 77.2090 },
        { name: "Mumbai", latitude: 19.0760, longitude: 72.8777 },
        { name: "Chennai", latitude: 13.0827, longitude: 80.2707 },
        { name: "Bangalore", latitude: 12.9716, longitude: 77.5946 },
        { name: "Kolkata", latitude: 22.5726, longitude: 88.3639 }
    ];

    const [selectedCity, setSelectedCity] = useState(citiesData[0]);
    const [weatherData, setWeatherData] = useState(null);
    const [notifications, setNotifications] = useState([]);

    // Fetch weather data when the selected city changes
    useEffect(() => {
        async function fetchWeatherData() {
            try {
                const params = {
                    "latitude": selectedCity.latitude,
                    "longitude": selectedCity.longitude,
                    "hourly": ["temperature_2m", "apparent_temperature", "precipitation_probability", "precipitation", "rain"]
                };
                const url = "https://api.open-meteo.com/v1/forecast";
                const response = await axios.get(url, { params });
                const hourly = response.data.hourly;

                const weatherData = {
                    time: hourly.time.map((t) => new Date(t).toISOString()),
                    temperature2m: hourly.temperature_2m,
                    apparentTemperature: hourly.apparent_temperature,
                    precipitation: hourly.precipitation
                };
                setWeatherData(weatherData);

            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        }
        fetchWeatherData();
    }, [selectedCity]);

    // Fetch notifications from the backend
    useEffect(() => {
        async function fetchAlerts() {
            try {
                // Fetch the alerts from the backend
                const response = await axios.get('http://localhost:3000/alerts');
                console.log('Alerts fetched:', response.data); // Log the response to verify
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching alerts:', error);
            }
        }
        fetchAlerts();
    }, []);


    const Logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("Logged out successful")
            router.push('/login')
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message)
            } else {
                toast.error("Unexpeced Error")
            }
        }
    }


    return (
        <div className="bg-black text-white p-8 h-screen w-screen">
            <div className="grid grid-cols-12 gap-3 h-full w-full">
                {/* Cities Panel */}
                <div className="col-span-2 bg-[#212121] rounded-3xl p-6 relative">
                    <div>

                        <h2 className="text-2xl font-bold mb-4">Cities</h2>
                        <ul className="space-y-2">
                            {citiesData.map((city, index) => (
                                <li
                                    key={index}
                                    className={`font-semibold ps-3  py-2 cursor-pointer ${selectedCity.name === city.name ? 'text-white bg-neutral-600 rounded-xl' : 'text-neutral-500'}`}
                                    onClick={() => setSelectedCity(city)}
                                >
                                    {city.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>

                        <button className="absolute text-white bg-red-500 rounded-xl py-2 px-14 font-semibold mt-4 left-7 bottom-5 " onClick={Logout}>Logout</button>
                    </div>

                </div>

                {/* Main Content */}
                <div className="col-span-7 grid grid-rows-8 gap-3">
                    {/* Map */}
                    <div className="row-span-3 bg-[#212121] rounded-3xl p-6 w-full">
                        <h2 className="text-3xl font-bold mb-4">Map</h2>
                        {/* Add map component here */}
                        <p className="text-gray-400">Map functionality will be added later.</p>
                    </div>

                    {/* Feels like sections */}
                    <div className="row-span-2 grid grid-cols-2 gap-3 w-full">
                        <div className="bg-[#212121] rounded-3xl p-6 flex items-center">
                            <Sun className="w-8 h-8 mr-4" />
                            <div>
                                <h2 className="text-xl font-bold mb-2">Current Temperature</h2>
                                {weatherData ? (
                                    <p className="text-lg">{weatherData.temperature2m[0]}°C</p>
                                ) : (
                                    <p className="text-gray-400">Loading...</p>
                                )}
                            </div>
                        </div>
                        <div className="bg-[#212121] rounded-3xl p-6 flex items-center">
                            <CloudRain className="w-8 h-8 mr-4" />
                            <div>
                                <h2 className="text-xl font-bold mb-2">Feels Like</h2>
                                {weatherData ? (
                                    <p className="text-lg">{weatherData.apparentTemperature[0]}°C</p>
                                ) : (
                                    <p className="text-gray-400">Loading...</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="row-span-3 bg-[#212121] rounded-3xl p-6 w-full">
                        <h2 className="text-2xl font-bold mb-4">Summary</h2>
                        {weatherData ? (
                            <div>
                                <p className="text-lg font-semibold">Temperature: {weatherData.temperature2m[0]}°C</p>
                                <p className="text-lg font-semibold">Apparent Temperature: {weatherData.apparentTemperature[0]}°C</p>
                                <p className="text-lg font-semibold">Precipitation: {weatherData.precipitation[0]} mm</p>
                            </div>
                        ) : (
                            <p className="text-gray-400">Loading...</p>
                        )}
                    </div>
                </div>

                {/* Notifications Panel */}
                <div className="col-span-3 bg-[#212121] rounded-3xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Notifications</h2>
                        <Cog className="w-6 h-6" />
                    </div>
                    <div className="space-y-4">
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <div key={index}>
                                    <p className="font-semibold">{notification.message}</p>
                                    <p className="text-sm text-gray-400">{new Date(notification.timestamp).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No notifications</p>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
