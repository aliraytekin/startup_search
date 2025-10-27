import StartupsTable from "./pages/Startups";
import './App.css';
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <>
      <AppLayout>
        <StartupsTable />
      </AppLayout>
    </>
  );
}

export default App;
