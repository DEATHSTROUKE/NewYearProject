import {
  Box,
  Dropdown as MUIDropdown,
  Menu,
  MenuButton,
  MenuItem,
} from '@mui/joy'
import { TriangleDownIcon } from '@primer/octicons-react'
import { type ReactNode, useState } from 'react'

type DropdownProps = {
  label?: string
  values: ReactNode[]
}

export const Dropdown = ({ label, values }: DropdownProps) => {
  const [open, setOpen] = useState(false)

  return (
    <MUIDropdown
      open={open}
      onOpenChange={() => {
        setOpen(prev => !prev)
      }}
    >
      <MenuButton
        sx={{ fontWeight: '400' }}
        endDecorator={
          <Box
            sx={{
              transform: `rotate(${open ? 180 : 0}deg)`,
              transition: 'transform 0.2s ease-in-out',
            }}
          >
            <TriangleDownIcon size={16} />
          </Box>
        }
      >
        {label}
      </MenuButton>
      <Menu>
        {values.map((item, idx) => (
          <MenuItem key={idx}>{item}</MenuItem>
        ))}
      </Menu>
    </MUIDropdown>
  )
}
