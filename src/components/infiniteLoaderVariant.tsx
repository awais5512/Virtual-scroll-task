import { FixedSizeList as List } from 'react-window'
import { useUniversitiesStore } from "../store/universities.store";
import AutoSizer from "react-virtualized-auto-sizer";
import { CSSProperties } from 'react';
import InfiniteLoader from "react-window-infinite-loader";

const LOADING = 1;
const LOADED = 2;
const itemStatusMap: { [key: number]: number } = {};

const Row = ({ index, style }: { index: number, style: CSSProperties }) => {
	const { universities } = useUniversitiesStore();
	const university = universities[index];

	let label;

	if (itemStatusMap[index] === LOADED) {
		label = university.name;
	} else {
		label = "Loading...";
	}

	return (
		<div key={university.domains[0]} className="universityTitle" style={style}>
			{label}
		</div>
	)
}

const isItemLoaded = (index: number) => !!itemStatusMap[index];
const loadMoreItems = (startIndex: number, stopIndex: number) => {
	for (let index = startIndex; index <= stopIndex; index++) {
		itemStatusMap[index] = LOADING;
	}

	return new Promise<void>(resolve =>
		setTimeout(() => {
			for (let index = startIndex; index <= stopIndex; index++) {
				itemStatusMap[index] = LOADED;
			}

			resolve();
		}, 1000)
	);
};

export const InfiniteLoaderVariant = () => {
	const { universities } = useUniversitiesStore();

	return (
		<article className='listWrapper'>
			<InfiniteLoader
				isItemLoaded={isItemLoaded}
				itemCount={1000}
				loadMoreItems={loadMoreItems}
			>
				{({ onItemsRendered, ref }) => (
					<AutoSizer>
						{({ height, width }) => (
							<List
								height={height}
								itemCount={universities.length}
								itemSize={50}
								onItemsRendered={onItemsRendered}
								ref={ref}
								width={width}
							>
								{Row}
							</List>
						)}
					</AutoSizer>
				)}
			</InfiniteLoader>
		</article>
	)
}
