import store from 'store/store';
import { State } from 'store/state';
import produce from "immer";

export function update(state: State, text: string) {
    const newState = produce(state, draftState => {
      draftState.data.push(text)
    })

    return newState;
}

store.registerAction('update', update);
