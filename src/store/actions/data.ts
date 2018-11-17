import store from 'store/store';
import { State } from 'store/state';
import {produce, setAutoFreeze} from "immer";

setAutoFreeze(false)

export function selectProperty(state: State, property: string) {
    const newState = produce(state, draftState => {
      draftState.selectedProperty = property
    })

    return newState;
}

store.registerAction('selectProperty', selectProperty);
