export interface FoldersProps { }

export interface IFolder {
    folderId: string;
    folderName: string;
    folders?: IFolder[]
    files?: IFile[]
}

export interface IFile {
    fileId: string;
    fileName: string;
}