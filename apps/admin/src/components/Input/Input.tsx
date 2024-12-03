import { Box, InputTypeMap, Input as MUIInput, Typography } from '@mui/joy'
import { forwardRef } from 'react'

import { InputError } from '../InputError/InputError'

type InputProps = {
  label?: string
  labelStyle?: 'normal' | 'bold'
  textError?: string
} & InputTypeMap['props']

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, labelStyle = 'normal', textError, ...props }: InputProps, ref) => {
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
          slotProps={{
            input: {
              ref,
            },
          }}
          error={!!textError}
          {...props}
          sx={{ width: '100%', background: 'transparent', boxShadow: 'none' }}
        />
        {textError && <InputError text={textError} />}
      </Box>
    )
  },
)
