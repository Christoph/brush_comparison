export interface State {
    data: number[][];
    select: number[][];
    selectedProperty: string;
}

export const initialState: State = {
    data: [[1,2], [3,4]],
    select: [],
    selectedProperty: null
};
