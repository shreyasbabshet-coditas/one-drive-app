import { IFile, IFolder } from "../Folders/Folders.types"

export const getInnerContent = (
    folderId: string,
    data: IFolder[]
): IFolder | null => {
    const folder = data.find((item) => item.folderId === folderId);
    if (folder) {
        return folder;
    }
    for (const item of data) {
        if (item.folders && item.folders.length > 0) {
            const innerFolder = getInnerContent(folderId, item.folders);
            if (innerFolder) {
                return innerFolder;
            }
        }
    }

    return null;
};

export const insertFolder = (
    parentId: string,
    newFolder: IFolder,
    folderData: IFolder | null,
): IFolder | null => {
    const insertRecursive = (folder: IFolder | null, parentId: string): boolean => {
        if (folder && folder.folderId === parentId) {
            const folderExists = folder.folders && folder.folders.some(subfolder => subfolder.folderName === newFolder.folderName)
            if (!folderExists) {
                folder.folders = folder.folders ? [...folder.folders, newFolder] : [newFolder];
                return true;
            }
            return true;
        }

        if (folder && folder.folders) {
            for (const subfolder of folder.folders) {
                if (insertRecursive(subfolder, parentId)) {
                    return true;
                }
            }
        }
        return false;
    };
    const success = insertRecursive(folderData ?? null, parentId);
    return success ? folderData : null;
};

export const renameFolder = (
    folderId: string,
    newName: string,
    data: IFolder | null
): IFolder | null => {
    const renameRecursive = (folder: IFolder | null): boolean => {
        if (!folder) return false;
        if (folder.folderId === folderId) {
            folder.folderName = newName;
            return true;
        }
        if (folder.folders) {
            for (const subfolder of folder.folders) {
                if (renameRecursive(subfolder)) {
                    return true;
                }
            }
        }
        return false;
    };

    const success = renameRecursive(data ?? null);
    return success ? data : null;
};

export const deleteFolder = (
    folderId: string,
    data: IFolder | null
): IFolder | null => {
    const deleteRecursive = (folder: IFolder | null): boolean => {
        if (!folder) {
            return false;
        }
        if (folder.folderId === folderId) {
            return true;
        }
        if (folder.folders) {
            for (let i = 0; i < folder.folders.length; i++) {
                const subfolder = folder.folders[i];
                if (deleteRecursive(subfolder)) {
                    folder.folders.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    };
    const success = deleteRecursive(data ?? null);
    return success ? data : null;
};

export const insertFile = (
    folderId: string,
    newFile: IFile,
    data: IFolder | null
): IFolder | null => {
    const insertRecursive = (folder: IFolder | null): boolean => {
        if (!folder) {
            return false;
        }
        if (folder.folderId === folderId) {
            const fileExists = folder.files && folder.files.some(file => file.fileName === newFile.fileName);

            if (!fileExists) {
                folder.files = folder.files ? [...folder.files, newFile] : [newFile];
                return true;
            }
        }

        if (folder.folders) {
            for (const subfolder of folder.folders) {

                if (insertRecursive(subfolder)) {
                    return true;
                }
            }
        }
        return false;
    };

    const success = insertRecursive(data);
    return success ? data : null;
};

export const deleteFile = (
    fileId: string,
    data: IFolder | null
): IFolder | null => {
    const deleteRecursive = (folder: IFolder | null): boolean => {
        if (!folder) {
            return false;
        }

        if (folder.files) {
            const index = folder.files.findIndex(file => file.fileId === fileId);
            if (index !== -1) {
                folder.files.splice(index, 1);
                return true;
            }
        }
        if (folder.folders) {
            for (const subfolder of folder.folders) {
                if (deleteRecursive(subfolder)) {
                    return true;
                }
            }
        }
        return false;
    };
    const success = deleteRecursive(data);
    return success ? data : null;
};

export const renameFile = (
    fileId: string,
    newName: string,
    data: IFolder | null
): IFolder | null => {
    const renameRecursive = (folder: IFolder | null): boolean => {
        if (!folder) {
            return false;
        }

        if (folder.files) {
            const file = folder.files.find(file => file.fileId === fileId);
            if (file) {
                file.fileName = newName;
                return true;
            }
        }

        if (folder.folders) {
            for (const subfolder of folder.folders) {
                if (renameRecursive(subfolder)) {
                    return true;
                }
            }
        }
        return false;
    };

    const success = renameRecursive(data);
    return success ? data : null;
};