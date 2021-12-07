
import Dashboard from "views/Dashboard.js";
import HistoricalData from "views/HistoricalData";
import UserPage from "views/User.js";
import AddUser from "views/AddUser.js";
import TreatmentDiagnosis from "views/TreatmentDiagnosis.js";
import SetAppointment from "views/SetAppointment";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-laptop-medical",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "fas fa-user-edit",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/adduser",
    name: "Add New Patient",
    icon: "fas fa-user-plus",
    component: AddUser,
    layout: "/admin",
  },
  {
    path: "/TreatmentDiagnosis",
    name: "Treatment & Diagnosis",
    icon: "fas fa-diagnoses",
    component: TreatmentDiagnosis,
    layout: "/admin",
  },
  {
    path: "/SetAppointment",
    name: "Set Appointment",
    icon: "far fa-calendar-check",
    component: SetAppointment,
    layout: "/admin",
  },
  {
    path: "/history",
    name: "Historical Data",
    icon: "fas fa-file-medical-alt",
    component: HistoricalData,
    layout: "/admin",
  }
];
export default routes;
