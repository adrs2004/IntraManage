function UserStatus({ status }) {
    const colors = {
        online: "bg-green-500",
        idle: "bg-yellow-500",
        offline: "bg-red-500",
    };

    return (
        <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${colors[status]}`}></div>
            <span className="capitalize">{status}</span>
        </div>
    );
}

export default UserStatus;