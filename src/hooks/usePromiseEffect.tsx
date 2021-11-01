import { DependencyList, useEffect, useState } from 'react'

type PromiseState<T> =
  | { status: 'idle' | 'pending', value: null, error: null }
  | { status: 'fulfilled', value: T, error: null }
  | { status: 'rejected', value: null, error: Error }

export function usePromiseEffect<T>(effect: () => Promise<T>, deps: DependencyList) {
  const [state, setState] = useState<PromiseState<T>>({
    status: 'idle',
    value: null,
    error: null,
  })

  useEffect(() => {
    effect()
      .then((value) => setState({ status: 'fulfilled', value, error: null }))
      .catch((error) => setState({ status: 'rejected', value: null, error }))
  }, deps)
  
  // chose the shape you prefer for the return type,
  // here are some examples:
  // return [state.value, state.status === 'pending', state.error]
  // return [state.value, state.status, state.error]

  return state
}