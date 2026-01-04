import { EllipsisVertical, Download, Trash2, Globe, Lock, Copy, Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MyFileCard = ({
    file,
    getFileIcon,
    onDownload,
    onDelete,
    onTogglePublic,
    onShareLink
}) => {
    const [open, setOpen] = useState(false);
    const btnRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);


    return (
        <div className="relative w-full max-w-full grid grid-cols-[auto_1fr_auto] items-center px-4 py-3">
            {/* Icon */}
            <div className="shrink-0">
                {getFileIcon(file)}
            </div>

            {/* Text */}
            <div className="min-w-0 px-3">
                <p
                    className="text-sm font-medium text-gray-900 truncate"
                    title={file.name}
                >
                    {file.name}
                </p>
                <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB •{" "}
                    {new Date(file.uploadedAt).toLocaleDateString()}
                </p>
            </div>

            {/* Menu */}
            <button
                ref={btnRef}
                onClick={() => setOpen(!open)}
                className="shrink-0 p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            >
                <EllipsisVertical size={18} />
            </button>

            {/* Dropdown */}
            {open && (
                <div ref={menuRef} className="absolute right-2 top-full mt-2 z-50 w-40 divide-y divide-gray-200 bg-white rounded-lg shadow">

                    {file.isPublic && (
                        <button
                            onClick={() => onShareLink(file.id)}
                            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 transition-colors"
                        >
                            <Copy size={16} /> Share Link
                        </button>
                    )}

                    {file.isPublic && (
                        <a
                            href={`/file/${file.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 transition-colors"
                        >
                            <Eye size={16} /> View File
                        </a>
                    )}

                    <button
                        onClick={() => onDownload(file)}
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                        <Download size={16} /> Download
                    </button>

                    <button
                        onClick={() => onTogglePublic(file)}
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                        {file.isPublic ? (
                            <>
                                <Lock size={16} /> Make Private
                            </>
                        ) : (
                            <>
                                <Globe size={16} /> Make Public
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => onDelete(file.id)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <Trash2 size={16} /> Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyFileCard;