import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withTheme, withStyles } from "@material-ui/core/styles";
import {
  Helmet,
  formatMessageWithValues,
  withModulesManager,
  withHistory,
} from "@openimis/fe-core";

const styles = (theme) => ({
  lockedPage: theme.page.locked,
});

class ProgramForm extends Component {

  render() {
    const {
      intl,
      modulesManager,
      classes,
    } = this.props;

    return (
      <div >
        <Helmet title={formatMessageWithValues(this.props.intl, "program", "ProgramOverview.title", { label: "" })} />
      </div>
    );
  }
}

export default withHistory(
  withModulesManager((injectIntl(withTheme(withStyles(styles)(ProgramForm))))),
);
