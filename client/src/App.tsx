import ModeToggle from "./components/mode-toggle";
import {usePrimaryColor} from "./components/primary-provider";
import PrimaryToggle from "./components/primary-toggle";

function App() {
  const {primaryColor} = usePrimaryColor();

  return (
    <div className="flex items-center justify-center flex-col gap-3 bg-white dark:bg-black p-10">
      <ModeToggle />
      <PrimaryToggle />
      <h1 className={`text-${primaryColor}-500 text-2xl font-bold`}>
        Yes No MERN
      </h1>
      <button
        className={`bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 my-5`}
      >
        Click Me
      </button>
    </div>
  );
}

export default App;
