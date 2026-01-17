

const Spinner = ({ size = 16 }) => (
    <div
        style={{width: size, height: size}}
        className="border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"
    />
);

export default Spinner;