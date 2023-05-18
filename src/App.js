import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages';
import SignupPage from './pages/SignupPage';

import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import LoginPage from './pages/LoginPage';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import AddClient from './pages/AddClient';
import UserDashBoardPage from './pages/UserDashboardPage'
import AddBalance from './pages/AddBalance';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

 

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* dashboard  */}
                {<Route path="/" element={localStorage.getItem("role")==="admin"?<Ecommerce /> : <UserDashBoardPage /> } />}
                <Route path="/ecommerce" element={localStorage.getItem("role")==="admin"?<Ecommerce /> : null} />

                {/* pages  */}
                <Route path="/orders" element={localStorage.getItem("role")==="admin"?<Orders /> : null} />
                <Route path="/addClient" element={localStorage.getItem("role")==="admin"?<AddClient /> : null} />
                <Route path="/clients" element={localStorage.getItem("role")==="admin"?<Customers /> : null} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/products" element={localStorage.getItem("role")==="admin"?<Products /> : null}/>
                <Route path="/addproduct" element={localStorage.getItem("role")==="admin"?<AddProduct /> : null}/>

                <Route path="/userDashboard" element={localStorage.getItem("role")==="admin"? null : <UserDashBoardPage />}/>
                <Route path="/addBalance" element={localStorage.getItem("role")==="admin"? null : <AddBalance />}/>
              

              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
