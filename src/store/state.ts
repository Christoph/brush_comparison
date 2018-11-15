export interface State {
    data: number[][];
    select: number[][];
}

export const initialState: State = {
    data: [[1,2], [3,4]],
    select: [],
};
