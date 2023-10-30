import { DependencyList, useEffect, useState } from 'react'

export const useAsyncInitialize = <T>(func: () => Promise<T>, deps: DependencyList = []) => {
    const [state, setState] = useState<T>()

    useEffect(() => {
        func().then(setState)
    }, deps)

    return state
}
