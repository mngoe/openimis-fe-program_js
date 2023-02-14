import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { withModulesManager, combine, withHistory, historyPush, useTranslations } from "@openimis/fe-core";
import ProgramForm from "../components/ProgramForm";

const styles = (theme) => ({
  page: theme.page,
});

const ProgramPage = (props) => {
  const { modulesManager, history, match, classes } = props;
  const [resetKey, setResetKey] = useState(Date.now());
  const dispatch = useDispatch();

  const add = () => {
    setResetKey(Date.now());
    historyPush(modulesManager, history, "program.programNew");
  };

  const save = (program) => {
  };
  return (
    <div className={classes.page}>
      <ProgramForm
        key={resetKey}
        readOnly={false}
        userId={match.params.user_id}
        back={() => historyPush(modulesManager, history, "program.programs")}
      />
    </div>
  );
};

const enhance = combine(withHistory, withModulesManager, withTheme, withStyles(styles));

export default enhance(ProgramPage);
