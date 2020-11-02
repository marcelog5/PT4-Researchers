import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeForm from '../pages/HomeForm';
import ConsentForm from '../pages/ConsentForm';
import QuestionsForm from '../pages/QuestionsForm';
import RespondentInformationForm from '../pages/RespondentInformationForm';

const Routes: React.FC = () => (
    <Switch>
        <Route path='/' exact component={HomeForm}/>
        <Route path='/consentform' component={ConsentForm}/>
        <Route path='/questionsform' component={QuestionsForm}/>
        <Route path='/respondentinformationform' component={RespondentInformationForm}/>
    </Switch>
);

export default Routes;
