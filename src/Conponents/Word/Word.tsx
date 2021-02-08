import React from "react";
import styles from './styles.module.css'
import { useDrag } from 'react-dnd'
import {ItemTypes} from "../../itemTypes";
import {strict} from "assert";


interface WordProps {
    text: string,
    index: number
}

function Word(
    {
        text,
        index,
    }: WordProps
) {
    let id = `word${index}`;
    let type = ItemTypes.WORD;

    const [{isDragging}, drag] = useDrag({
        item: {id, type},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    return (
            <div
                className={styles.word}
                id={id}
                ref={drag}
                style={{opacity: isDragging ? 0.5 : 1}}
            >{text}</div>


    )
}

export default Word