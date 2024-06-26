// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage/LoginPage'; // Thay đổi đường dẫn tương ứng với cấu trúc dự án của bạn
import Welcome from './pages/Welcome/Welcome'; // Tạo một file HomePage.js tương tự như LoginPage.js
import Register from './pages/Register/register'
import CreateProfilePage from './pages/CreateProfilePage/createprofilepage'
import Layout from "./pages/layout/Layout"
import BrowseCoursePage from './pages/layout/BrowseCoursePage/BrowseCoursePage'
import CourseDetailPage from './pages/layout/BrowseCoursePage/component/CourseDetailPage/CourseDetailPage'
import store from './redux/store';

import CartPage from './pages/layout/Cart/cart';
import InstructorsPage from './pages/layout/InstructorsPage/InstructorsPage';
function App() {
  return (
    <Provider store={store} >
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate replace to="/welcome" />} />
            <Route path="browsecourse" element={<BrowseCoursePage />} />

            <Route path="course/:courseId" element={<CourseDetailPage />} />

            <Route path="/cart" element={<CartPage />} />
            <Route path="instructor" element={<InstructorsPage />} />

          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createprofile" element={<CreateProfilePage />} />
        </Routes>
      </Router>
    </Provider>

  );
}

export default App;
