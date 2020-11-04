import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeForm from '../pages/HomeForm';
import ConsentForm from '../pages/ConsentForm';
import QuestionsForm from '../pages/QuestionsForm';
import RespondentInformationForm from '../pages/RespondentInformationForm';
import RedirectPage from '../pages/RedirectPage';

const Routes: React.FC = () => (
    <Switch>
        <Route path='/homeform/:id' component={HomeForm}/>
        <Route path='/consentform' component={ConsentForm}/>
        <Route path='/questionsform' component={QuestionsForm}/>
        <Route path='/respondentinformationform' component={RespondentInformationForm}/>
        <Route path='/formnotexist' component={RedirectPage}/>
    </Switch>
);

export default Routes;
