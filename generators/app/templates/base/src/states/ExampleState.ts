import {action, observable} from "mobx";
import {injectable} from "inversify";

@injectable()
export class ExampleState {
    @observable text: string = 'world';

    @action.bound
    setText(text: string) {
        this.text = text;
    }
}
