import styles from "./FolderCard.module.scss";
import { FolderCardProps } from "./FolderCard.types.ts";
import folderImg from "../../images/folder.png";
import { Menu } from "@coditashq/react-ada-components";
import kababIcon from "../../images/kababIcon.png";
import { FOLDER_MENU_OPTIONS, MENU_ITEM_IDS } from "./constants";
import { useState } from "react";

const FolderCard: React.FC<FolderCardProps> = ({
  folder,
  onDoubleClick,
  onDeleteFolder,
  onRenameFolder,
}) => {
  const [renamedFolder, setRenamedFolder] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleOptionClick = (id: string) => {
    if (id === MENU_ITEM_IDS.RENAME_OPTION_ID) {
      setEditMode(true);
    } else {
      onDeleteFolder?.(folder.folderId);
    }
  };

  return (
    <div
      onDoubleClick={() => onDoubleClick?.(folder.folderId)}
      className={styles.card}
    >
      <Menu
        menuItems={FOLDER_MENU_OPTIONS}
        TriggerElement={<img className={styles.icon} src={kababIcon} />}
        triggerElementClassName={styles.customTriggerElement}
        menuPosition="RightTop"
        onMenuItemClick={handleOptionClick}
      />
      <img src={folderImg} alt="folder-img" />
      <p className={styles.text}>Id: {folder.folderId}</p>
      {!editMode && <p className={styles.text}>Name: {folder.folderName}</p>}
      {editMode && (
        <input
          value={renamedFolder}
          type="text"
          onChange={(e) => {
            setRenamedFolder(e.target.value);
          }}
          onBlur={() => {
            if (renamedFolder !== "")
              onRenameFolder?.(folder.folderId, renamedFolder);
            setEditMode(false);
          }}
        />
      )}
    </div>
  );
};

export default FolderCard;
