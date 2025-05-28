import { BasePage } from "@/components/pages";

function App() {
  return (
    <div className="relative w-full h-screen">
      <div className="p-4">
        <div className="text-blue-700">Clicca il bottone e controlla la console per verificare che sia tutto ok</div>
        <BasePage />
      </div>
    </div>
  );
}

export default App;
