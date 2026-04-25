function Input({ type = "text", placeholder }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="w-full border p-2 rounded"
        />
    );
}

export default Input;