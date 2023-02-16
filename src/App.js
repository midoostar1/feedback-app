
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackStats from "./components/FeedbackStats";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import FeedbackContex from "./context/FeedbackContex";
import { FeedbackProvider } from "./context/FeedbackContex";

const App = () => {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            ></Route>

            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
};
export default App;
