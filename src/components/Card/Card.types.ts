import { IFile, IFolder } from "../Folders/Folders.types";

export interface CardProps {
    menuOptions?: IMenu[];
    folder?: IFolder;
    file?: IFile;
    onDoubleClick?: (folderId: string) => void;
    onRename?: (newName: string) => void;
    onDelete?: (id: string) => void;
}

export interface IMenu {
    id: string;
    content: JSX.Element;
}