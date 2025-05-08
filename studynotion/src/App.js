import logo from './logo.svg';
import './App.css';

import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './common/Navbar';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from "./pages/UpdatePasswords";
import VerifyEmail from "./pages/VerifyEmail";
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/core/setting/MyProfile';
import PrivateRoute from './components/core/auth/PrivateRoute';
import Setting from './components/core/setting/Setting';
import EnrolledCourses from './components/core/dashboard/EnrolledCourses';
import Voice from "./pages/Voice";
import Compiler from './compiler/Compiler'; 
import Cart from './components/core/dashboard/cart/Cart';
import { ACCOUNT_TYPE } from './utils/constants'; 
import { useSelector } from 'react-redux';
import AddCourse from './components/core/dashboard/AddCourse';
import MyCourses from './components/core/dashboard/MyCourses';
import EditCourse from './components/core/dashboard/EditCourse/EditCourse';
import { CatalogPage } from './pages/CatalogPage';
import CourseDetails from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/core/viewCourse/VideoDetails';
import Instructor from './components/core/dashboard/InstructorDashboard/InstructorDashboard';

function App() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
     <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="catalog/:catalogName" element={<CatalogPage/>}/>
        <Route path="courses/:courseId" element={<CourseDetails/>}/>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="/update-password/:token" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/compiler" element={<Compiler/>}></Route>
    
        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
  <Route path="/dashboard/my-profile" element={<MyProfile/>} />
  <Route path="/dashboard/settings" element={<Setting/>} />
  <Route path="/voice" element={<Voice/>} />

  {user?.accountType === ACCOUNT_TYPE.STUDENT && (
    <>
      <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
      <Route path="/dashboard/cart" element={<Cart />} />
    </>
  )}

  {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
    <Route path="/dashboard/add-course" element={<AddCourse />} />
  )}

{user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
  <>
    <Route path="/dashboard/instructor" element={<Instructor/>}/>
    <Route path="/dashboard/my-courses" element={<MyCourses/>} />
    <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>} />
    </>
  )}
   
</Route>
<Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

      </Routes>
    </div>
  );
}

export default App;
