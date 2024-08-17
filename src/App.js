
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import ProfileDetail from './Pages/ProfileDetail';
import FeedBackPage from './Pages/FeedBackPage';
import WorkAllocatePage from './Pages/WorkAllocatePage';
import ActivitysectionPage from './Pages/ActivitysectionPage';




// import Navbar from './Component/Navbar/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <ProSidebarProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} >
              <Route path="/profiledetails" element={<ProfileDetail />} />
              <Route path="/feedbackdetails" element={<FeedBackPage />} />
              <Route path="/workdetails" element={<WorkAllocatePage />} />
              <Route path="/activitydetails" element={<ActivitysectionPage />} />
            </Route>
          </Routes>
        </ProSidebarProvider >
      </BrowserRouter >
    </>
  );
}

export default App;
