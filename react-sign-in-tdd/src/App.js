import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import PostPage from "./pages/Post/Post";

import Header from "./components/Header/Header";


function usePageViews(action) {
  let location = useLocation();
  useEffect(() => {
    action(location);
  }, [location]);
}
function AppContainer() {
  
  const [location,setLocation] = useState(window.location)
  usePageViews(setLocation);

  return (
    <>
      <Header location={location} />
      <main data-testid="app" className="App-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  );

}

export default App;
