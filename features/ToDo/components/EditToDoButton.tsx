import React, { FC } from 'react'
import { Button } from '../../../components/Button'

type EditToDoButtonProps = {
  onClick(): void;
}

export const EditToDoButton: FC<EditToDoButtonProps> = ({
  onClick
}) => {
  return (
    <Button onClick={onClick} title="Edit">📝</Button>
  )
}
