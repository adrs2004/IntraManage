function Button({ children, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`bg-blue-600 text-white px-4 py-2 rounded ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;