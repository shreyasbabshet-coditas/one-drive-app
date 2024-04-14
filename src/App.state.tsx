import { AppAction, IAppContext, AppState } from "./App.types";
import { PropsWithChildren, createContext, useReducer } from "react";
import { ONE_DRIVE_DATA } from "./styles/mock";
import {
  deleteFile,
  deleteFolder,
  insertFile,
  insertFolder,
  renameFile,
  renameFolder,
} from "./services/folder.service";

export const initialState: AppState = {
  oneDriveData: ONE_DRIVE_DATA,
  breadCrumbs: [],
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "CREATE_NEW_FOLDER": {
      const newFolder = {
        folderName: action.data.newFolderName ?? "",
        folderId: `folder${Math.floor(Math.random() * 1000)}`,
      };
      const updatedFolderState = insertFolder(
        action.data.currentFolderId,
        newFolder,
        state.oneDriveData
      );
      return { ...state, oneDriveData: updatedFolderState };
    }
    case "RENAME_FOLDER": {
      const renamedFolderData = renameFolder(
        action.data.folderId,
        action.data.newName,
        state.oneDriveData
      );
      return { ...state, oneDriveData: renamedFolderData };
    }
    case "DELETE_FOLDER": {
      const updatedFolderState = deleteFolder(
        action.data.folderId,
        state.oneDriveData
      );
      return updatedFolderState
        ? { ...state, oneDriveData: updatedFolderState }
        : { ...state };
    }
    case "CREATE_FILE": {
      const newFile = {
        fileName: action.data.fileName ?? "",
        fileId: `folder${Math.floor(Math.random() * 1000)}`,
      };
      const updatedFileState = insertFile(
        action.data.folderId,
        newFile,
        state.oneDriveData
      );
      return updatedFileState
        ? { ...state, oneDriveData: updatedFileState }
        : { ...state };
    }
    case "DELETE_FILE": {
      const updatedState = deleteFile(action.data.fileId, state.oneDriveData);
      return updatedState
        ? { ...state, oneDriveData: updatedState }
        : { ...state };
    }
    case "RENAME_FILE": {
      const updatedState = renameFile(
        action.data.fileId,
        action.data.newFileName,
        state.oneDriveData
      );
      return updatedState
        ? { ...state, oneDriveData: updatedState }
        : { ...state };
    }
    default:
      return { ...state };
  }
};

export const withProvider = (Component: () => JSX.Element) => {
  return () => {
    return (
      <AppProvider>
        <Component />
      </AppProvider>
    );
  };
};

export const AppContext = createContext<IAppContext | null>(null);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
