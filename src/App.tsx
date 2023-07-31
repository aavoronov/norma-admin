import {
  Admin,
  Login,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import appDataProvider from "./dataProvider";
import { authProvider } from "./authProvider";
import { LessonCreate, LessonEdit, LessonList } from "./components/Lessons";
import { UserCreate, UserEdit, UserList } from "./components/Users";
import {
  CourseFilterOptionCreate,
  CourseFilterOptionEdit,
  CourseFilterOptionList,
} from "./components/CourseFilterOptions";
import {
  CourseSectionCreate,
  CourseSectionEdit,
  CourseSectionList,
} from "./components/CourseSections";
import { CourseCreate, CourseEdit, CourseList } from "./components/Courses";
import { FavouriteEdit, FavouriteList } from "./components/Favourites";
import {
  QuizOptionCreate,
  QuizOptionEdit,
  QuizOptionList,
} from "./components/QuizOptions";
import {
  QuizOptionsCategoryCreate,
  QuizOptionsCategoryEdit,
  QuizOptionsCategoryList,
} from "./components/QuizOptionsCategories";
import {
  SubscriptionPlanCreate,
  SubscriptionPlanEdit,
  SubscriptionPlanList,
} from "./components/SubscriptionPlans";
import { QuizReplyEdit, QuizReplyList } from "./components/QuizReplies";

import { Resources } from "./resources";
import polyglotI18nProvider from "ra-i18n-polyglot";
import russianMessages from "ra-language-russian";
import { PreviewCreate, PreviewEdit, PreviewList } from "./components/Previews";
import {
  LessonFileCreate,
  LessonFileEdit,
  LessonFileList,
} from "./components/LessonFiles";

import UserIcon from "@mui/icons-material/People";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import FilterListIcon from "@mui/icons-material/FilterList";
import TocIcon from "@mui/icons-material/Toc";
import SchoolIcon from "@mui/icons-material/School";
import GradeIcon from "@mui/icons-material/Grade";
import PhotoSizeSelectLargeIcon from "@mui/icons-material/PhotoSizeSelectLarge";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ChecklistIcon from "@mui/icons-material/Checklist";
import GradingIcon from "@mui/icons-material/Grading";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import PaymentIcon from "@mui/icons-material/Payment";
import SchemaIcon from "@mui/icons-material/Schema";
import {
  GenericDataCreate,
  GenericDataEdit,
  GenericDataList,
} from "./components/GenericData";
import { TransactionList } from "./components/Transactions";
import { Dashboard } from "./components/Dashboard";
import { AppLoginPage } from "./components/AppLoginPage";
import { AppLogin } from "./components/AppLogin";

export const i18nProvider = polyglotI18nProvider(() => russianMessages, "ru");

export const App = () => (
  <Admin
    requireAuth
    loginPage={AppLoginPage}
    dashboard={Dashboard}
    dataProvider={appDataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
  >
    <Resource
      icon={UserIcon}
      name={Resources.users}
      list={UserList}
      edit={UserEdit}
      recordRepresentation="email"
      options={{ label: "Пользователи" }}
    />

    <Resource
      icon={FilterListIcon}
      name={Resources.courseFilterOptions}
      list={CourseFilterOptionList}
      edit={CourseFilterOptionEdit}
      create={CourseFilterOptionCreate}
      recordRepresentation="title"
      options={{ label: "Фильтры курсов" }}
    />
    <Resource
      icon={TocIcon}
      name={Resources.courseSections}
      list={CourseSectionList}
      edit={CourseSectionEdit}
      create={CourseSectionCreate}
      recordRepresentation="section"
      options={{ label: "Секции курсов" }}
    />
    <Resource
      icon={SchoolIcon}
      name={Resources.courses}
      list={CourseList}
      edit={CourseEdit}
      create={CourseCreate}
      recordRepresentation="title"
      options={{ label: "Курсы" }}
    />
    <Resource
      icon={PlayLessonIcon}
      name={Resources.lessons}
      list={LessonList}
      edit={LessonEdit}
      create={LessonCreate}
      recordRepresentation="title"
      options={{ label: "Уроки" }}
    />

    <Resource
      icon={PhotoSizeSelectLargeIcon}
      name={Resources.previews}
      list={PreviewList}
      edit={PreviewEdit}
      create={PreviewCreate}
      options={{ label: "Превью уроков" }}
      // recordRepresentation="id"
    />
    <Resource
      icon={FileCopyIcon}
      name={Resources.lessonFiles}
      list={LessonFileList}
      edit={LessonFileEdit}
      create={LessonFileCreate}
      options={{ label: "Файлы уроков" }}
      recordRepresentation="title"
    />
    <Resource
      icon={ChecklistIcon}
      name={Resources.quizOptions}
      list={QuizOptionList}
      edit={QuizOptionEdit}
      create={QuizOptionCreate}
      recordRepresentation="title"
      options={{ label: "Опции опросника" }}
    />
    <Resource
      icon={GradingIcon}
      name={Resources.quizOptionsCategories}
      list={QuizOptionsCategoryList}
      edit={QuizOptionsCategoryEdit}
      create={QuizOptionsCategoryCreate}
      recordRepresentation="title"
      options={{ label: "Категории опросника" }}
    />
    <Resource
      icon={HowToRegIcon}
      name={Resources.quizReplies}
      list={QuizReplyList}
      edit={QuizReplyEdit}
      options={{ label: "Ответы опросника" }}
    />
    <Resource
      icon={PriceChangeIcon}
      name={Resources.subscriptionPlans}
      list={SubscriptionPlanList}
      edit={SubscriptionPlanEdit}
      create={SubscriptionPlanCreate}
      options={{ label: "Планы подписки" }}
    />
    <Resource
      icon={PaymentIcon}
      name={Resources.transactions}
      list={TransactionList}
      edit={undefined}
      create={undefined}
      options={{ label: "Транзакции" }}
    />
    <Resource
      icon={GradeIcon}
      name={Resources.favourites}
      list={FavouriteList}
      edit={undefined}
      create={undefined}
      options={{ label: "Избранное" }}
    />
    <Resource
      icon={SchemaIcon}
      name={Resources.genericData}
      list={GenericDataList}
      edit={GenericDataEdit}
      create={GenericDataCreate}
      options={{ label: "Прочие данные" }}
    />
  </Admin>
);
