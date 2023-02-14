import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { historyPush, withModulesManager, withHistory, withTooltip, formatMessage } from "@openimis/fe-core";
import ProgramSearcher from "../components/ProgramSearcher";

const styles = (theme) => ({
  page: theme.page,
  fab: theme.fab,
});

class ProgramsPage extends Component {
  onDoubleClick = (u, newTab = false) => {
    historyPush(this.props.modulesManager, this.props.history, "program.programOverview", [u.idProgram], newTab);
  };

  onAdd = () => {
    historyPush(this.props.modulesManager, this.props.history, "program.programNew");
  };

  render() {
    const { classes, rights, intl } = this.props;
    return (
      <div className={classes.page}>
        <ProgramSearcher cacheFiltersKey="programsPageFiltersCache" onDoubleClick={this.onDoubleClick} />
        {withTooltip(
          <div className={classes.fab}>
            <Fab color="primary" onClick={this.onAdd}>
              <AddIcon />
            </Fab>
          </div>,
          formatMessage(intl, "program", "addNewProgram.tooltip"),
        )}
      </div>
    );
  }
}

export default injectIntl(
  withModulesManager(withHistory(withTheme(withStyles(styles)(ProgramsPage)))),
);
