import { useEffect, useState, useCallback } from 'react'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  // Handler stays stable across renders
  const updateMatch = useCallback(() => {
    if (typeof window !== 'undefined') {
      setMatches(window.matchMedia(query).matches)
    }
  }, [query])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const matchMedia = window.matchMedia(query)

    // Set initial state
    setMatches(matchMedia.matches)

    // Listen for changes
    if (matchMedia.addEventListener) {
      matchMedia.addEventListener('change', updateMatch)
    } else {
      matchMedia.addListener(updateMatch) // Safari <14
    }

    // Cleanup
    return () => {
      if (matchMedia.removeEventListener) {
        matchMedia.removeEventListener('change', updateMatch)
      } else {
        matchMedia.removeListener(updateMatch)
      }
    }
  }, [query, updateMatch])

  return matches
}

export default useMediaQuery
