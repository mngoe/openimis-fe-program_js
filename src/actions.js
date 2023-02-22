import {
    graphql,
    formatPageQueryWithCount,
    formatMutation,
    fetchMutation,
    formatPageQuery
} from "@openimis/fe-core";

const PROGRAM_SUMMARY_PROJECTION = [
    "id",
    "idProgram",
    "nameProgram",
    "validityDate"
];

export function fetchProgramsSummaries(mm, filters) {
    const payload = formatPageQueryWithCount("program", filters, PROGRAM_SUMMARY_PROJECTION);
    return graphql(payload, "PROGRAM_PROGRAMS_SUMMARIES");
}

export function fetchProgram(mm, programName) {
    let filters = [
      `nameProgram: "${programName}"`
    ];
    let projections = [
      "id",
      "idProgram",
      "nameProgram",
      "validityDate",
    ];
    const payload = formatPageQueryWithCount("program", filters, projections);
    return graphql(payload, "PROGRAM_PROGRAM");
  }

export function deleteProgram(mm, program, clientMutationLabel) {
    const mutation = formatMutation("deleteProgram", `idProgram: ["${program.idProgram}"]`, clientMutationLabel);
    // eslint-disable-next-line no-param-reassign
    user.clientMutationId = mutation.clientMutationId;
    return (dispatch) => {
        dispatch(
            graphql(mutation.payload, ["ADMIN_PROGRAM_MUTATION_REQ", "ADMIN_PROGRAM_DELETE_RESP", "ADMIN_PROGRAM_MUTATION_ERR"], {
                clientMutationId: mutation.clientMutationId,
                clientMutationLabel,
                programId: program.idProgram,
            }),
        );
        dispatch(fetchMutation(mutation.clientMutationId));
    };
}