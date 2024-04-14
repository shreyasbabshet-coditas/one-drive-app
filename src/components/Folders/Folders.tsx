import styles from "./Folders.module.scss";
import addNewImg from "../../images/add_new_button.png";
import Modal from "react-modal";
import { useContext, useEffect, useState } from "react";
import { customStyles } from "./constants.ts";
import { IFolder } from "../Folders/Folders.types.ts";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../App.state.tsx";
import { getInnerContent } from "../../services/folder.service.ts";
import Card from "../Card/Card.tsx";

const Folders: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [folder, setFolder] = useState<IFolder | null>(null);
  const [createFolderMode, setCreateFolderMode] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const context = useContext(AppContext);

  const { state, dispatch } = context ?? {};
  const { oneDriveData } = state ?? {};

  useEffect(() => {
    if (location.pathname === "/one-drive" && oneDriveData) {
      setFolder(oneDriveData);
    } else if (id) {
      const updatedFolder = getInnerContent(id, oneDriveData?.folders ?? []);
      setFolder(updatedFolder);
    }
  }, [id, location.pathname]);

  const handleCreateFolder = () => {
    dispatch?.({
      type: "CREATE_NEW_FOLDER",
      data: {
        currentFolderId: folder?.folderId,
        newFolderName: name,
      },
    });
    setOpenModal(false);
    setName("");
  };

  const handleCreateFile = () => {
    dispatch?.({
      type: "CREATE_FILE",
      data: {
        folderId: folder?.folderId,
        fileName: name,
      },
    });
    setOpenModal(false);
    setName("");
  };

  const handleRename = (folderId: string, newName: string) => {
    dispatch?.({
      type: "RENAME_FOLDER",
      data: {
        folderId,
        newName,
      },
    });
  };

  const handleDelete = (folderId: string) => {
    dispatch?.({
      type: "DELETE_FOLDER",
      data: {
        folderId,
      },
    });
  };

  const handleFolderClick = (folderId: string) => {
    navigate(`${location.pathname}/${folderId}`);
  };

  const handleDeleteFile = (fileId: string) => {
    dispatch?.({
      type: "DELETE_FILE",
      data: {
        fileId,
      },
    });
  };

  const handleRenameFile = (fileId: string, newFileName: string) => {
    dispatch?.({
      type: "RENAME_FILE",
      data: {
        fileId,
        newFileName,
      },
    });
  };
  console.log(folder);
  return (
    <div className={styles.folders}>
      <div className={styles.create}>
        <img
          onClick={() => {
            setCreateFolderMode(true);
            setOpenModal(true);
          }}
          className={styles.addImage}
          src={addNewImg}
          alt="add folder"
        />
        <span className={styles.text}>New Folder</span>
      </div>
      <div className={styles.create}>
        <img
          onClick={() => {
            setCreateFolderMode(false);
            setOpenModal(true);
          }}
          className={styles.addImage}
          src={addNewImg}
          alt="add folder"
        />
        <span className={styles.text}> New File</span>
      </div>
      {folder?.folders?.map((folder) => {
        return (
          <Card
            key={`${folder.folderId}-folder`}
            folder={folder}
            onDoubleClick={handleFolderClick}
            onRename={(newName) => handleRename(folder.folderId, newName)}
            onDelete={handleDelete}
          />
        );
      })}
      {folder?.files &&
        folder.files.map((file) => {
          return (
            // <FileCard
            //   key={`${file.fileId}-file`}
            //   file={file}
            //   onFileRename={(newFileName: string) =>
            //     handleRenameFile(file.fileId, newFileName)
            //   }
            //   onDeleteFile={() => handleDeleteFile(file.fileId)}
            // />
            <Card
              key={`${file.fileId}-file`}
              file={file}
              onRename={(newName) => handleRenameFile(file.fileId, newName)}
              onDelete={handleDeleteFile}
            />
          );
        })}
      <Modal
        isOpen={openModal}
        style={customStyles}
        onRequestClose={() => setOpenModal(false)}
      >
        <div className={styles.formContainer}>
          <h3>{createFolderMode ? "Create New Folder" : "Create New File"}</h3>
          <input
            value={name}
            className={styles.input}
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button
            onClick={createFolderMode ? handleCreateFolder : handleCreateFile}
            className={styles.button}
          >
            <h3>Create</h3>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Folders;
