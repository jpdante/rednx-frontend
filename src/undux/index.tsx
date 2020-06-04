import { Effects, Store, createConnectedStore, withReduxDevtools } from 'undux'

type State = {
  foo: number
  bar: string[]
}

let initialState: State = {
  foo: 12,
  bar: []
}

export default createConnectedStore(initialState, withReduxDevtools)

// Ignore this if you're using React Hooks
export type StoreProps = {
  store: Store<State>
}

export type StoreEffects = Effects<State>