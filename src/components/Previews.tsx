import { Theme, useMediaQuery } from "@mui/material";
import {
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  ImageField,
  ImageInput,
  List,
  ReferenceField,
  ReferenceInput,
  SimpleForm,
  SimpleList,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";

export const PreviewImageField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  console.log("record", record);
  const fakeRecord = {
    [source]: `${import.meta.env.VITE_API_URL}/uploads/previews/${
      record[source]
    }`,
  };
  return <ImageField source={source} record={fakeRecord} />;
  // return <UrlField source={source} record={fakeRecord}></UrlField>;
};

export const PreviewList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => record.description}
          //   tertiaryText={(record) => record.course}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <PreviewImageField source="url" />
          <DateField source="createdAt" label="Создан" />
          <DateField source="updatedAt" label="Обновлен" />
          <ReferenceField source="courseId" reference="courses" />
          <ReferenceField source="lessonId" reference="lessons" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

export const PreviewEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="url" label="Имя файла" disabled />
      <PreviewImageField source="url" />
      <DateInput source="createdAt" disabled label="Создан" />
      <DateInput source="updatedAt" disabled label="Обновлен" />
      <ReferenceInput source="courseId" reference="courses" />
      <ReferenceInput source="lessonId" reference="lessons" />
    </SimpleForm>
  </Edit>
);

export const PreviewCreate = () => (
  <Create>
    <SimpleForm>
      {/* <TextInput source="url" /> */}
      {/* <FileInput /> */}
      <ImageInput source="file" label="Изображение" accept="image/*" isRequired>
        <ImageField source="src" />
      </ImageInput>
      <ReferenceInput source="courseId" reference="courses" />
      <ReferenceInput source="lessonId" reference="lessons" />
    </SimpleForm>
  </Create>
);
