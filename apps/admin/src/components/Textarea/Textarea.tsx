import {
  Box,
  Textarea as MUITextarea,
  TextareaTypeMap,
  Typography,
} from '@mui/joy'
import { forwardRef } from 'react'

import { InputError } from '../InputError/InputError'

type TextareaProps = {
  label?: string
  labelStyle?: 'normal' | 'bold'
  textError?: string
} & TextareaTypeMap['props']

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, labelStyle = 'normal', textError, ...props }: TextareaProps,
    ref,
  ) => {
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
        <MUITextarea
          minRows={6}
          slotProps={{ textarea: { ref } }}
          error={!!textError}
          {...props}
          sx={{ width: '100%', background: 'transparent', boxShadow: 'none' }}
        />
        {textError && <InputError text={textError} />}
      </Box>
    )
  },
)
