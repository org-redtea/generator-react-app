import {observable, action} from "mobx";
import {injectable} from "inversify";
import {useContext} from "react";
import {MobXProviderContext} from "mobx-react";

@injectable()
export class ExampleState {
    @observable text: string = 'world';

    @action.bound
    setText(text: string) {
        this.text = text;
    }
}

export const exampleStatePath = 'exampleState';

export function useExampleState(): ExampleState {
    return useContext(MobXProviderContext)[exampleStatePath];
}
