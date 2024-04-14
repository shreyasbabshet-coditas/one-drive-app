export enum MENU_ITEM_IDS {
  RENAME_OPTION_ID = "1",
  DELETE_OPTION_ID = "2",
}

export const MENU_OPTIONS = [
  {
    id: "1",
    content: (
      <div>
        <span>Rename File</span>
      </div>
    ),
  },
  {
    id: "2",
    content: (
      <div>
        <span>Delete File</span>
      </div>
    ),
  },
];
