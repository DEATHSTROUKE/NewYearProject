import { Box, InputProps, Input as MUIInput, Typography } from '@mui/joy'
import { forwardRef } from 'react'

import { InputError } from '../InputError/InputError'

type DateTimePickerProps = {
  label?: string
  labelStyle?: 'normal' | 'bold'
  textError?: string
} & InputProps

export const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
  ({ label, labelStyle = 'normal', textError, ...props }, ref) => {
    return (
      <Box>
        {label && (
          <Typography
            fontWeight={labelStyle}
            sx={{ mb: '5px' }}
          >
            {label}
          </Typography>
        )}

        <MUIInput
          type="datetime-local"
          sx={{ width: '100%', background: 'transparent', boxShadow: 'none' }}
          ref={ref}
          slotProps={{
            input: {
              step: 1,
            },
          }}
          {...props}
        />
        {textError && <InputError text={textError} />}
      </Box>
    )
  },
)
