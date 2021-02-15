import React from "react";
import Word from "../Word/Word";
import styles from './styles.module.css'
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../itemTypes";


interface WordCloudProps {
    words: Array<any>,
}

function WordCloud(
    {
        words,
    }: WordCloudProps
) {
    const [{canDrop, isOver}, drop] = useDrop({
        accept: ItemTypes.WORD,
        drop: (item, monitor) => {
            return {
                dropZone: 'Cloud'
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
            id={'WordCloudZone'}
            className={styles.wordCloud}
            ref={drop}
        >
            {words.map((word: { text: string; id: string; dragFrom: string }, index) =>
                <Word text={word.text} id={word.id} index={index}/>
            )}
        </div>
    )
}

export default WordCloud