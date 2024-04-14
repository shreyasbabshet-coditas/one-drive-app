export interface BreadcrumbsProps {
    breadCrumbs: IBreadCrumbs[],
}

export interface IBreadCrumbs {
    id: string;
    label: string;
    link: string;
}
