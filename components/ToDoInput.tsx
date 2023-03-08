import React, { FC, useState } from 'react'
import { trpc } from '../utils/trpc';
import styles from './ToDoInput.module.scss';

export const ToDoInput: FC = () => {
  const trpcContext = trpc.useContext();
  const [newToDo, setNewToDo] = useState('');

  const clearInput = () => setNewToDo('');

  const createToDo = trpc.createToDo.useMutation({
    onSettled(data) {
      trpcContext.getToDos.cancel();
      trpcContext.getToDos.setData(undefined, (old) => [...(old ?? []), ...(data ? [data] : [])]);
      clearInput();
    },
  });


  const onSubmit = () => {
    createToDo.mutate({label: newToDo});
  }

  return (
    <form className={styles.root} onSubmit={(event) => {
      event.preventDefault();

      onSubmit();
    }}>

      <input type="text" value={newToDo} onChange={(event) => {
        event.preventDefault();

        setNewToDo(event.target.value);
      }}  />
      <button type="submit">Submit</button>
      </form>
  )
}
