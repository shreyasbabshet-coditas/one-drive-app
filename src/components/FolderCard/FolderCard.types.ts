export interface FolderCardProps {
    folder: IFolder;
    onDoubleClick?: (id: string) => void;
    onRenameFolder: (folderId: string, newName: string) => void;
    onDeleteFolder: (folderId: string) => void;
}

export interface IFolder {
    folderName: string,
    folderId: string,
    files?: IFile[],
    folders?: IFolder[];
}

export interface IFile {
    fileName: string;
    fileId: string;
}
