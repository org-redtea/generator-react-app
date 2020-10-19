import {GLOBAL_IOC_TYPES} from "./iocTypes";
import {Container} from 'inversify';
import {createBrowserHistory, History} from 'history';
import {ExampleState} from '../example-state/State';

export function buildContainer(target: Container) {
    target.bind<History>(GLOBAL_IOC_TYPES.browserHistory).toConstantValue(createBrowserHistory());
    target.bind<ExampleState>(GLOBAL_IOC_TYPES.states.Example).to(ExampleState);

    return target;
}

