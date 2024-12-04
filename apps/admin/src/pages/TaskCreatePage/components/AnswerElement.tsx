import { IconButton, InputProps, Input as MUIInput, Stack } from '@mui/joy'
import { GrabberIcon } from '@primer/octicons-react'
import { Reorder } from 'framer-motion'
import { forwardRef } from 'react'

export const AnswerElement = forwardRef<
  HTMLInputElement,
  { item: { id: string; value: string } } & InputProps
>(({ item, ...props }, ref) => {
  return (
    <Reorder.Item
      value={item}
      as="div"
    >
      <Stack
        direction={'row'}
        alignItems={'flex-end'}
      >
        <IconButton tabIndex={-1}>
          <GrabberIcon size={16} />
        </IconButton>
        <MUIInput
          sx={{
            border: 'none',
            borderBottom: '1px solid var(--dark-gray)',
            background: 'transparent',
            borderRadius: '0',
            boxShadow: 'none',
            width: '100%',
          }}
          ref={ref}
          {...props}
        />
      </Stack>
    </Reorder.Item>
  )
})
