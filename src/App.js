import React from "react";
import { useLocalStore, userObserver, useObserver } from "mobx-react";

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    bugs: ["Centipede"],
    addBug: (bug) => {
      store.bugs.push(bug);
    },
    get bugsCount() {
      return store.bugs.length;
    },
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const BugsHeader = () => {
  const store = React.useContext(StoreContext);
  return useObserver(() => (
    <h2>{store.bugsCount} Bugs!</h2>
  ));
};

const BugList = () => {
  const store = React.useContext(StoreContext);

  return useObserver(() => (
    <ul>
      {store.bugs.map((bug) => (
        <li key={bug}>{bug}</li>
      ))}
    </ul>
  ));
};

const BugForm = () => {
  const store = React.useContext(StoreContext);
  const [bug, setBug] = React.useState("");

  return (
    <form
      onSubmit={(e) => {
        store.addBug(bug);
        setBug("");
        e.preventDefault();
      }}
    >
      <input
        type="text"
        value={bug}
        onChange={(e) => {
          setBug(e.target.value);
        }}
      />

      <button type="submit">Add</button>
    </form>
  );
};

function App() {
  return (
    <StoreProvider>
      <main>
        <BugsHeader />
        <BugList />
        <BugForm />
      </main>
    </StoreProvider>
  );
}

export default App;
