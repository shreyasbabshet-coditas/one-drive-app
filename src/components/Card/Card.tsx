import { useState } from "react";
import styles from "./Card.module.scss";
import { CardProps } from "./Card.types.ts";
import { Menu } from "@coditashq/react-ada-components";
import fileImage from "../../images/file.png";
import folderImg from "../../images/folder.png";
import kababIcon from "../../images/kababIcon.png";
import { MENU_ITEM_IDS, MENU_OPTIONS } from "./constants.tsx";

const Card: React.FC<CardProps> = ({
  folder,
  file,
  onRename,
  onDelete,
  onDoubleClick,
}) => {
  const [renamedFileOrFolder, setRenamedFileOrFolder] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleRename = () => {
    if (renamedFileOrFolder !== "") onRename?.(renamedFileOrFolder);
    setEditMode(false);
    setRenamedFileOrFolder("");
  };

  const handleFolderOptionClick = (id: string) => {
    if (id === MENU_ITEM_IDS.RENAME_OPTION_ID) {
      setEditMode(true);
    } else {
      onDelete?.(folder ? folder.folderId : file?.fileId ?? "");
    }
  };
  console.log(folder);
  return (
    <div
      onDoubleClick={() => onDoubleClick?.(folder?.folderId ?? "")}
      className={styles.card}
    >
      <Menu
        menuItems={MENU_OPTIONS}
        TriggerElement={<img className={styles.icon} src={kababIcon} />}
        triggerElementClassName={styles.customTriggerElement}
        menuPosition="RightTop"
        onMenuItemClick={handleFolderOptionClick}
      />
      <img
        className={file ? styles.fileIcon : ""}
        src={folder ? folderImg : fileImage}
        alt="folder-img"
      />
      <p className={styles.text}>
        Id: {folder ? folder.folderId : file?.fileId}
      </p>
      {!editMode && (
        <p className={styles.text}>
          Name: {folder ? folder.folderName : file?.fileName}
        </p>
      )}
      {editMode && (
        <input
          value={renamedFileOrFolder}
          type="text"
          onChange={(e) => {
            setRenamedFileOrFolder(e.target.value);
          }}
          onBlur={() => handleRename()}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleRename();
            }
          }}
        />
      )}
    </div>
  );
};

export default Card;
