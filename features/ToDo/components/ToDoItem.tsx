import React, { FC } from 'react'
import styles from "./ToDoItem.module.scss";
import { ToDoItem as PrismaToDoItem } from "@prisma/client";
import { Button } from '../../../components/Button';
import { useCombinedClasses } from '../../../hooks/useCombinedClasses';
import { trpc } from '../../../utils/trpc';
import { DeleteToDoButton } from './DeleteToDoButton';
import { EditToDoButton } from './EditTodoButton';

type ToDoItemProps = {
  id: PrismaToDoItem['id'],
  checked: boolean;
  children: string;
}

export const ToDoItem: FC<ToDoItemProps> = ({
  id,
  checked,
  children
}) => {
  const trpcContext = trpc.useContext();
  const updateToDo = trpc.toDo.update.useMutation();

  const onClick = () => {
    updateToDo.mutate({
      id,
      completed: !checked
    }, {
      onSettled() {
        trpcContext.toDo.get.fetch();
      },
    })
  };

  return (
    <div className={styles.root}>
      <label className={useCombinedClasses(styles.label, checked && styles.checked)}>
        <input type="checkbox" checked={checked} onChange={(event) => {
          event.preventDefault();
          onClick();
        }}  />

        <span className={styles.content}>
          {children}
        </span>
      </label>
        <span className={styles.options}>
          <EditToDoButton />
          <DeleteToDoButton id={id} />
        </span>
    </div>
  )
}
