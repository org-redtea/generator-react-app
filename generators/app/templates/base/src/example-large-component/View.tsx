import React from 'react';
import {observer} from "mobx-react";
import {State} from "./state/State";
import styles from './View.module.css';


interface Props {
  state: State;
}

@observer
export class View extends React.Component<Props> {
  render() {
    const state = this.props.state;

    return <h3 className={styles.class}>{state.text}</h3>;
  }
}

