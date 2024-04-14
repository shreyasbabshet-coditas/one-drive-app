import { IFile } from "../FolderCard/FolderCard.types";

export interface FileCardProps {
    file: IFile,
    onFileRename?: (newFileName: string) => void;
    onDeleteFile?: () => void;
} 
