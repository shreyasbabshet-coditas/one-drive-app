import { IFolder } from "../components/Folders/Folders.types";

export const ONE_DRIVE_DATA: IFolder = {
    folderId: 'one-drive',
    folderName: "One Drive",
    folders: [{
        folderName: "my folder",
        folderId: "folder1",
        files: [
            { fileId: 'file112', fileName: 'file 1' }
        ],
        folders: [{
            folderName: "subfolder",
            folderId: "folder12",
            files: [],
            folders: [
                {
                    folderName: "subfolder23",
                    folderId: "folder1277",
                    files: [],
                }
            ]
        }]
    },
    {
        folderName: "new Folder",
        folderId: "folder123",
        files: [
            { fileId: 'file1234', fileName: 'file 3' }
        ],
    }],
}