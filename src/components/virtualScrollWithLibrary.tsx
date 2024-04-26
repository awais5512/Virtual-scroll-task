import { FixedSizeList as List } from 'react-window'
import { useUniversitiesStore } from "../store/universities.store";
import AutoSizer from "react-virtualized-auto-sizer";
import { CSSProperties } from 'react';

const Row = ({ index, style }: { index: number, style: CSSProperties }) => {
  const { universities } = useUniversitiesStore();
  const university = universities[index];

  return (
    <div key={university.domains[0]} className="universityTitle" style={style}>{university.name}</div>
  )
}

export const VirtualScrollWithLibrary = () => {
	const { universities } = useUniversitiesStore();

	return (
		<article className="listWrapper">
			<AutoSizer>
				{({ height, width }) => (
					<List
						height={height}
						itemCount={universities.length}
						itemSize={50}
						width={width}
					>
						{Row}
					</List>
				)}
			</AutoSizer>
		</article>
	)
}
