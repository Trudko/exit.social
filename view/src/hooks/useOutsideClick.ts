import { useState } from 'react'
import { useDidMount } from 'react-hooks-lib'

export default (
  ref: React.RefObject<Node>,
  callback: () => void,
  mask?: string
) => {
  const [didMount, setDidMount] = useState<boolean>(false)

  const handleClick = (e: MouseEvent) => {
    const maskedElements = document.getElementsByClassName(mask)

    if (ref?.current && !ref.current?.contains(e.target as Node)) {
      if (maskedElements) {
        for (let item of maskedElements) {
          if (item.contains(e.target as HTMLElement)) return
        }
      }

      if (callback) callback()
    }
  }

  useDidMount(() => {
    if (!didMount) {
      document.addEventListener('click', handleClick)

      return () => document.removeEventListener('click', handleClick)
    } else {
      setDidMount(true)
    }
  })
}
