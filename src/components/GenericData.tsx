import { Theme, useMediaQuery } from "@mui/material";
import {
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  List,
  SimpleForm,
  SimpleList,
  TextField,
  TextInput,
} from "react-admin";

export const GenericDataList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => record.description}
          tertiaryText={(record) => record.course}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="key" label="Ключ" />
          <TextField source="value" label="Значение" />
          <DateField source="createdAt" label="Создан" />
          <DateField source="updatedAt" label="Обновлен" />
          <EditButton label="Редактировать" />
        </Datagrid>
      )}
    </List>
  );
};

export const GenericDataEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="key" label="Ключ" required />
      <TextInput source="value" label="Значение" required />
      <DateInput source="createdAt" disabled label="Создан" />
      <DateInput source="updatedAt" disabled label="Обновлен" />
    </SimpleForm>
  </Edit>
);

export const GenericDataCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="key" label="Ключ" required />
      <TextInput source="value" label="Значение" required />
    </SimpleForm>
  </Create>
);
