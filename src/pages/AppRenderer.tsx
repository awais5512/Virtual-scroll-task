import { useUniversitiesStore } from "../store/universities.store";
import { CustomVirtualScroll } from '../components/customVirtualScroll';
import { SectionTitle } from '../components/sectionTitle/sectionTitle';
import { ErrorText } from "../components/errorText";
import { LoadingWrapper } from "../components/loadingWrapper";
import { InfiniteLoaderVariant } from "../components/infiniteLoaderVariant";
import { VariableVirtualScrollVariant } from "../components/variableVirtualScrollVariant";

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
        Implementation with React-window Library with Infinite Scrolling
      </SectionTitle>
      {universities.length > 0 && <InfiniteLoaderVariant />}

      <SectionTitle>Implementation of Variable Size List</SectionTitle>
      {universities.length > 0 && <VariableVirtualScrollVariant />}

      <SectionTitle>Custom Implementation of Virtual scroll</SectionTitle>
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
