import React, {useRef} from "react";
import styles from './styles.module.css'
import {DropTargetMonitor, useDrag, useDrop} from 'react-dnd'
import {ItemTypes} from "../../itemTypes";


interface Word {
    id: string
    text: string
    index: number
    moveWord?: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    id: string
    index: number
    type: string
}

function Word({id, text, index, moveWord}: Word) {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ItemTypes.WORD,
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Элемент не заменяет сам себя
            if (dragIndex === hoverIndex) {
                return
            }

            //размеры и положение накрываемого объекта
            // @ts-ignore
            const hoverWordRect = ref.current?.getBoundingClientRect();

            // середина по оси Х
            const hoverMiddleX = (hoverWordRect.right - hoverWordRect.left) / 2;

            // позиция курсора
            const cursorOffset = monitor.getClientOffset();

            // расстояние от курсора до левого края
            // @ts-ignore
            const hoverCursorX = (cursorOffset.x - hoverWordRect.left);

            //ничего не делаем если:
            if (
                (dragIndex < hoverIndex && hoverCursorX < hoverMiddleX) ||
                (dragIndex > hoverIndex && hoverCursorX > hoverMiddleX)
            ) {
                return
            }

            //тут должна быть функция сдвига элемента
            if (moveWord) {
                moveWord(dragIndex, hoverIndex)
            }
        }
    });

    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.WORD, id: id, index: index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    drag(drop(ref));
    return (
        <div
            className={styles.word}
            id={id}
            ref={ref}
            style={{opacity: isDragging ? 0.5 : 1}}
        >
            {text}
        </div>
    )
}

export default Word