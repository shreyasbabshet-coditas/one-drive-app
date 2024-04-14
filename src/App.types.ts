import { IBreadCrumbs } from "./components/Breadcrumbs/Breadcrumbs.types";
import { IFolder } from "./components/FolderCard/FolderCard.types";

export interface AppState {
    oneDriveData: IFolder | null;
    breadCrumbs: IBreadCrumbs[] | []
}

export interface AppAction {
    type: "CREATE_NEW_FOLDER" | "DELETE_FOLDER" | "RENAME_FOLDER" | "CREATE_FILE" | "DELETE_FILE" | "RENAME_FILE"
    data?: any
}

export interface IAppContext {
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
}

