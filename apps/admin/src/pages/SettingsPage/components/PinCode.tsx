import { Box, Input, Stack, Typography } from '@mui/joy'
import { useEffect, useRef, useState } from 'react'

import { InputError } from '@/components/InputError/InputError'

function stringToArray(str: string): string[] {
  const arr = str.split('')
  while (arr.length < 4) {
    arr.push('')
  }
  return arr.slice(0, 4)
}

let currentOTPIndex = 0

export const PinCode = ({
  value,
  textError,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
  textError?: string
}) => {
  // const [otp, setOtp] = useState<string[]>(Array(4).fill(''))
  const otp = stringToArray(value)

  const [activeInput, setActiveInput] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    const newOTP: string[] = [...otp]
    const lastVal = val.substring(val.length - 1)
    newOTP[currentOTPIndex] = lastVal

    if (!val) {
      setActiveInput(currentOTPIndex - 1)
      onChange(newOTP.join(''))
    } else if (/[0-9]/.test(lastVal)) {
      setActiveInput(currentOTPIndex + 1)
      onChange(newOTP.join(''))
    }
  }

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    currentOTPIndex = index
    if (e.key === 'Backspace') {
      setActiveInput(currentOTPIndex - 1)
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeInput])

  return (
    <Stack rowGap={'8px'}>
      <Typography>Пин-код игры</Typography>
      <Stack
        direction={'row'}
        columnGap={'8px'}
      >
        {otp.map((_, index) => {
          return (
            <Box
              sx={{ width: '32px', height: '41px' }}
              key={index}
            >
              <Input
                sx={{ height: '100%' }}
                value={otp[index]}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    ref: index === activeInput ? inputRef : null,
                  },
                }}
                onFocus={() => setActiveInput(index)}
                onKeyDown={e => handleBackspace(e, index)}
              />
            </Box>
          )
        })}
      </Stack>
      {textError && <InputError text={textError} />}
    </Stack>
  )
}
