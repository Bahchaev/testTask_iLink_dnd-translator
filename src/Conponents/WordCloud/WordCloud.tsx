import React, {useCallback, useState} from "react";
import update from 'immutability-helper';
import Word from "../Word/WordProps";
import styles from './styles.module.css'
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../itemTypes";


interface WordCloudProps {
    words: Array<any>,
    setWordsInCloud: any
}

function WordCloud(
    {
        words,
        setWordsInCloud,
    }: WordCloudProps
) {

    //const [wordsInCloud, setWordsInCloud] = useState(words);

    const moveWord = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const dragWord = words[dragIndex];
            setWordsInCloud(
                update(words, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragWord],
                    ]
                })
            )
        },
        [words],
    );

    return (
        <div
            id={'WordCloudZone'}
            className={styles.wordCloud}
        >
            {words.map((word: { id: number; text: string }, index: number) =>
                <Word
                    key={word.id}
                    index={index}
                    id={word.id}
                    text={word.text}
                    moveWord={moveWord}
                />
            )}
        </div>
    )
}

export default WordCloud


