import { CSSProperties, RefObject, useEffect, useRef } from 'react';
import { VariableSizeList as List } from 'react-window'
import { useUniversitiesStore } from "../store/universities.store";
import AutoSizer from "react-virtualized-auto-sizer";

export const VariableVirtualScrollVariant = () => {
	const listRef = useRef() as RefObject<List>;
	const { universities } = useUniversitiesStore();
	const rowHeights = useRef<{ [key: number]: number }>({});

	function getRowHeight(index: number) {
		console.log(rowHeights.current[index] + 8 || 40);
		return rowHeights.current[index] + 8 || 40;
	}

	const Row = ({ index, style }: { index: number, style: CSSProperties }) => {
		const rowRef = useRef<HTMLDivElement>(null);
		const university = universities[index];

		useEffect(() => {
			if (rowRef.current) {
				setRowHeight(index, rowRef.current.clientHeight);
			}
			// eslint-disable-next-line
		}, [rowRef]);

		return (
			<div
				key={university.domains[0]}
				className="universityTitle bg-blue-300"
				style={style}>
					<span ref={rowRef}>
						{university.name}
					</span>
			</div>
		)
	}

	function setRowHeight(index: number, size: number) {
		if (listRef?.current) {
			listRef.current.resetAfterIndex(0);
			rowHeights.current = { ...rowHeights.current, [index]: size };
		}
	}

	return (
		<article className='listWrapper mt-24'>
			<AutoSizer>
				{({ height, width }) => (
					<List
						height={height}
						itemCount={universities.length}
						itemSize={getRowHeight}
						ref={listRef}
						width={width}
					>
						{Row}
					</List>
				)}
			</AutoSizer>
		</article>
	)
}
