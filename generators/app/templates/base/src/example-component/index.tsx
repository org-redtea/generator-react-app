import React from 'react';
import {observer} from "mobx-react";
import {useExampleState} from '../example-state/State';

type Props = {};

export const ExampleComponent: React.FC<Props> = observer((props) => {
    const state = useExampleState();
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => state.setText(event.target.value);

    return (
        <div>
            <h3>Hello, {state.text}!</h3>
            <input type="text" value={state.text} onChange={onChange}/>
        </div>
    );
});
