import React from 'react';
import {Provider as IoCProvider} from 'inversify-react';
import {Route, Router, Switch} from 'react-router-dom';
import {globalIOCContainer} from './ioc/container';
import {GLOBAL_IOC_TYPES} from "./ioc/iocTypes";
import {Provider as MobxProvider} from 'mobx-react';
import {LargeComponent} from './example-large-component';
import {ExampleState, exampleStatePath} from './example-state/State';
import {ExampleComponent} from './example-component';

const App: React.FC = () => {
    const states = {
        [exampleStatePath]: globalIOCContainer.get<ExampleState>(GLOBAL_IOC_TYPES.states.Example)
    };

    return (
        <IoCProvider container={globalIOCContainer}>
            <Router history={globalIOCContainer.get(GLOBAL_IOC_TYPES.browserHistory)}>
                <MobxProvider {...states}>
                    <Switch>
                        <Route exact path="/">
                            <ExampleComponent/>
                            <LargeComponent/>
                        </Route>
                    </Switch>
                </MobxProvider>
            </Router>
        </IoCProvider>
    );
};

export default App;
