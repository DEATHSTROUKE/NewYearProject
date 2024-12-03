import { useCallback, useEffect } from 'react'

export const useSave = (callback: () => void) => {
  const keyPressHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 's') {
          e.preventDefault()
          callback()
        }
      }
    },
    [callback],
  )

  useEffect(() => {
    document.addEventListener('keydown', keyPressHandler)

    return () => {
      document.removeEventListener('keydown', keyPressHandler)
    }
  }, [keyPressHandler])
}
