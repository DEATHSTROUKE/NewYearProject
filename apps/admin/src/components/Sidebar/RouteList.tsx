import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Typography,
} from '@mui/joy'
import {
  ChecklistIcon,
  DownloadIcon,
  PencilIcon,
  PeopleIcon,
} from '@primer/octicons-react'
import { Link, useLocation } from 'react-router-dom'

import { ROUTES } from '@/config/routes'

const routes = [
  {
    path: ROUTES.Dashboard,
    text: 'Все пользователи',
    icon: <PeopleIcon size={16} />,
  },
  {
    path: ROUTES.AdminTexts,
    text: 'Тексты',
    icon: <PencilIcon size={16} />,
  },
  {
    path: ROUTES.Tasks,
    text: 'Задания',
    icon: <ChecklistIcon size={16} />,
  },
  {
    path: ROUTES.Excel,
    text: 'Выгрузка отзывов и лоттереи',
    icon: <DownloadIcon size={16} />,
  },
]

export const RouteList = () => {
  const { pathname } = useLocation()

  return (
    <Box
      sx={{
        minHeight: 0,
        overflow: 'hidden auto',

        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <List
        size="sm"
        sx={{
          gap: { xs: '15px' },
          '--ListItem-radius': '5px',
        }}
      >
        {routes.map((route, idx) => (
          <Link key={idx} to={route.path}>
            <ListItem
              sx={
                pathname.startsWith(route.path)
                  ? { background: 'var(--active-tab)' }
                  : {}
              }
            >
              <ListItemButton>
                {route.icon}
                <ListItemContent>
                  <Typography fontSize={'16px'}>{route.text}</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )
}
