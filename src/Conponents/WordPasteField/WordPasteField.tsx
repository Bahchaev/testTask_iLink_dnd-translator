import React, {useState} from "react";
import styles from './styles.module.css'
// @ts-ignore
import cn from "classnames"
import {useDrop} from 'react-dnd'
import {ItemTypes} from "../../itemTypes";

function WordPasteField() {

    const [{canDrop, isOver}, drop] = useDrop({
        accept: ItemTypes.WORD,
        drop: (item, monitor) => {
            //console.log(item);
            if (canDrop) {
                const dropZone = document.getElementById(`WordDropZone`);
                const appendedElement = document.getElementById(monitor.getItem().id);

                if (dropZone && appendedElement) dropZone.appendChild(appendedElement);

            }
        },
        collect: (monitor) => (
            {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }
        )
    });



    return (
        <div
            id={'WordDropZone'}
            className={isOver ? cn(styles.dropZone, styles.dropZoneOver) : cn(styles.dropZone)}
            ref={drop}
        >

        </div>
    )
}

export default WordPasteField