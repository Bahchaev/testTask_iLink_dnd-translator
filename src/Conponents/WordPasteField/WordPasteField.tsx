import React, {useState} from "react";
import styles from './styles.module.css'
// @ts-ignore
import cn from "classnames"
import {useDrop} from 'react-dnd'
import {ItemTypes} from "../../itemTypes";
import Word from "../Word/Word";


interface WordPasteFieldProps {
    words: Array<any>,
    setWordsInPasteField: Function,
}

function WordPasteField(
    {
        words,
        setWordsInPasteField,
    }: WordPasteFieldProps
) {

    const [{canDrop, isOver}, drop] = useDrop({
        accept: ItemTypes.WORD,
        drop: (item, monitor) => {
            return {
                dropZone: 'Field'
            }
        },
        collect: (monitor) => {
            return ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            })
        }
    });


    return (
        <div
            id={'WordDropZone'}
            className={isOver ? cn(styles.dropZone, styles.dropZoneOver) : cn(styles.dropZone)}
            ref={drop}
        >
            {words.map((word: { text: string; id: string; dragFrom: string }, index) =>
                <Word text={word.text} id={word.id} index={index}/>
            )}
        </div>
    )
}

export default WordPasteField