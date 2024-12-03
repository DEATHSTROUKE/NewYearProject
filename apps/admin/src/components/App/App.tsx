import { CssVarsProvider, StyledEngineProvider } from '@mui/joy'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

import { theme } from '@/config/theme'

import { Main } from '../Main/Main'
import { Modals } from '../Modals/Modals'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Main />
          <Modals />
          <Toaster
            richColors
            position="bottom-right"
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </CssVarsProvider>
    </StyledEngineProvider>
  )
}

export default App
