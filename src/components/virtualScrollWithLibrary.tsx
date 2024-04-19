import { FixedSizeList as List } from 'react-window'
import { useAppStore } from "../App.store";
import { CSSProperties } from 'react';

const Row = ({ index, style }: { index: number, style: CSSProperties }) => {
  const { universities } = useAppStore();
  const university = universities[index];

  return (
    <div key={university.domains[0]} className="universityTitle" style={style}>{university.name}</div>
  )
}

export const VirtualScrollWithLibrary = () => {
	const { universities } = useAppStore();

	return (
		<article className="listWrapper">
			<List
				height={400}
				itemCount={universities.length}
				itemSize={50}
				width="100%"
			>
				{Row}
			</List>
		</article>
	)
}
