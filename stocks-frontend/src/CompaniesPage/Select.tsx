import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export interface Option<K> {
  key: K;
  label: string;
}

interface Props<K extends string> {
  label: string;
  options: Option<K>[];
  value: K;
  onChange: (value: K) => void;
}

const Select = <K extends string>({ options, ...props }: Props<K>) => (
  <Menu>
    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
      {props.label} <b>{options.find((o) => o.key === props.value)?.label}</b>
    </MenuButton>
    <MenuList>
      {options.map((option) => (
        <MenuItem onClick={() => props.onChange(option.key)} key={option.key}>
          {option.label}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export default Select;
