import { DialogContent, DialogTitle, Modal, ModalDialog } from '@mui/joy'

export const BaseModal = ({
  children,
  isOpen,
  onClose,
  title,
  minWidth,
  maxWidth,
}: {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  title?: string
  minWidth?: number
  maxWidth?: number
}) => {
  return (
    <Modal
      onClose={onClose}
      open={isOpen}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'none',
          },
        },
      }}
    >
      <ModalDialog
        sx={{
          maxWidth: maxWidth || Infinity,
          minWidth: minWidth || 0,
          textAlign: 'center',
          p: '40px',
        }}
      >
        {title && (
          <DialogTitle sx={{ fontSize: '20px', fontWeight: '400' }}>
            {title}
          </DialogTitle>
        )}
        <DialogContent sx={{ width: '100%', height: '100%' }}>
          {children}
        </DialogContent>
      </ModalDialog>
    </Modal>
  )
}
