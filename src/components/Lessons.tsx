import { Theme, useMediaQuery } from "@mui/material";
import {
  ArrayInput,
  AutocompleteArrayInput,
  AutocompleteInput,
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  List,
  NumberField,
  NumberInput,
  ReferenceArrayInput,
  ReferenceField,
  ReferenceInput,
  SimpleFormIterator,
  SimpleList,
  TabbedForm,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";
import { Resources } from "../resources";

const filters = [
  <TextInput source="title" label="Название" alwaysOn key="search1" />,
  <TextInput source="description" label="Описание" key="search2" />,
  <ReferenceInput
    source="filterId"
    reference={Resources.courseFilterOptions}
    key="ref1"
  >
    <AutocompleteInput label="Фильтр" />
  </ReferenceInput>,
  <ReferenceInput
    source="sectionId"
    reference={Resources.courseSections}
    key="ref2"
  >
    <AutocompleteInput label="Секция" />
  </ReferenceInput>,
  <ReferenceInput source="courseId" reference={Resources.courses} key="ref3">
    <AutocompleteInput label="Курс" />
  </ReferenceInput>,
];

export const LessonList = () => {
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
          <TextField source="title" label="Название урока" />
          <TextField source="description" label="Описание урока" />
          <NumberField source="views" label="Просмотры" />
          <TextField source="video" label="Ссылка на видео" />
          <NumberField source="duration" label="Длительность (в секундах)" />
          <BooleanField source="isPaid" label="Урок платный" />
          <NumberField source="order" label="Порядок" />
          {/* <TextField source="timings" label="Тайминги" /> */}
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
          <ReferenceField source="courseId" reference={Resources.courses} />
          <ReferenceField source="previewId" reference={Resources.previews} />
          <ReferenceField
            source="lessonFileId"
            reference={Resources.lessonFiles}
          />
          <EditButton label="Редактировать" />
        </Datagrid>
      )}
    </List>
  );
};

const TimingsArrayInput = () => {
  const record = useRecordContext();
  console.log("record", record.timings);
  return (
    <ArrayInput source="timings" label="Тайминги">
      <SimpleFormIterator>
        <TextInput source="time" label="Время" required />
        <TextInput source="content" label="Содержание" required />
      </SimpleFormIterator>
    </ArrayInput>
  );
};

export const LessonEdit = () => {
  return (
    <Edit>
      <TabbedForm>
        <TabbedForm.Tab label="Основное">
          <TextInput source="id" disabled />
          <TextInput source="title" label="Название урока" required />
          <TextInput source="description" label="Описание урока" multiline />
          <NumberInput source="views" label="Просмотры" disabled />
          <TextInput source="video" label="Ссылка на видео" required />
          <NumberInput
            source="duration"
            label="Длительность (в секундах)"
            required
          />

          <BooleanInput source="isPaid" label="Урок платный" />
          <NumberInput
            required
            source="order"
            label="Порядок в рамках курса"
            helperText="Произвольное число, главное, чтобы порядок возрастания-убывания был сохранен"
          />
          <DateInput source="createdAt" disabled label="Создан" />
          <DateInput source="updatedAt" disabled label="Обновлен" />
        </TabbedForm.Tab>
        {/* <TextInput source="timings" label="Тайминги" /> */}
        {/* <RichTextInput /> */}
        <TabbedForm.Tab label="Тайминги">
          <TimingsArrayInput />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Принадлежность">
          <ReferenceInput
            source="filterId"
            reference={Resources.courseFilterOptions}
          >
            <AutocompleteInput
              label="Категория фильтра"
              helperText="Если выбран курс, заполнять не нужно. Будут применены параметры курса"
            />
          </ReferenceInput>

          <ReferenceInput
            source="sectionId"
            reference={Resources.courseSections}
          >
            <AutocompleteInput
              label="Секция"
              helperText="Если выбран курс, заполнять не нужно. Будут применены параметры курса"
            />
          </ReferenceInput>
          <ReferenceInput source="courseId" reference={Resources.courses}>
            <AutocompleteInput
              label="Курс"
              helperText="Если оставить пустым, урок будет отдельным"
            />
          </ReferenceInput>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Файлы">
          {/* <ReferenceInput
            source="lessonFileId"
            reference={Resources.lessonFiles}
          >
            <AutocompleteInput label="Файлы" />
          </ReferenceInput>
          <ReferenceArrayField
            // addLabel={false}
            label="Превью"
            reference="preview"
            source="preview"
          >
            <Datagrid>
              <DateField source="createdAt" />
              <TextField source="body" />
              <ShowButton />
            </Datagrid>
          </ReferenceArrayField> */}

          <ReferenceInput source="preview.id" reference={Resources.previews}>
            <AutocompleteInput
              label="Превью"
              helperText="Превью может принадлежать только одному уроку"
            />
          </ReferenceInput>
          <ReferenceArrayInput
            // addLabel={false}

            reference={Resources.lessonFiles}
            source="fileIds"
          >
            <AutocompleteArrayInput
              label="Файлы урока"
              helperText="Файл может принадлежать только одному уроку"
            />
          </ReferenceArrayInput>
          {/* <Datagrid>
              <DateField source="createdAt" />
              <TextField source="body" />
              <ShowButton />
            </Datagrid> */}
          {/* </ReferenceArrayField> */}

          {/* <AddCommentButton /> */}
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};

export const LessonCreate = () => (
  <Create>
    <TabbedForm>
      <TabbedForm.Tab label="Основное">
        <TextInput source="title" label="Название урока" required />
        <TextInput source="description" label="Описание урока" multiline />
        <TextInput source="video" label="Ссылка на видео" required />
        <NumberInput
          source="duration"
          label="Длительность (в секундах)"
          required
        />

        <BooleanInput source="isPaid" label="Урок платный" />
        <NumberInput
          required
          source="order"
          label="Порядок в рамках курса"
          helperText="Произвольное число, главное, чтобы порядок возрастания-убывания был сохранен"
        />
      </TabbedForm.Tab>
      {/* <TextInput source="timings" label="Тайминги" /> */}
      {/* <RichTextInput /> */}
      <TabbedForm.Tab label="Тайминги">
        <ArrayInput source="timings" label="Тайминги">
          <SimpleFormIterator>
            <TextInput source="time" label="Время" required />
            <TextInput source="content" label="Содержание" required />
          </SimpleFormIterator>
        </ArrayInput>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Принадлежность">
        <ReferenceInput
          source="filterId"
          reference={Resources.courseFilterOptions}
        >
          <AutocompleteInput
            label="Категория фильтра"
            helperText="Если выбран курс, заполнять не нужно. Будут применены параметры курса"
          />
        </ReferenceInput>

        <ReferenceInput source="sectionId" reference={Resources.courseSections}>
          <AutocompleteInput
            label="Секция"
            helperText="Если выбран курс, заполнять не нужно. Будут применены параметры курса"
          />
        </ReferenceInput>
        <ReferenceInput source="courseId" reference={Resources.courses}>
          <AutocompleteInput
            label="Курс"
            helperText="Если оставить пустым, урок будет отдельным"
          />
        </ReferenceInput>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Файлы">
        <ReferenceInput source="previewId" reference={Resources.previews}>
          <AutocompleteInput label="Превью" />
        </ReferenceInput>
        <ReferenceInput source="lessonFileId" reference={Resources.lessonFiles}>
          <AutocompleteInput label="Файлы" />
        </ReferenceInput>
      </TabbedForm.Tab>
    </TabbedForm>
  </Create>
);
