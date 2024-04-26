import { useUniversitiesStore } from "../store/universities.store";
import { VirtualScrollWithLibrary } from '../components/virtualScrollWithLibrary';
import { CustomVirtualScroll } from '../components/customVirtualScroll';
import { SectionTitle } from '../components/sectionTitle/sectionTitle';
import { ErrorText } from "../components/errorText";
import { LoadingWrapper } from "../components/loadingWrapper";

export const AppRenderer = () => {
  const {
    universities,
    fetchUniversities,
    loading,
    error
  } = useUniversitiesStore();

  return (
    <>
      {loading && <LoadingWrapper />}
      <button className="fetchQuotesBtn" onClick={fetchUniversities}>Fetch Universities</button>

      {error && <ErrorText text={`Error while fetching: ${error}`} />}

      <SectionTitle>
        Implementation with React-window Library
      </SectionTitle>
      {universities.length > 0 && <VirtualScrollWithLibrary />}

      <SectionTitle>
        Custom Implementation
      </SectionTitle>
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
