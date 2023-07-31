import { Theme, useMediaQuery } from "@mui/material";
import {
  AutocompleteInput,
  Datagrid,
  DateField,
  List,
  ReferenceField,
  ReferenceInput,
  TextField,
} from "react-admin";
import { Resources } from "../resources";

import { NumberField } from "react-admin";

const filters = [
  // <TextInput source="q" label="Search" alwaysOn key="search" />,
  <ReferenceInput source="email" reference={Resources.users} key="ref1">
    <AutocompleteInput source="email" label="Пользователь" />
  </ReferenceInput>,
];

export const TransactionList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  return (
    <List filters={filters}>
      {isSmall ? (
        <Datagrid rowClick="edit">
          <ReferenceField source="userId" reference={Resources.users} />
          <NumberField source="sum" label="Сумма" />
          <DateField source="createdAt" label="Создан" />
          {/* <EditButton label="Редактировать" /> */}
        </Datagrid>
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <NumberField source="sum" label="Сумма" />
          <DateField source="createdAt" label="Создан" />
          <ReferenceField
            source="userId"
            reference="users"
            label="Пользователь"
          />
        </Datagrid>
      )}
    </List>
  );
};
