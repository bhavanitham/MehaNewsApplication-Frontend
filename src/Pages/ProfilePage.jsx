import React, { useState, useEffect } from 'react';
import { FaPen, FaCheck, FaTimes } from 'react-icons/fa'; // Icon library for edit buttons

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editField, setEditField] = useState('');
    const [editValue, setEditValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchUserData = async () => {
        const id = localStorage.getItem('userId');
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL+`/userdata/${id}`);
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error); 
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...userData,
                    [editField]: editValue,
                })
            });
            if (response.ok) {
                setShowModal(false);
                await fetchUserData();
                alert('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Failed to update profile. Please try again.');
        }
        setIsLoading(false);
    };

    const notificationOptions = ['Hourly', 'Daily', 'Weekly', 'Monthly'];
    const preferenceOptions = ['Business', 'Sports', 'Health', 'Technology', 'Entertainment'];

    const togglePreference = (preference) => {
        if (editValue.includes(preference)) {
            setEditValue(editValue.filter(pref => pref !== preference));
        } else {
            setEditValue([...editValue, preference]);
        }
    };

    if (!userData) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    return (
        <div className="p-8 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Profile Information</h2>
            <div className="space-y-4">
                {['name', 'email', 'notificationInterval', 'preferences'].map((field) => (
                    <div key={field} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm">
                        <div className="text-gray-700">
                            <span className="font-semibold text-lg capitalize">{field}:</span> 
                            {field === 'preferences' 
                                ? userData[field].join(', ') 
                                : userData[field]}
                        </div>
                        <button
                            onClick={() => {
                                setEditField(field);
                                setEditValue(field === 'preferences' ? userData[field] : userData[field] || '');
                                setShowModal(true);
                            }}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                            <FaPen className="mr-2" /> Edit
                        </button>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className='bg-gray-500'>
                <div className="fixed inset-0 bg-red flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
                        <h3 className="text-xl font-semibold mb-4">Edit {editField}</h3>
                        {editField === 'preferences' ? (
                            <div className="space-y-2">
                                {preferenceOptions.map(option => (
                                    <div key={option} className="flex justify-between items-center p-2 border rounded">
                                        <span>{option}</span>
                                        <button
                                            onClick={() => togglePreference(option)}
                                            className={`px-4 py-2 rounded-lg transition ${
                                                editValue.includes(option)
                                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                                    : 'bg-green-500 text-white hover:bg-green-600'
                                            }`}>
                                            {editValue.includes(option) ? 'Unsubscribe' : 'Subscribe'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : editField === 'notificationInterval' ? (
                            <select 
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-full p-2 border rounded mb-4">
                                {notificationOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={editField === 'email' ? 'email' : 'text'}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-full p-2 border rounded mb-4"
                                placeholder={`Enter your ${editField}`}
                            />
                        )}
                        <div className="flex justify-between space-x-4 mt-4">
                            <button 
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">
                                <FaTimes className="mr-2" /> Cancel
                            </button>
                            <button 
                                onClick={handleUpdate}
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50">
                                {isLoading ? 'Saving...' : 'Save'} <FaCheck className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
