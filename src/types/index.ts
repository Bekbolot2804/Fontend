// Тип для состояния
export interface CounterState {
    count: number
  }
  
  // Типы действий
  export const INCREMENT = "INCREMENT"
  export const DECREMENT = "DECREMENT"
  
  interface IncrementAction {
    type: typeof INCREMENT
  }
  
  interface DecrementAction {
    type: typeof DECREMENT
  }
  
  export type CounterActionTypes = IncrementAction | DecrementAction