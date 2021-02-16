import React, {useCallback, useState} from "react";
import update from 'immutability-helper';
import Word from "../Word/Word";
import styles from './styles.module.css'
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../itemTypes";


interface WordCloudProps {
    words: Array<any>,
    setWordsInCloud: Function,
}

function WordCloud(
    {
        words,
        setWordsInCloud
    }: WordCloudProps
) {

    const [wordsInCloud, setWords] = useState(words);
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

    const moveWord = useCallback((dragIndex: number, hoverIndex: number) => {
        const dragWord = words[dragIndex];
        setWords(
            update(words, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragWord]
                ]
            })
        );
    }, [words]);

    return (
        <div
            id={'WordCloudZone'}
            className={styles.wordCloud}
            ref={drop}
        >
            {wordsInCloud.map((word: { text: string; id: string; dragFrom: string }, index) =>
                <Word text={word.text} id={word.id} index={index} moveWord={moveWord}/>
            )}
        </div>
    )
}

export default WordCloud


