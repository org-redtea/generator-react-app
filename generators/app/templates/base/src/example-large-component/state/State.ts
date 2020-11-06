import {observable} from "mobx";
import {GLOBAL_IOC_TYPES} from '../../ioc/iocTypes';
import {decorate, inject, injectable} from "inversify";
import {ExampleState} from '../../states/ExampleState';

@injectable()
export class State {
    @observable private internalText: string = 'another';

    get text(): string {
        return this.internalText + ' ' + this.exampleState.text;
    }

    constructor(
        private exampleState: ExampleState
    ) {}
}

decorate(inject(GLOBAL_IOC_TYPES.states.Example) as ParameterDecorator, State, 0);
