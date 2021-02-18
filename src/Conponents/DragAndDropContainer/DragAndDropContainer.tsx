import React, {useCallback, useEffect, useState} from "react";
import styles from './styles.module.css'
import WordCloud from "../WordCloud/WordCloud";
import WordPasteField from "../WordPasteField/WordPasteField";
import sentenceSet from "../../sentenceSet";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../itemTypes";
import update from "immutability-helper";

function getArrayOfWords(indexOfSentenceSet: number) {
    const sentence = sentenceSet.get(Array.from(sentenceSet.keys())[indexOfSentenceSet]);
    return sentence.replace(',', '')
        .split(' ')
        .map((text: string, index: number) =>
            ({
                text: text,
                id: `word_${index}`,
                dragFrom: `Cloud`,
            })
        );
}

function DragAndDropContainer() {

    const initialWords = getArrayOfWords(0);
    const [wordsInCloud, setWordsInCloud] = useState(initialWords);
    const [wordsInPasteField, setWordsInPasteField] = useState([]);

    const [{canDrop, isOver, didDrop, dropResult}, dropRef] = useDrop({
        accept: ItemTypes.WORD,
        drop: (item, monitor) => {
            const itemID = monitor.getItem().id;
            const wordIndex = initialWords.findIndex((word: { id: any; }) => word.id === itemID);
            switch (monitor.getDropResult().dropZone) {
                case 'Field': {
                    const filteredPasteField = wordsInPasteField.filter((word: { id: any; }) => word.id !== itemID);
                    const filteredCloud = wordsInCloud.filter((word: { id: any; }) => word.id !== itemID);

                    // @ts-ignore
                    setWordsInPasteField([...filteredPasteField, initialWords[wordIndex]]);
                    setWordsInCloud(filteredCloud);
                }
                    break;
                case "Cloud": {

                }
                    break;
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
        const dragWord = wordsInCloud[dragIndex];
        setWordsInCloud(
            update(wordsInCloud, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragWord]
                ]
            })
        );
    }, [wordsInCloud]);

    // if (didDrop && dropResult.dropZone === 'Cloud') {
    //     console.log('drop in cloud')
    // }
    //
    // if (didDrop && dropResult.dropZone === 'Field') {
    //     console.log('drop in field')
    // }


    return (
        <div className={styles.dragAndDropContainer}>
            <WordPasteField words={wordsInPasteField}/>
            <WordCloud words={wordsInCloud}/>
        </div>
    )
}

export default DragAndDropContainer