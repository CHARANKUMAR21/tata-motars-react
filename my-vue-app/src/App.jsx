import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarWithCarousel from "./Components/NavbarWithCarousel/NavbarWithCarousel";
import CarFeature from "./Components/NavbarWithCarousel/CarFeature/CarFeature";
import CarDetailPage from "./Components/NavbarWithCarousel/CarFeature/CarDetailPage";
import BookingPage from "./Components/BookingPage/BookingPage";
import TestDriveCard from "./Components/TestDriveCard/TestDriveCard";
import Footer from "./Components/Footer/Footer";
import GoToTop from "./Components/Gototop/GoToTop";
import CarShowcase from "./Components/VideoCarousel/VideoCarousel";

const App = () => {
  return (
    <Router>
      <div className="app">
        <NavbarWithCarousel />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CarFeature />
                <TestDriveCard />
              </>
            }
          />
          <Route path="/cars/:carId" element={<CarDetailPage />} />
          {/* Add the new booking route */}
          <Route path="/booking/:carId" element={<BookingPage />} />
        </Routes>
        <GoToTop />
        <Footer />
        {/* <CarShowcase /> */}
      </div>
    </Router>
  );
};

export default App;
