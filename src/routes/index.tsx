import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeForm from '../pages/HomeForm';
import ConsentForm from '../pages/ConsentForm';

const Routes: React.FC = () => (
    <Switch>
        <Route path='/' exact component={HomeForm}/>
        <Route path='/consentform' component={ConsentForm}/>
    </Switch>
);

export default Routes;
