import React from "react";
import styles from "./Breadcrumbs.module.scss";
import { BreadcrumbsProps } from "./Breadcrumbs.types.ts";
import { Link } from "react-router-dom";

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadCrumbs,
}: BreadcrumbsProps) => {
  return (
    <div className={styles.breadCrumbs}>
      {breadCrumbs.map((breadCrumb, index) => {
        return (
          <span key={breadCrumb.id}>
            {index > 0 && <span className={styles.seperator}>{">"}</span>}
            {breadCrumb.link ? (
              <Link to={breadCrumb.link}>{breadCrumb.label}</Link>
            ) : (
              <span>{breadCrumb.label}</span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
