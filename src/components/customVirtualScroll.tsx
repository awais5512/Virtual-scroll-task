import { UIEvent, useEffect, useMemo, useRef, useState } from "react";
import { University } from "../App.store";

interface ListProps {
	height?: number,
	width?: number,
	itemHeight?: number,
	items: University[],
	renderItem: (item: University) => JSX.Element | null
	buffer?: number
}

export const CustomVirtualScroll = ({
	height = 300,
	width = 300,
	itemHeight = 35,
	items = [],
	renderItem = () => null,
	buffer = 3
}: ListProps
) => {
	const scrollableView = useRef<HTMLDivElement>(null);
	const [scrollTop, setScrollTop] = useState(0);
	const [visibleItems, setVisibleItems] = useState<University[]>([]);

	const numberOfVisibleRow = useMemo(() => {
		return Math.ceil(height / itemHeight);
	}, [height, itemHeight]);

	const scrollHeight = useMemo(() => {
		return items.length * itemHeight;
	}, [items, itemHeight]);

	const handleScroll = (event: UIEvent<HTMLDivElement>) => {
		setScrollTop(event.currentTarget.scrollTop);
	}

	const getItemOffsetStyle = (index: number) => {
		return `translateY(${index * itemHeight}px)`;
	}

	useEffect(() => {
		const startIndex = Math.floor(scrollTop / itemHeight);
		const endIndex = (startIndex + numberOfVisibleRow) + buffer;
		const itemsToRender = items.slice(startIndex, endIndex)

		itemsToRender.forEach((item, index) => {
			item.id = Number(startIndex + index);
		})

		setVisibleItems(items.slice(startIndex, endIndex));
	}, [scrollTop, items, itemHeight, buffer, numberOfVisibleRow]);

	return (
		<article className='position-relative'>
			<div
				className="virtual-list"
				style={{ height: height, width: width }}
				ref={scrollableView}
				onScroll={handleScroll}
			>
				<div
					className='virtual-list-item-wrapper'
					style={{ minHeight: scrollHeight, width: '100%' }}
				>
					{
						visibleItems.map((item, index) => (
							<div
								className='virtual-list-item'
								key={index}
								style={{
									width: itemHeight,
									height: itemHeight,
									transform: getItemOffsetStyle(item.id as number),
								}}
							>
								{renderItem(item)}
							</div>
						))
					}
				</div>
			</div>
		</article>
	)
}
