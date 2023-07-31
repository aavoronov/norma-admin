import { Theme, useMediaQuery } from "@mui/material";
import {
  Create,
  CreateButton,
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

export const CourseSectionList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.section}
          secondaryText={(record) => record.description}
          tertiaryText={(record) => record.course}
        >
          <CreateButton />
        </SimpleList>
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="section" label="Секция" />
          <DateField source="createdAt" label="Создан" />
          <DateField source="updatedAt" label="Обновлен" />
          <EditButton label="Редактировать" />
        </Datagrid>
      )}
    </List>
  );
};

export const CourseSectionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="section" label="Секция" />
      <DateInput source="createdAt" disabled label="Создан" />
      <DateInput source="updatedAt" disabled label="Обновлен" />
    </SimpleForm>
  </Edit>
);

export const CourseSectionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="section" label="Секция" />
    </SimpleForm>
  </Create>
);
