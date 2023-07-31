import { Theme, useMediaQuery } from "@mui/material";
import {
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  FileField,
  FileInput,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SimpleForm,
  SimpleList,
  TextField,
  TextInput,
} from "react-admin";

import { UrlField, useRecordContext } from "react-admin";

const LessonFileUrlField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  const fakeRecord = {
    [source]: `${import.meta.env.VITE_API_URL}/uploads/lesson-files/${
      record[source]
    }`,
  };
  return <UrlField source={source} record={fakeRecord} label="Ссылка" />;
};

const filters = [
  <TextInput source="title" label="Название" alwaysOn key="search1" />,
];

export const LessonFileList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  return (
    <List filters={filters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => record.description}
          //   tertiaryText={(record) => record.course}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="title" label="Название" />
          <NumberField source="order" label="Порядок в рамках урока" />
          <LessonFileUrlField source="url" />
          <DateField source="createdAt" label="Создан" />
          <DateField source="updatedAt" label="Обновлен" />
          <ReferenceField source="lessonId" reference="lessons" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

export const LessonFileEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="title" required />
      <NumberInput
        required
        source="order"
        label="Порядок в рамках урока"
        helperText="Произвольное число, главное, чтобы порядок возрастания-убывания был сохранен"
      />
      <TextInput source="url" disabled />
      <LessonFileUrlField source="url" />
      <DateInput source="createdAt" disabled label="Создан" />
      <DateInput source="updatedAt" disabled label="Обновлен" />
      <ReferenceInput source="lessonId" reference="lessons" />
    </SimpleForm>
  </Edit>
);

export const LessonFileCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" required />
      <NumberInput
        required
        source="order"
        label="Порядок в рамках урока"
        helperText="Произвольное число, главное, чтобы порядок возрастания-убывания был сохранен"
      />
      <FileInput
        source="file"
        label="Файл"
        isRequired
        accept={".doc,.docx,.xml,application/msword,.pdf"}
      >
        <FileField source="src" title="title" />
      </FileInput>
      <ReferenceInput source="lessonId" reference="lessons" />
    </SimpleForm>
  </Create>
);
