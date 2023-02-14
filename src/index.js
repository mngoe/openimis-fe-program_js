import messages_en from "./translations/en.json";
import ProgramPicker from "./pickers/ProgramPicker";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramPage from "./pages/ProgramPage";
import reducer from "./reducer"

const ROUTE_PROGRAM_PROGRAM = "program/program";
const ROUTE_PROGRAM_PROGRAMS = "program/programs";
const ROUTE_PROGRAM_PROGRAM_OVERVIEW = "programs/overview";
const ROUTE_PROGRAM_PROGRAM_NEW = "program/programs/new";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "reducers": [{key: 'program', reducer}],
  "refs": [
    { key: "program.ProgramPicker", ref: ProgramPicker },

    { key: "program.route.program", ref: ROUTE_PROGRAM_PROGRAM },
    { key: "program.programs", ref: ROUTE_PROGRAM_PROGRAMS },
    { key: "program.programNew", ref: ROUTE_PROGRAM_PROGRAM_NEW },
    { key: "program.programOverview", ref: ROUTE_PROGRAM_PROGRAM_OVERVIEW },
  ],
  "core.Router": [
    { path: ROUTE_PROGRAM_PROGRAM_NEW, component: ProgramPage },
    { path: ROUTE_PROGRAM_PROGRAMS, component: ProgramsPage },
    {
      path: `${ROUTE_PROGRAM_PROGRAM_OVERVIEW}/:program_id`,
      component: ProgramPage,
    },
  ],
}

export const ProgramModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}