import { Box, Button, Stack, Typography } from '@mui/joy'
import { InfoIcon, UploadIcon } from '@primer/octicons-react'
import { useCallback, useRef, useState } from 'react'

import { InputError } from '../InputError/InputError'

type UploadImageProps = {
  label?: string
  value: string | null
  setImage: (value: string | null) => void
}

const BYTES_IN_MB = 1_048_576

export const UploadImage = ({ label, value, setImage }: UploadImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState<string | undefined>()
  const [error, setError] = useState<string | null>(null)

  const onInputClick = () => {
    if (!inputRef.current) return
    inputRef.current.click()
  }

  const convertImageToBase64 = useCallback(
    (file: File) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (reader.result && setImage) {
          setImage(reader.result.toString())
        }
      }
      reader.onerror = () => setError('Ошибка кодирования')
    },
    [setImage],
  )

  const setUpload = useCallback(
    (file: File | undefined) => {
      if (!file) {
        setImage(null)
        setName(undefined)
        return
      }

      if (file.size > BYTES_IN_MB) {
        setError('Слишком большой размер файла')
        setImage(null)
        setName(undefined)
        return
      }
      setName(file.name)
      convertImageToBase64(file)
      setError(null)
    },
    [convertImageToBase64, setImage],
  )

  const clearForm = () => {
    setUpload(undefined)
  }

  return (
    <Stack rowGap={'15px'}>
      <Box sx={{ position: 'relative' }}>
        {label && <Typography sx={{ mb: '5px' }}>{label}</Typography>}
        <Button
          variant="outlined"
          color="neutral"
          sx={{ width: '100%' }}
          endDecorator={<UploadIcon size={16} />}
          onClick={onInputClick}
        >
          {name || 'Загрузить картинку'}
        </Button>
        <input
          tabIndex={-1}
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".png, .jpg"
          onChange={e => setUpload(e.target?.files?.[0])}
        />
        {error && <InputError text={error} />}
      </Box>
      {!value ? (
        <Stack
          direction={'row'}
          columnGap={'10px'}
        >
          <Box sx={{ minWidth: '16px' }}>
            <InfoIcon
              size={16}
              fill="var(--light-gray)"
            />
          </Box>
          <Typography sx={{ color: 'var(--light-gray)' }}>
            Загрузите файл форматом .png или .jpg с горизонтальным разрешением и весом
            не более 1МБ
          </Typography>
        </Stack>
      ) : (
        <Stack rowGap={'5px'}>
          <Box sx={{ px: '15px' }}>
            <img
              src={value}
              alt=""
              style={{ maxWidth: '100%' }}
            />
          </Box>
          <Button
            variant="outlined"
            color="danger"
            onClick={clearForm}
          >
            Удалить
          </Button>
        </Stack>
      )}
    </Stack>
  )
}
