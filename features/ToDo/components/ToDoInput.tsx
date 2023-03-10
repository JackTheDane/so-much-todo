import React, { FC, useState } from 'react'
import { Button } from '../../../components/Button';
import { TextInput } from '../../../components/TextInput';
import { trpc } from '../../../utils/trpc';
import styles from './ToDoInput.module.scss';

type ToDoInputProps = ({
  id: never;
  value: never;
} | {
  id: number;
  value: string;
}) & {
  onSubmit?: () => void;
}

export const ToDoInput: FC<ToDoInputProps> = ({
  id,
  value,
  onSubmit: _onSubmit
}) => {
  const trpcContext = trpc.useContext();
  const [toDoInput, setToDoInput] = useState(value);

  const clearInput = () => setToDoInput('');

  const createToDo = trpc.toDo.create.useMutation({
    onSettled(data) {
      trpcContext.toDo.get.cancel();
      trpcContext.toDo.get.setData(undefined, (old) => [...(old ?? []), ...(data ? [data] : [])]);
      clearInput();
    },
  });

  const updateToDo = trpc.toDo.update.useMutation({
    onSettled(data) {
      trpcContext.toDo.get.fetch();
      clearInput();
    },
  });


  const onSubmit = () => {
    if (id) {
      updateToDo.mutate({ id, label: toDoInput }, {
        onSettled() {
          _onSubmit?.();
        }
      });
    } else {
      createToDo.mutate({label: toDoInput}, {
        onSettled() {
          _onSubmit?.();
        }
      });
    }
  }

  return (
    <form className={styles.root} onSubmit={(event) => {
      event.preventDefault();

      onSubmit();
    }}>
      <TextInput value={toDoInput} onChange={setToDoInput} />
      <Button type="submit" title='Save' disabled={!toDoInput}>💾</Button>
    </form>
  )
}
