import { FileIcon, FileText, Music, Video, Image, Globe, Lock } from 'lucide-react';

const RecentFiles = ({ files }) => {
    // Determine file type icon based on file extension
    const getFileIcon = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();

        // Image files
        if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
            return <Image size={18} className="text-purple-500" />;
        }

        // Video files
        if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extension)) {
            return <Video size={18} className="text-blue-500" />;
        }

        // Audio files
        if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) {
            return <Music size={18} className="text-green-500" />;
        }

        // Document files
        if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'md'].includes(extension)) {
            return <FileText size={18} className="text-amber-500" />;
        }

        // Default file icon
        return <FileIcon size={18} className="text-blue-600" />;
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        else return (bytes / 1048576).toFixed(1) + ' MB';
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">
                    Recent Files ({files.length})
                </h2>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block bg-white rounded-lg shadow">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Size</th>
                                <th className="px-4 py-3 text-left">Uploaded by</th>
                                <th className="px-4 py-3 text-left">Modified</th>
                                <th className="px-4 py-3 text-left">Sharing</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {files.map((file) => (
                                <tr key={file.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            {getFileIcon(file.name)}
                                            <span
                                                className="text-sm font-medium text-gray-800 truncate max-w-40 sm:max-w-[220px]"
                                                title={file.name}
                                            >
                                                {file.name}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                        {formatFileSize(file.size)}
                                    </td>

                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                        {file.uploadedBy || 'You'}
                                    </td>

                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(file.uploadedAt)}
                                    </td>

                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {file.isPublic ? (
                                            <div className="flex items-center text-xs text-green-600">
                                                <Globe size={14} className="mr-1" />
                                                Public
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Lock size={14} className="mr-1" />
                                                Private
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MOBILE LIST – DETAILS ONLY */}
            <div className="md:hidden bg-white rounded-lg shadow divide-y divide-gray-200">
                {files.map((file) => (
                    <div
                        key={file.id}
                        className="flex items-center justify-between gap-3 px-4 py-3"
                    >
                        {/* LEFT: icon + file info */}
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="shrink-0">
                                {getFileIcon(file.name)}
                            </div>

                            <div className="min-w-0">
                                <p
                                    className="text-sm font-medium text-gray-900 truncate"
                                    title={file.name}
                                >
                                    {file.name}
                                </p>

                                <p className="text-xs text-gray-500 mt-0.5">
                                    {formatFileSize(file.size)} · {formatDate(file.uploadedAt)}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT: sharing status only */}
                        <div className="flex items-center gap-1 shrink-0">
                            {file.isPublic ? (
                                <>
                                    <Globe size={14} className="text-green-600" />
                                    <span className="text-xs text-green-600">Public</span>
                                </>
                            ) : (
                                <>
                                    <Lock size={14} className="text-gray-500" />
                                    <span className="text-xs text-gray-500">Private</span>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default RecentFiles;
