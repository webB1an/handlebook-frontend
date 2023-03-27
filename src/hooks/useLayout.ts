import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export default function useLayout() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('md')
  return { isMobile }
}
