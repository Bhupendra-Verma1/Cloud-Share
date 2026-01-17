import MyFileCard from "./MyFileCard";

const MyFileMobileView = ({
    files,
    getFileIcon,
    onDownload,
    onDelete,
    onTogglePublic,
    onShareLink,
    downloadingFileId,
    downloadStage
}) => {
    return (
        <div className="divide-y divide-gray-200 bg-white rounded-lg shadow">
            {files.map((file) => (
                <MyFileCard
                    key={file.id}
                    file={file}
                    getFileIcon={getFileIcon}
                    onDownload={onDownload}
                    onDelete={onDelete}
                    onTogglePublic={onTogglePublic}
                    onShareLink={onShareLink}
                    downloadingFileId={downloadingFileId}
                    downloadStage={downloadStage}
                />
            ))}
        </div>
    )
};

export default MyFileMobileView;