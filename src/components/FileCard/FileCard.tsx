import { Menu } from "@coditashq/react-ada-components";
import styles from "./FileCard.module.scss";
import { FileCardProps } from "./FileCard.types.ts";
import { useState } from "react";
import fileImage from "../../images/file.png";
import kababIcon from "../../images/kababIcon.png";
import { MENU_ITEM_IDS, MENU_OPTIONS } from "./constants";

const FileCard: React.FC<FileCardProps> = ({
  file,
  onFileRename,
  onDeleteFile,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [renamedFile, setRenamedFile] = useState("");

  const handleOptionClick = (id: string) => {
    if (id === MENU_ITEM_IDS.RENAME_OPTION_ID) {
      setEditMode(true);
    } else {
      onDeleteFile?.();
    }
  };

  return (
    <div className={styles.card}>
      <Menu
        menuItems={MENU_OPTIONS}
        TriggerElement={<img className={styles.icon} src={kababIcon} />}
        triggerElementClassName={styles.customTriggerElement}
        menuPosition="RightTop"
        onMenuItemClick={handleOptionClick}
      />
      <img className={styles.fileIcon} src={fileImage} alt="folder-img" />
      <p className={styles.text}>Id: {file.fileId}</p>
      {!editMode && <p className={styles.text}>Name: {file.fileName}</p>}
      {editMode && (
        <input
          value={renamedFile}
          type="text"
          onChange={(e) => {
            setRenamedFile(e.target.value);
          }}
          onBlur={() => {
            if (renamedFile !== "") onFileRename?.(renamedFile);
            setEditMode(false);
          }}
        />
      )}
    </div>
  );
};

export default FileCard;
