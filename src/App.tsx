import { useAppStore } from './App.store'
import './App.css'
import { Spinner } from './components/spinner/spinner';
import { VirtualScrollWithLibrary } from './components/virtualScrollWithLibrary';
// import { CustomVirtualScroll } from './components/customVirtualScroll';

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
      {universities.length > 0 && <VirtualScrollWithLibrary />}
      {/* {universities.length > 0 && <CustomVirtualScroll />} */}
    </>
  )
}

export default App
