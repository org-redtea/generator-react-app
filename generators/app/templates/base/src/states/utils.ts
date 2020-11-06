import {useContext} from 'react';
import {MobXProviderContext} from 'mobx-react';

export function createProviderStateProps(state: any): object {
    return {
        states: state
    };
}

export function useMobXState<State>(id: symbol): State {
    return useContext(MobXProviderContext).states[id];
}
