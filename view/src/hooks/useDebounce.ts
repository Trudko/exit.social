import { DependencyList, useEffect, useRef } from 'react'

export default (
  callback: (...args: any[]) => any,
  time = 500,
  deps: DependencyList
) => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const timeoutID = setTimeout(() => callbackRef.current(), time)
    return () => clearTimeout(timeoutID)
  }, deps)
}
