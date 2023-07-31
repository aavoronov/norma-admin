import { Theme, useMediaQuery } from "@mui/material";
import {
  BooleanField,
  BooleanInput,
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

export const QuizOptionsCategoryList = () => {
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
          <TextField source="title" label="Категория" />
          <TextField source="subtitle" label="Подзаголовок" />
          <BooleanField source="isMultipleChoice" label="Множественный выбор" />
          <DateField source="createdAt" label="Создан" />
          <DateField source="updatedAt" label="Обновлен" />
          <EditButton label="Редактировать" />
        </Datagrid>
      )}
    </List>
  );
};

export const QuizOptionsCategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="title" label="Категория" required />
      <TextInput source="subtitle" label="Подзаголовок" required />
      <BooleanInput source="isMultipleChoice" label="Множественный выбор" />
      <DateInput source="createdAt" disabled label="Создан" />
      <DateInput source="updatedAt" disabled label="Обновлен" />
    </SimpleForm>
  </Edit>
);

export const QuizOptionsCategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Категория" required />
      <TextInput source="subtitle" label="Подзаголовок" required />
      <BooleanInput source="isMultipleChoice" label="Множественный выбор" />
    </SimpleForm>
  </Create>
);
