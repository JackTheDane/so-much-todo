import React, { FC, useState } from "react";
import styles from "./ToDoItem.module.scss";
import { ToDoItem as PrismaToDoItem } from "@prisma/client";
import { useCombinedClasses } from "../../../hooks/useCombinedClasses";
import { trpc } from "../../../utils/trpc";
import { DeleteToDoButton } from "./DeleteToDoButton";
import { ToDoInput } from "./ToDoInput";
import { EditToDoButton } from "./EditToDoButton";

type ToDoItemProps = {
  id: PrismaToDoItem["id"];
  checked: boolean;
  text: string;
};

export const ToDoItem: FC<ToDoItemProps> = ({ id, checked, text }) => {
  const trpcContext = trpc.useContext();
  const updateToDo = trpc.toDo.update.useMutation();
  const [isInUpdateMode, setIsInUpdateMode] = useState(false);

  const onClick = () => {
    updateToDo.mutate(
      {
        id,
        completed: !checked,
      },
      {
        onSettled() {
          trpcContext.toDo.get.fetch();
        },
      }
    );
  };

  return (
    <div className={styles.root}>
      <label
        className={useCombinedClasses(styles.label, checked && styles.checked)}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => {
            event.preventDefault();
            onClick();
          }}
        />

        {isInUpdateMode ? (
          <ToDoInput id={id} value={text} onSubmit={() => setIsInUpdateMode(false)} />
        ) : (
          <span className={styles.content}>{text}</span>
        )}
      </label>
      <span className={styles.options}>
        <EditToDoButton
          onClick={() => setIsInUpdateMode((previousValue) => !previousValue)}
        />
        <DeleteToDoButton id={id} />
      </span>
    </div>
  );
};
