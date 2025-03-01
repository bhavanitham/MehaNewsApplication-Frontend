import {useState, useEffect} from 'react';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const id = localStorage.getItem('userId');
                const response = await fetch(import.meta.env.BACKEND_URL+`/notificationbyid/${id}`);
                const data = await response.json();
                const filteredData = data
                    .filter(notification => notification.title !== null)
                    .sort((a, b) => new Date(b.time) - new Date(a.time));
                setNotifications(filteredData);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Notifications</h1>
                <div className="space-y-4">
                    {notifications.map((notification, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <h2 className="text-gray-700 font-medium mb-2">{notification.title}</h2>
                            <p className="text-sm text-gray-500">
                                {new Date(notification.time).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NotificationPage;