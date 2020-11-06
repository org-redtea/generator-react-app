import React from 'react';
import {observer} from "mobx-react";
import {State} from "./state/State";
import styles from './View.module.css';
import {injectService} from '@redtea/react-inversify';
import {SomeService} from '../services/some-service/SomeService';
import {GLOBAL_IOC_TYPES} from '../ioc/iocTypes';


interface Props {
    state: State;
    someService?: SomeService;
}

@injectService<SomeService>('someService', GLOBAL_IOC_TYPES.services.SomeService)
@observer
export class View extends React.Component<Props> {
    render() {
        const state = this.props.state;
        const someService = this.props.someService!;

        return (
            <>
                <h3 className={styles.class}>
                    {someService.sayHello()}
                </h3>
                <p>{state.text}</p>
            </>
        );
    }
}

