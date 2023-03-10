import React, { FC } from 'react'

type TextInputProps = {
  value: string;
  onChange(newValue: string): void;
} & Omit<React.ComponentPropsWithoutRef<"input">, 'value' | 'onChange' | 'type'>;

export const TextInput: FC<TextInputProps> = ({
  value,
  onChange
}) => {
  return (
    <input type="text" value={value} onChange={(event) => {
      event.preventDefault();

      onChange(event.target.value);
    }} />
  )
}
