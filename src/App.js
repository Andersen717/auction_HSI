import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WelcomePage from './pages/auction/welcome'
import CalendarPage from '../src/pages/auction/calendar'
import ServicePage from '../src/pages/auction/service'
import NetworkPage from '../src/pages/auction/network'
import Faq from '../src/pages/auction/faq'
import Bid from './pages/auction/bidToService';

import Dashboard from './pages/admin/dashboard';
import BidRecord from './pages/admin/bidRecord';
import Winner from './pages/admin/winnerRecord'
import EditService from './pages/admin/editService'
import AdminAccount from './pages/admin/adminAccount'
import NotFound from './pages/notFound'

import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";


//*************for redux-provider******* */
import { Provider as ReduxProvider } from 'react-redux';
import store from '../src/redux_model/store'


import './App.css';

function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        {/* <div className="App"> */}
        <Routes>
          <Route exact path='/' element={< WelcomePage />}></Route>
          <Route exact path='/services' element={< ServicePage />}></Route>
          <Route exact path='/networks' element={< NetworkPage />}></Route>
          <Route exact path='/calendar' element={< CalendarPage />}></Route>
          <Route exact path='/faq' element={< Faq />}></Route>
          <Route exact path='/bid' element={< Bid />}></Route>
          <Route exact path='/admin/dashboard' element={< Dashboard />}></Route>
          <Route exact path='/admin/bid-record' element={< BidRecord />}></Route>
          <Route exact path='/admin/winner-record' element={< Winner />}></Route>
          <Route exact path='/admin/edit-service' element={< EditService />}></Route>
          <Route exact path='/admin/admin-accounts' element={< AdminAccount />}></Route>
          <Route path="*" element={< NotFound />}></Route>
        </Routes>
        {/* </div> */}
      </Router>
      <NotificationContainer />
    </ReduxProvider>
  );
}

export default App;
