import React, { FC, ReactNode } from 'react'

type ButtonProps = React.ComponentPropsWithoutRef<"button">

export const Button: FC<ButtonProps> = ({
  ...props
}) => {
  return (
    <button {...props}></button>
  )
}
