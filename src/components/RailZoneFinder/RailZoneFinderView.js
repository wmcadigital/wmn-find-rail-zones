import React, { useContext } from 'react';
import { FormContext } from 'globalState';
// Rail zone svg component
import QuestionView from './QuestionView/QuestionView';
import RailZoneFinder from './RailZoneFinder';

function RailZoneFinderView() {
  const [formState] = useContext(FormContext);

  let ViewToRender;

  if (formState.questionMode) {
    ViewToRender = <>{formState.questionView ? <QuestionView /> : <RailZoneFinder />}</>;
  } else {
    ViewToRender = <RailZoneFinder />;
  }

  return ViewToRender;
}

export default RailZoneFinderView;
