import React from 'react'
import CSS from 'csstype'

import Button from 'ui/Button'

import * as S from './styled'

type Props = {
  title: string
  confirmText?: string
  children: React.ReactNode[] | React.ReactNode | string
  onCancel();
  onConfirm?();
  className?: string
  style?: CSS.Properties
}

const ConfirmDialog = ({ title, confirmText = 'Confirm', children, onCancel, onConfirm, className = '', style }: Props) => (
  <S.Wrapper>
    <S.Overlay/>
    <S.Dialog className={className} style={style}>
      <S.DialogTitle>{title}</S.DialogTitle>
      <S.DialogContent>{children}</S.DialogContent>
      <S.DialogActions>
        <Button buttonTheme="secondary" onClick={onCancel}>
          Cancel
        </Button>
        {
          onConfirm && 
          <Button buttonTheme="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        }
 
      </S.DialogActions>
    </S.Dialog>
  </S.Wrapper>
)

export default ConfirmDialog
