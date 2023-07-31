import { Theme, useMediaQuery } from "@mui/material";
import {
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  List,
  ReferenceField,
  ReferenceInput,
  SimpleForm,
  SimpleList,
  TextField,
  TextInput,
} from "react-admin";
import { Resources } from "../resources";

export const QuizOptionList = () => {
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
          <TextField source="option" label="Вариант ответа" />
          <DateField source="createdAt" label="Создан" />
          <DateField source="updatedAt" label="Обновлен" />
          <ReferenceField
            source="categoryId"
            reference={Resources.quizOptionsCategories}
          />
          <EditButton label="Редактировать" />
        </Datagrid>
      )}
    </List>
  );
};

export const QuizOptionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="option" label="Вариант ответа" required />
      <DateInput source="createdAt" disabled label="Создан" />
      <DateInput source="updatedAt" disabled label="Обновлен" />
      <ReferenceInput
        source="categoryId"
        reference={Resources.quizOptionsCategories}
      />
    </SimpleForm>
  </Edit>
);

export const QuizOptionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="option" label="Вариант ответа" required />
      <ReferenceInput
        source="categoryId"
        reference={Resources.quizOptionsCategories}
      />
    </SimpleForm>
  </Create>
);
