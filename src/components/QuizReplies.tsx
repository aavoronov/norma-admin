import { Theme, useMediaQuery } from "@mui/material";
import {
  AutocompleteInput,
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

const filters = [
  <ReferenceInput
    source="userId"
    reference={Resources.users}
    key="ref1"
    alwaysOn
  >
    <AutocompleteInput label="Пользователь" />
  </ReferenceInput>,
];

export const QuizReplyList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={filters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => record.description}
          tertiaryText={(record) => record.course}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="occupation" />
          <TextField source="position" />
          <TextField source="anticipations" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
          <ReferenceField source="userId" reference={Resources.users} />
          <EditButton label="Редактировать" />
        </Datagrid>
      )}
    </List>
  );
};

export const QuizReplyEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="occupation" />
      <TextInput source="position" />
      <TextInput source="anticipations" />
      <DateInput source="createdAt" disabled label="Создан" />
      <DateInput source="updatedAt" disabled label="Обновлен" />
      <ReferenceInput source="userId" reference="users" />
    </SimpleForm>
  </Edit>
);

export const QuizReplyCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="occupation" />
      <TextInput source="position" />
      <TextInput source="anticipations" />
      <ReferenceInput source="userId" reference="users" />
    </SimpleForm>
  </Create>
);
