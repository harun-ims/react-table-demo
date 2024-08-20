const STATUS_ON_DECK = { id: 1, name: "On Deck", color: "bg-blue-600" };
const STATUS_IN_PROGRESS = {
  id: 2,
  name: "In Progress",
  color: "bg-yellow-600",
};
const STATUS_TESTING = { id: 3, name: "Testing", color: "bg-pink-600" };
const STATUS_DEPLOYED = { id: 4, name: "Deployed", color: "bg-green-600" };
export const STATUSES = [
  STATUS_ON_DECK,
  STATUS_IN_PROGRESS,
  STATUS_TESTING,
  STATUS_DEPLOYED,
];

export type TableData = {
  id: string;
  task: string;
  status:
    | typeof STATUS_ON_DECK
    | typeof STATUS_IN_PROGRESS
    | typeof STATUS_TESTING
    | typeof STATUS_DEPLOYED
    | null;
  due: Date | null;
  notes: string;
};

const DATA: TableData[] = [
  {
    id: "1",
    task: "Add a New Feature",
    status: STATUS_ON_DECK,
    due: new Date("2023/10/15"),
    notes: "This is a note",
  },
  {
    id: "2",
    task: "Write Integration Tests",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Use Jest",
  },
  {
    id: "3",
    task: "Add Instagram Integration",
    status: STATUS_DEPLOYED,
    due: null,
    notes: "",
  },
  {
    id: "4",
    task: "Cleanup Database",
    status: STATUS_IN_PROGRESS,
    due: new Date("2023/02/15"),
    notes: "Remove old data",
  },
  {
    id: "5",
    task: "Refactor API Endpoints",
    status: STATUS_TESTING,
    due: null,
    notes: "",
  },
  {
    id: "6",
    task: "Add Documentation to API",
    status: STATUS_IN_PROGRESS,
    due: new Date("2023/09/12"),
    notes: "Add JS Docs to all endpoints",
  },
  {
    id: "7",
    task: "Update NPM Packages",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
];

export default DATA;
