import { useAppStore } from './App.store'
import './App.css'
import { Spinner } from './components/spinner/spinner';
import { VirtualScrollWithLibrary } from './components/virtualScrollWithLibrary';
import { CustomVirtualScroll } from './components/customVirtualScroll';

function App() {
  const {
    universities,
    fetchUniversities,
    loading,
    error
  } = useAppStore();

  return (
    <>
      <button className="fetchQuotesBtn" onClick={fetchUniversities}>Fetch Universities</button>
      {loading && <div className="spinnerWrapper"><Spinner /></div>}
      {error && <p>Error while fetching: {error}</p>}
      <p className="sectionTitle">Implementation with React-window Library</p>
      {universities.length > 0 && <VirtualScrollWithLibrary />}
      <p className="sectionTitle">Custom Implementation</p>
      {universities.length > 0 && (
        <CustomVirtualScroll
          itemHeight={60}
          items={universities}
          renderItem={(item) => <div>{item.name}</div>}
          height={450}
          width={500}
        />
      )}
    </>
  )
}

export default App
