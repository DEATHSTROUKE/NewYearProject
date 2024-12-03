import { EmptyPicture1 } from '@/assets/svgs/EmptyPicture1'
import { EmptyPicture2 } from '@/assets/svgs/EmptyPicture2'

export const ImageWithPlaceholder = ({
  src,
  isSquare = false,
}: {
  src?: string | null
  isSquare?: boolean
}) => {
  return (
    <div>
      {src ? (
        <img
          src={src}
          style={{ maxWidth: '100%' }}
        />
      ) : isSquare ? (
        <EmptyPicture1 />
      ) : (
        <EmptyPicture2 />
      )}
    </div>
  )
}
