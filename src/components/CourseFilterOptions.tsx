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

export const CourseFilterOptionList = () => {
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
          <TextField source="title" label="Название" />
          <DateField source="createdAt" label="Создан" />
          <DateField source="updatedAt" label="Обновлен" />
          <EditButton label="Редактировать" />
        </Datagrid>
      )}
    </List>
  );
};

export const CourseFilterOptionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="title" label="Название" required />
      <DateInput source="createdAt" disabled label="Создан" />
      <DateInput source="updatedAt" disabled label="Обновлен" />
    </SimpleForm>
  </Edit>
);

export const CourseFilterOptionCreate = () => (
  <Create>
    <SimpleForm>
      {/* <TextInput source="id" /> */}
      <TextInput source="title" label="Название" required />
    </SimpleForm>
  </Create>
);
