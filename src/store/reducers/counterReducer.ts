import { CounterState, CounterActionTypes, INCREMENT, DECREMENT } from "../../types"

const initialState: CounterState = {
  count: 0
}

export const counterReducer = (
  state = initialState,
  action: CounterActionTypes
): CounterState => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 }
    case DECREMENT:
      return { ...state, count: state.count - 1 }
    default:
      return state
  }
}