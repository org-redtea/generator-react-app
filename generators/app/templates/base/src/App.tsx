import React from 'react';
import {Container} from 'inversify';
import {Route, Router, Switch} from 'react-router-dom';
import {Context as InversifyContext} from '@redtea/react-inversify';
import {GLOBAL_IOC_TYPES} from "./ioc/iocTypes";
import {Provider as MobxProvider} from 'mobx-react';
import {LargeComponent} from './example-large-component';
import {ExampleState} from './states/ExampleState';
import {ExampleFnComponent} from './example-fn-component';
import {createProviderStateProps} from './states/utils';

const App: React.FC<{ container: Container }> = (props) => {
    const states = {
        [GLOBAL_IOC_TYPES.states.Example]: props.container.get<ExampleState>(GLOBAL_IOC_TYPES.states.Example)
    };

    return (
        <InversifyContext.Provider value={props.container}>
            <Router history={props.container.get(GLOBAL_IOC_TYPES.browserHistory)}>
                <MobxProvider {...createProviderStateProps(states)}>
                    <Switch>
                        <Route exact path="/">
                            <ExampleFnComponent/>
                            <LargeComponent/>
                        </Route>
                    </Switch>
                </MobxProvider>
            </Router>
        </InversifyContext.Provider>
    );
};

export default App;
