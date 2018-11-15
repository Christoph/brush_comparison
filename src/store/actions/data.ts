import store from 'store/store';
import { State } from 'store/state';
import {produce, setAutoFreeze} from "immer";

setAutoFreeze(false)

export function update(state: State, point: number[]) {
    const newState = produce(state, draftState => {
      draftState.data.push(point)
      draftState.data[0] = [7, 7]
    })

    return newState;
}

export function select(state: State, point: number[]) {
    const newState = produce(state, draftState => {
      draftState.select.push(point)
    })

    return newState;
}

store.registerAction('update', update);
store.registerAction('select', select);
