import {
    graphql,
    formatPageQueryWithCount,
    formatMutation,
    fetchMutation,
    decodeId,
    toISODate
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

export function formatProgramGQL(mm, program) {
    return `
    ${program.id !== undefined && program.id !== null ? `id: ${decodeId(program.id)}` : ""}
    ${program.idProgram !== undefined && program.idProgram !== null ? `idProgram: "${program.idProgram}"` : ""}
      nameProgram: "${program.nameProgram}"
      validityDate: "${toISODate(program.validityDate)}"
    `;
}

export function createProgram(mm, program, clientMutationLabel) {
    let mutation = formatMutation("createProgram", formatProgramGQL(mm, program), clientMutationLabel);
    var requestedDateTime = new Date();
    return graphql(mutation.payload, ["PROGRAM_PROGRAM_MUTATION_REQ", "PROGRAM_PROGRAM_CREATE_RESP", "PROGRAM_PROGRAM_MUTATION_ERR"], {
        clientMutationId: mutation.clientMutationId,
        clientMutationLabel,
        requestedDateTime,
    });
}

export function updateProgram(mm, program, clientMutationLabel) {
    let mutation = formatMutation("updateProgram", formatProgramGQL(mm, program), clientMutationLabel);
    var requestedDateTime = new Date();
    program.clientMutationId = mutation.clientMutationId;
    return graphql(mutation.payload, ["PROGRAM_PROGRAM_MUTATION_REQ", "PROGRAM_PROGRAM_UPDATE_RESP", "PROGRAM_PROGRAM_MUTATION_ERR"], {
        clientMutationId: mutation.clientMutationId,
        clientMutationLabel,
        requestedDateTime,
    });
}