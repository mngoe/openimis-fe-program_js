import {
    graphql,
    formatPageQueryWithCount,
    formatMutation,
    decodeId,
    toISODate
} from "@openimis/fe-core";

const PROGRAM_SUMMARY_PROJECTION = [
    "id",
    "idProgram",
    "nameProgram",
    "validityDateFrom"
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
        "validityDateFrom",
    ];
    const payload = formatPageQueryWithCount("program", filters, projections);
    return graphql(payload, "PROGRAM_PROGRAM");
}

export function deleteProgram(mm, program, clientMutationLabel) {
    let mutation = formatMutation("deleteProgram", formatProgramGQL(mm, program), clientMutationLabel);
    var requestedDateTime = new Date();
    program.clientMutationId = mutation.clientMutationId;
    return graphql(mutation.payload, ["PROGRAM_PROGRAM_MUTATION_REQ", "PROGRAM_PROGRAM_DELETE_RESP", "PROGRAM_PROGRAM_MUTATION_ERR"], {
        clientMutationId: mutation.clientMutationId,
        clientMutationLabel,
        requestedDateTime,
    });
};

export function formatProgramGQL(mm, program) {
    return `
    ${program.id !== undefined && program.id !== null ? `id: ${decodeId(program.id)}` : ""}
    ${program.idProgram !== undefined && program.idProgram !== null ? `idProgram: "${program.idProgram}"` : ""}
      nameProgram: "${program.nameProgram}"
      validityDateFrom: "${toISODate(program.validityDateFrom)}"
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