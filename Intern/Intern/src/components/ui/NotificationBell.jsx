import { useState } from "react";

function NotificationBell() {
    const [open, setOpen] = useState(false);

    const notifications = [
        "New task assigned",
        "Deadline approaching",
        "File uploaded",
    ];

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)}>🔔</button>

            {open && (
                <div className="absolute right-0 bg-white shadow p-3 w-60 mt-2 rounded">
                    {notifications.map((n, i) => (
                        <p key={i} className="border-b py-1">{n}</p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default NotificationBell;