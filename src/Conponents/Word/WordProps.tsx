import React, {useRef} from "react";
import styles from './styles.module.css'
import {DropTargetMonitor, useDrag, useDrop, XYCoord} from 'react-dnd'
import {ItemTypes} from "../../itemTypes";


interface WordProps {
    id: number
    text: string
    index: number
    moveWord?: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    index: number
    id: string
    type: string
}

function Word({id, text, index, moveWord}: WordProps) {
    const ref = useRef<HTMLDivElement>(null);

    const [{handlerId}, drop] = useDrop({
        accept: ItemTypes.WORD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if(dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            // @ts-ignore
            const hoverBoundingRect = ref.current.getBoundingClientRect();

            // Get horizontal middle
            const hoverMiddleX =
                (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the left
            const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

            // Dragging right
            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                console.log('dragging right');
                return
            }

            // Dragging left
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                console.log('dragging left');
                return
            }

            //Drag action
            if (moveWord) {
                moveWord(dragIndex, hoverIndex)
            }

            item.index = hoverIndex
        }
    });

    const [{isDragging}, drag] = useDrag({
        item: {index, type: ItemTypes.WORD},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));
    return (
        <div
            className={styles.word}
            ref={ref}
            style={{opacity: isDragging ? 0: 1}}
        >
            {text}
        </div>
    )
}

export default Word