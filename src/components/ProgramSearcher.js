import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { IconButton, Tooltip } from "@material-ui/core";
import { Tab as TabIcon, Delete as DeleteIcon } from "@material-ui/icons";
import {
  withModulesManager,
  formatMessageWithValues,
  formatMessage,
  Searcher,
  ConfirmDialog,
  formatDateFromISO,
} from "@openimis/fe-core";
import ProgramFilter from "./ProgramFilter";

import { fetchProgramsSummaries, deleteProgram } from "../actions";

const PROGRAM_SEARCHER_CONTRIBUTION_KEY = "program.ProgramSearcher";

const getHeaders = () => [
  "program.program.code",
  "program.program.name",
  "program.program.validity",
  "",
];

const getSorts = () => [
  ["code", true]
  ["nameProgram", true],
  ["validityDateFrom", false],
];

const getAligns = () => {
  const aligns = getHeaders().map(() => null);
  aligns.splice(-1, 1, "right");
  return aligns;
};

class ProgramSearcher extends Component {
  state = {
    deleteProgram: null,
    params: {},
  };

  fetch = (params) => {
    this.setState({ params });
    this.props.fetchProgramsSummaries(this.props.modulesManager, params);
  };

  filtersToQueryParams = (state) => {
    const prms = Object.keys(state.filters)
      .filter((contrib) => !!state.filters[contrib].filter)
      .map((contrib) => state.filters[contrib].filter);
    prms.push(`first: ${state.pageSize}`);
    if (state.afterCursor) {
      prms.push(`after: "${state.afterCursor}"`);
    }
    if (state.beforeCursor) {
      prms.push(`before: "${state.beforeCursor}"`);
    }
    if (state.orderBy) {
      prms.push(`orderBy: ["${state.orderBy}"]`);
    }
    return prms;
  };

  deleteProgram = (isConfirmed) => {
    if (!isConfirmed) {
      this.setState({ deleteProgram: null });
    } else {
      const program = this.state.deleteProgram;
      this.setState({ deleteProgram: null }, async () => {
        await this.props.deleteProgram(
          this.props.modulesManager,
          program,
          formatMessageWithValues(this.props.intl, "program", "DeleteProgram.mutationLabel", { name: program.nameProgram }),
        );
        this.fetch(this.state.params);
      });
    }
  };

  itemFormatters = () => {
    const formatters = [
      (p) => p.code,
      (p) => p.nameProgram,
      (p) => formatDateFromISO(this.props.modulesManager, this.props.intl, p.validityDateFrom),
      (p) => (
        <>
          <Tooltip title={formatMessage(this.props.intl, "program", "openNewTab")}>
            <IconButton onClick={() => this.props.onDoubleClick(p, true)}>
              <TabIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={formatMessage(this.props.intl, "program", "deleteProgram.tooltip")}>
            <IconButton onClick={() => this.setState({ deleteProgram: p })}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    ];

    return formatters;
  };

  render() {
    const { intl, programs, programsPageInfo, fetchingPrograms, fetchedPrograms, errorPrograms, cacheFiltersKey, onDoubleClick } =
      this.props;
    return (
      <>
        {this.state.deleteProgram && (
          <ConfirmDialog
            confirm={{
              title: formatMessage(intl, "program", "deleteDialog.title"),
              message: formatMessage(intl, "program", "deleteDialog.message"),
            }}
            onConfirm={this.deleteProgram}
          />
        )}
        <Searcher
          module="program"
          cacheFiltersKey={cacheFiltersKey}
          FilterPane={ProgramFilter}
          items={programs}
          itemsPageInfo={programsPageInfo}
          fetchingItems={fetchingPrograms}
          fetchedItems={fetchedPrograms}
          errorItems={errorPrograms}
          contributionKey={PROGRAM_SEARCHER_CONTRIBUTION_KEY}
          tableTitle={formatMessageWithValues(intl, "program", "programSummaries", {
            count: programsPageInfo.totalCount,
          })}
          fetch={this.fetch}
          rowIdentifier={(r) => r.uuid}
          filtersToQueryParams={this.filtersToQueryParams}
          headers={getHeaders}
          aligns={getAligns}
          itemFormatters={this.itemFormatters}
          sorts={getSorts}
          rowDisabled={(_, i) => i.validityTo || i.clientMutationId}
          rowLocked={(_, i) => i.clientMutationId}
          onDoubleClick={onDoubleClick}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  programs: state.program.programsSummaries.items,
  programsPageInfo: state.program.programsSummaries.pageInfo,
  fetchingPrograms: state.program.programsSummaries.isFetching,
  fetchedPrograms: state.program.programsSummaries.fetched,
  errorPrograms: state.program.programsSummaries.error,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchProgramsSummaries, deleteProgram }, dispatch);

export default withModulesManager(connect(mapStateToProps, mapDispatchToProps)(injectIntl(ProgramSearcher)));
