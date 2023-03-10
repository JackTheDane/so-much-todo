import React, { FC } from 'react'
import { Button } from '../../../components/Button'
import { trpc } from '../../../utils/trpc';

type DeleteToDoButtonProps = {
  id: number;
}

export const DeleteToDoButton: FC<DeleteToDoButtonProps> = ({
  id
}) => {
  const trpcContext = trpc.useContext();

  const deleteToDo = trpc.toDo.delete.useMutation({
    onSettled() {
      trpcContext.toDo.get.fetch();
    },
  });

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteToDo.mutate({ id });
    }
  }

  return (
    <Button onClick={onDelete} title="Delete">❌</Button>
  )
}
