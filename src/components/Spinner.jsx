

const Spinner = ({ size = 16, color = "#2563eb" }) => (
    <div
        style={{
            width: size,
            height: size,
            borderTopColor: color,
        }}
        className="border-2 border-gray-300 rounded-full animate-spin"
    />
);


export default Spinner;