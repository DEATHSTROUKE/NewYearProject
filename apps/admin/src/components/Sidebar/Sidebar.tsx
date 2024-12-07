import { Box, Divider, IconButton, Sheet, Stack, Typography } from '@mui/joy'
import { SignOutIcon } from '@primer/octicons-react'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/config/routes'

import { clearAccessToken } from '@/utils/login'

import { RouteList } from './RouteList'

export const Sidebar = memo(() => {
  const navigate = useNavigate()

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'sticky' },
        zIndex: 100,
        height: '100dvh',
        width: '330px',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Stack direction={'column'} height={'100%'}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              mb: { xs: '50px', lg: '70px' },
              fontWeight: 'bold',
              fontSize: '40px',
              background: '#e12c31dd',
              borderRadius: '15px',
              padding: '10px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            БЛАГО 2025
          </Box>
          <RouteList />
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', py: '5px' }}>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography fontWeight={'bold'} fontSize={'16px'}>
              admin
            </Typography>
          </Box>
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={() => {
              clearAccessToken()
              navigate(ROUTES.Login)
            }}
          >
            <SignOutIcon size={16} />
          </IconButton>
        </Box>
      </Stack>
    </Sheet>
  )
})
