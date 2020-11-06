import React from 'react';
import {observer} from "mobx-react";
import {ExampleState} from '../states/ExampleState';
import {useMobXState} from '../states/utils';
import {GLOBAL_IOC_TYPES} from '../ioc/iocTypes';

type Props = {};

export const ExampleFnComponent: React.FC<Props> = observer((props) => {
    const state = useMobXState<ExampleState>(GLOBAL_IOC_TYPES.states.Example);
    const onChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            state.setText(event.target.value),
        [state]
    );

    return (
        <div>
            <h3>Hello, {state.text}!</h3>
            <input type="text" value={state.text} onChange={onChange}/>
        </div>
    );
});
