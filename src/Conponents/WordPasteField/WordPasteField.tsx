import React, {useCallback, useState} from "react";
import styles from './styles.module.css'
// @ts-ignore
import cn from "classnames"
import {useDrop} from 'react-dnd'
import {ItemTypes} from "../../itemTypes";
import Word from "../Word/Word";
import update from "immutability-helper";


interface WordPasteFieldProps {
    words: Array<any>,
}

function WordPasteField(
    {
        words,
    }: WordPasteFieldProps
) {

    const [wordsInField, setWordsInField] = useState(words);

    const [{canDrop, isOver, didDrop, dropResult}, drop] = useDrop({
        accept: ItemTypes.WORD,
        drop: (item, monitor) => {

            console.log(monitor.getItem());
            const dropWord = monitor.getItem();

            setWordsInField(
                update(wordsInField, {
                    $splice: [
                        [wordsInField.length, 0, dropWord]
                    ]
                })
            );
            return {
                dropZone: 'Field',
                dropWord: monitor.getItem()
            }
        },
        collect: (monitor) => {
            return ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
                didDrop: monitor.didDrop(),
                dropResult: monitor.getDropResult()
            })
        }
    });

    const moveWord = useCallback((dragIndex: number, hoverIndex: number) => {
        const dragWord = wordsInField[dragIndex];
        setWordsInField(
            update(wordsInField, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragWord]
                ]
            })
        );
    }, [wordsInField]);

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