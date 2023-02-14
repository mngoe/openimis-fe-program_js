import {
    graphql,
    formatPageQueryWithCount,
    formatMutation,
    fetchMutation,
} from "@openimis/fe-core";

const PROGRAM_SUMMARY_PROJECTION = [
    "idProgram",
    "nameProgram",
    "validityDate"
];

export function fetchProgramsSummaries(mm, filters) {
    const payload = formatPageQueryWithCount("program", filters, PROGRAM_SUMMARY_PROJECTION);
    return graphql(payload, "ADMIN_PROGRAMS_SUMMARIES");
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