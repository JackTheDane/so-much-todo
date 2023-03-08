import React, { FC } from 'react'
import styles from "./ToDoItem.module.scss";
import { ToDoItem as PrismaToDoItem } from "@prisma/client";
import { trpc } from '../utils/trpc';
import { useCombinedClasses } from '../hooks/useCombinedClasses';

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
  const updateToDo = trpc.setToDoCompletion.useMutation();

  const onClick = () => {
    updateToDo.mutate({
      id,
      completed: !checked
    }, {
      onSettled() {
        trpcContext.getToDos.fetch();
      },
    })
  };

  return (
    <label className={useCombinedClasses(styles.root, checked && styles.checked)}>
      <input type="checkbox" checked={checked} onChange={(event) => {
        event.preventDefault();
        onClick();
      }}  />

      <span className={styles.content}>
        {children}
      </span>
    </label>
  )
}
