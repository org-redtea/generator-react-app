import {GLOBAL_IOC_TYPES} from "./iocTypes";
import {Container} from 'inversify';
import {createBrowserHistory, History} from 'history';
import {ExampleState} from '../states/ExampleState';
import {SomeService} from '../services/some-service/SomeService';

export function buildContainer(target: Container) {
    target.bind<History>(GLOBAL_IOC_TYPES.browserHistory).toConstantValue(createBrowserHistory());
    target.bind<ExampleState>(GLOBAL_IOC_TYPES.states.Example).to(ExampleState);
    target.bind<SomeService>(GLOBAL_IOC_TYPES.services.SomeService).to(SomeService);

    return target;
}

