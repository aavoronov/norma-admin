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
  TabbedForm,
  TextField,
  TextInput,
  required,
} from "react-admin";
import { Resources } from "../resources";

const filters = [
  <TextInput source="title" label="Название" alwaysOn key="search1" />,
  <TextInput source="description" label="Описание" key="search2" />,
];

export const CourseList = () => {
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
          <TextField source="title" label="Название" />
          <TextField source="description" label="Описание" />
          <DateField source="createdAt" label="Создан" />
          <DateField source="updatedAt" label="Обновлен" />
          <ReferenceField
            source="filterId"
            reference={Resources.courseFilterOptions}
          />
          <ReferenceField
            source="sectionId"
            reference={Resources.courseSections}
          />
          <EditButton label="Редактировать" />
        </Datagrid>
      )}
    </List>
  );
};

export const CourseEdit = () => (
  <Edit>
    <TabbedForm>
      <TabbedForm.Tab label="Основное">
        <TextInput source="id" disabled />
        <TextInput source="title" label="Название" required />
        <TextInput source="description" label="Описание" multiline />
        <DateInput source="createdAt" disabled label="Создан" />
        <DateInput source="updatedAt" disabled label="Обновлен" />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Принадлежность">
        <ReferenceInput
          source="filterId"
          reference={Resources.courseFilterOptions}
        >
          <AutocompleteInput
            label="Категория фильтра"
            isRequired
            validate={required()}
          />
        </ReferenceInput>
        <ReferenceInput
          source="sectionId"
          reference={Resources.courseSections}
          validate={required()}
        >
          <AutocompleteInput label="Секция" isRequired validate={required()} />
        </ReferenceInput>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Превью">
        <ReferenceInput source="preview.id" reference={Resources.previews}>
          <AutocompleteInput
            label="Превью"
            helperText="Превью может принадлежать только одному уроку"
          />
        </ReferenceInput>
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);

export const CourseCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Название" required />
      <TextInput source="description" label="Описание" multiline />
      <ReferenceInput
        source="filterId"
        reference={Resources.courseFilterOptions}
      >
        <AutocompleteInput
          label="Категория фильтра"
          isRequired
          validate={required()}
        />
      </ReferenceInput>
      <ReferenceInput
        source="sectionId"
        reference={Resources.courseSections}
        validate={required()}
      >
        <AutocompleteInput label="Секция" isRequired validate={required()} />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
