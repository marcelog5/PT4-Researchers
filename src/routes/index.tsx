import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import HomeForm from '../pages/HomeForm';
import ConsentForm from '../pages/ConsentForm';
import QuestionsForm from '../pages/QuestionsForm';
import RespondentInformationForm from '../pages/RespondentInformationForm';
import RedirectPage from '../pages/RedirectPage';
import FinishFormPage from '../pages/FinishFormPage';
import TutorialForm from '../pages/TutorialForm';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Home from '../pages/Home';

const Routes: React.FC = () => (
    <Switch>
        <Route path='/' component={SignIn} exact/>
        <Route path='/signup' component={SignUp}/>

        <Route path='/homeform/:id' component={HomeForm}/>
        <Route path='/consentform' component={ConsentForm}/>
        <Route path='/questionsform' component={QuestionsForm}/>
        <Route path='/respondentinformationform' component={RespondentInformationForm}/>
        <Route path='/formnotexist' component={RedirectPage}/>
        <Route path='/finishform' component={FinishFormPage}/>
        <Route path='/tutorialform' component={TutorialForm}/>

        <Route path="/home" component={Home} isPrivate />
    </Switch>
);

export default Routes;
