import * as React from "react"

// Breakpoints based on popular device sizes
export const BREAKPOINTS = {
  xs: 480,   // Extra small devices (phones)
  sm: 640,   // Small devices (large phones, small tablets)
  md: 768,   // Medium devices (tablets)
  lg: 1024,  // Large devices (laptops)
  xl: 1280,  // Extra large devices (large laptops, desktops)
  xxl: 1536  // Ultra large devices (large screens)
}

// Hook to detect if the screen size is mobile
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.md)
    }
    
    // Initial check
    setIsMobile(window.innerWidth < BREAKPOINTS.md)
    
    // Event listeners
    mql.addEventListener("change", onChange)
    window.addEventListener("resize", onChange)
    
    // Cleanup
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", onChange)
    }
  }, [])

  return !!isMobile
}

// Hook to get current breakpoint
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<keyof typeof BREAKPOINTS | null>(null)

  React.useEffect(() => {
    const determineBreakpoint = () => {
      const width = window.innerWidth
      
      if (width < BREAKPOINTS.xs) return 'xs'
      if (width < BREAKPOINTS.sm) return 'sm'
      if (width < BREAKPOINTS.md) return 'md'
      if (width < BREAKPOINTS.lg) return 'lg'
      if (width < BREAKPOINTS.xl) return 'xl'
      return 'xxl'
    }

    const onResize = () => {
      setBreakpoint(determineBreakpoint())
    }

    // Initial check
    onResize()
    
    // Event listener
    window.addEventListener("resize", onResize)
    
    // Cleanup
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return breakpoint
}
