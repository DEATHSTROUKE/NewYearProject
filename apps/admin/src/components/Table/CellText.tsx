import { Box } from '@mui/joy'
import React, { memo } from 'react'

export const CellText = memo(
  ({
    text,
  }: {
    text: string
  }) => {
    return (
      <Box sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '5',
        WebkitBoxOrient: 'vertical',
      }}>
        {text}
      </Box>
    )
  },
)
