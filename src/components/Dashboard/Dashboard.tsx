import { Outlet, useLocation } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App.state";
import { IBreadCrumbs } from "../Breadcrumbs/Breadcrumbs.types";
import { getFolderById } from "../../services/folder.service";

const Dashboard: React.FC = () => {
  const location = useLocation();
  const [breadCrumbs, setBreadCrumbs] = useState<IBreadCrumbs[] | []>([]);
  const context = useContext(AppContext);

  const { state } = context ?? {};
  const { oneDriveData } = state ?? {};

  useEffect(() => {
    if (!oneDriveData) return;
    const pathArray = location.pathname.split("/");
    const folderIds = pathArray.filter((id) => id !== "");

    const newBreadCrumbs = folderIds.map((folderId, index) => {
      const folder = getFolderById(oneDriveData, folderId);
      return {
        id: folderId,
        label: folder?.folderName ?? "Unknown Folder",
        link: `/${folderIds.slice(0, index + 1).join("/")}`,
      };
    });
    if (newBreadCrumbs.length === 0) {
      setBreadCrumbs([
        {
          id: oneDriveData.folderId,
          label: oneDriveData.folderName,
          link: "one-drive",
        },
      ]);
    } else {
      setBreadCrumbs(newBreadCrumbs);
    }
  }, [location.pathname, oneDriveData]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>One Drive</h3>
      </div>
      <div className={styles.main}>
        <div className={styles.breadCrumbs}>
          <Breadcrumbs breadCrumbs={breadCrumbs ?? []} />
        </div>
        <div className={styles.folderContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
