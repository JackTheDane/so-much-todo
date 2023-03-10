import React, { FC, ReactNode } from 'react'
import { useCombinedClasses } from '../hooks/useCombinedClasses'
import styles from "./Button.module.scss";

type ButtonProps = React.ComponentPropsWithoutRef<"button">

export const Button: FC<ButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <button {...props} className={useCombinedClasses(className, styles.root)}></button>
  )
}
