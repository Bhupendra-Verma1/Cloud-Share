import { useState } from "react";
import { FileIcon, FileText, Image, Music, Video, Globe, Lock, Copy, Eye, Download, Trash2, EllipsisVertical } from "lucide-react";
import { useRef, useEffect } from "react";

const FileCard = ({ file, onDelete, onTogglePublic, onDownload, onShareLink, onVisibilityChange }) => {
    const [showActions, setShowActions] = useState(false);
    const btnRef = useRef(null);
    const menuRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [openToLeft, setOpenToLeft] = useState(false);

    const getFileIcon = (file) => {
        const extension = file.name.split(".").pop().toLowerCase();

        if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
            return <Image size={24} className="text-purple-500" />
        }

        if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extension)) {
            return <Video size={24} className="text-blue-500" />
        }

        if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) {
            return <Music size={24} className="text-green-500" />
        }

        if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension)) {
            return <FileText size={24} className="text-amber-500" />
        }

        return <FileIcon size={24} className="text-purple-500" />
    }

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + " B";
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        else return (bytes / 1048576).toFixed(1) + " MB";
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    }

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

    useEffect(() => {
        if (!open || !btnRef.current) return;

        const rect = btnRef.current.getBoundingClientRect();

        const spaceRight = window.innerWidth - rect.right;
        const spaceLeft = rect.left;

        const MENU_WIDTH = 160; // w-40 ≈ 160px

        setOpenToLeft(spaceRight < MENU_WIDTH && spaceLeft >= MENU_WIDTH);
    }, [open]);

    return (
        <div
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            className="relative group md:overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
        >
            {/* File preview area */}
            <div className="h-32 bg-linear-to-b from-purple-50 to-indigo-50 flex items-center justify-center p-4">
                {getFileIcon(file)}
            </div>

            {/* Public/Private badge */}
            <div className="absolute top-2 right-2">
                <div className={`rounded-full p-1.5 ${file.isPublic ? "bg-green-100" : "bg-gray-100"}`} title={file.isPublic ? "Public" : "Private"}>
                    {file.isPublic ? (
                        <Globe size={14} className="text-green-600" />
                    ) : (
                        <Lock size={14} className="text-gray-600" />
                    )}
                </div>
            </div>

            {/* File info */}
            <div className="p-2 sm:p-4 md:p-6">
                <div className="flex justify-between items-start">
                    <div className="max-md:hidden overflow-hidden">
                        <h3 title={file.name} className="font-medium text-gray-900 truncate">
                            {file.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {formatFileSize(file.size)} . {formatDate(file.uploadedAt)}
                        </p>
                    </div>
                    <div className="md:hidden max-md:w-full overflow-hidden">
                        <div className="flex items-center justify-between">
                            <span title={file.name} className="font-medium text-gray-900 truncate">
                                {file.name}
                            </span>

                            <button
                                ref={btnRef}
                                onClick={() => setOpen(!open)}
                                className="shrink-0 p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                            >
                                <EllipsisVertical size={18} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {formatFileSize(file.size)} . {formatDate(file.uploadedAt)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className={`max-md:hidden absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent flex items-end justify-center p-4 transition-opacity duration-300 ${showActions ? "opacity-100" : "opacity-0"}`}>
                <div className="flex gap-3 w-full justify-center">
                    {file.isPublic && (
                        <button
                            onClick={() => onShareLink(file.id)}
                            title="Share Link" className="p-2 bg-white not-target:rounded-full hover:bg-white transition-colors cursor-pointer text-purple-500 hover:text-purple-600">
                            <Copy size={18} />
                        </button>
                    )}

                    {file.isPublic && (
                        <a href={`/file/${file.id}`} title="View File" target="_blank" rel="noreferrer" className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors cursor-pointer text-gray-700 hover:text-gray-900 ">
                            <Eye size={18} />
                        </a>
                    )}

                    <button
                        onClick={() => onDownload(file)}
                        title="Download"
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors cursor-pointer text-green-600 hover:text-green-700"
                    >
                        <Download size={18} />
                    </button>

                    <button
                        onClick={() => onVisibilityChange(file)}
                        title={file.isPublic ? "Make Private" : "Make Public"}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors cursor-pointer text-amber-600 hover:text-amber-700"
                    >
                        {file.isPublic ? <Lock size={18} /> : <Globe size={18} />}
                    </button>

                    <button
                        onClick={() => onDelete(file.id)}
                        title="Delete"
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors cursor-pointer text-red-600 hover:text-red-700"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {/* Dropdown */}
            {open && (
                <div ref={menuRef}
                    className={`absolute top-0 z-50 w-40 divide-y divide-gray-200 bg-white rounded-lg shadow
                    ${openToLeft ? "right-[25%] mr-2" : "left-full ml-2"}`}
                >

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
                        onClick={() => onVisibilityChange(file)}
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
    )
}

export default FileCard;