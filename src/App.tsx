import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IntakeList from './components/IntakeList';
import IntakeDetail from './components/IntakeDetail';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntakeList />} />
          <Route path="/intakes/new" element={<IntakeDetail />} />
          <Route path="/intakes/:id" element={<IntakeDetail />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
