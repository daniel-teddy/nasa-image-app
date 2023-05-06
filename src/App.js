import React from "react";
import "./tailwind.output.css";
import "./custom.css"

// import routes and route
import { Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";

import NewPage from "./pages/NewPage";

function App() {
  return (

    <div className="App custombackground h-screen w-screen">
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/asset/:id' element={<NewPage />} />
       {/*  <Route path='*' element={<Error />} /> */}
      </Routes>
    </div>
  );
}

export default App;
