import { Route, Routes, Navigate } from "react-router-dom";
import Landpage from "@pages/Landpage";
import LogIn from "@pages/Login";
import Register from "@pages/Register";
import UserProfile from "@pages/UserProfile";
import ProfesorProfile from "@pages/ProfesorProfile";
import CourseDetail from "@pages/CourseDetail";
import Header from "@components/Header";
import CourseCreation from "@pages/CourseCreation";
import { SearchContextProvider } from "@context/SearchContext";
import { CourseContextProvider } from "@context/CourseContext";
import Donation from "@pages/Donation";

const WithHeader = ({ component }) => (
  <>
    <Header />
    {component}
  </>
);

const Router = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to="/login" />}></Route>
      <Route path="/login" element={<LogIn />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/home"
        element={
          <SearchContextProvider>
            <WithHeader component={<Landpage />} />
          </SearchContextProvider>
        }
      ></Route>
      <Route
        path="/profile"
        element={<WithHeader component={<UserProfile />} />}
      ></Route>
      <Route
        path="/profesor"
        element={<WithHeader component={<ProfesorProfile />} />}
      ></Route>
      <Route
        path="/donation"
        element={<WithHeader component={<Donation />} />}
      ></Route>
      <Route
        path="/course-creation"
        element={<WithHeader component={<CourseCreation />} />}
      ></Route>
      <Route
        path="/course/:id"
        element={
          <CourseContextProvider>
            <WithHeader component={<CourseDetail />} />
          </CourseContextProvider>
        }
      ></Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function PageNotFound() {
  return (
    <div style={{ marginLeft: "20px" }}>
      <h1>404 Page not found</h1>
    </div>
  );
}

export default Router;
