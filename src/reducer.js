import {
    parseData,
    pageInfo,
    formatGraphQLError,
    dispatchMutationResp,
    dispatchMutationErr,
    dispatchMutationReq,
} from "@openimis/fe-core";


function reducer(
    state = {

        programsSummaries: {
            items: [],
            isFetching: false,
            isFetched: false,
            fetched: null,
            pageInfo: {
                totalCount: 0,
            },
            error: null,
        },

        programs: {
            items: [],
            isFetching: false,
            isFetched: false,
            error: null,
        },

        submittingMutation: false,
        mutation: {},
    },
    action,
) {
    switch (action.type) {
        case "PROGRAM_PROGRAMS_SUMMARIES_REQ":
            return {
                ...state,
                programsSummaries: {
                    ...state.programsSummaries,
                    isFetching: true,
                    isFetched: false,
                    error: null,
                },
            };
        case "PROGRAM_PROGRAMS_SUMMARIES_RESP":
            return {
                ...state,
                programsSummaries: {
                    ...state.programsSummaries,
                    isFetching: false,
                    isFetched: true,
                    fetched: action.meta,
                    pageInfo: pageInfo(action.payload.data.program),
                    items: parseData(action.payload.data.program),
                    error: formatGraphQLError(action.payload),
                },
            };
        case "PROGRAM_PROGRAMS_SUMMARIES_ERR":
            return {
                ...state,
                programsSummaries: {
                    ...state.programsSummaries,
                    isFetching: false,
                    isFetched: true,
                    fetched: null,
                    items: [],
                    error: formatGraphQLError(action.payload),
                },
            };
        case "PROGRAM_PROGRAM_MUTATION_REQ":
            return dispatchMutationReq(state, action);
        case "PROGRAM_PROGRAM_MUTATION_ERR":
            return dispatchMutationErr(state, action);
        case "PROGRAM_PROGRAM_DELETE_RESP":
            return dispatchMutationResp(state, "deleteProgram", action);
        case "PROGRAM_PROGRAM_UPDATE_RESP":
            return dispatchMutationResp(state, "updateUser", action);
        case "PROGRAM_PROGRAM_CREATE_RESP":
            return dispatchMutationResp(state, "createUser", action);
        default:
            return state;
    }
}

export default reducer;