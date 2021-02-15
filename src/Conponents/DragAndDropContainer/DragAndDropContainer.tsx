import React, {useEffect, useState} from "react";
import styles from './styles.module.css'
import WordCloud from "../WordCloud/WordCloud";
import WordPasteField from "../WordPasteField/WordPasteField";
import sentenceSet from "../../sentenceSet";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../itemTypes";

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

    const [dropProps, dropRef] = useDrop({
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
                    const filteredPasteField = wordsInPasteField.filter((word: { id: any; }) => word.id !== itemID);
                    const filteredCloud = wordsInCloud.filter((word: { id: any; }) => word.id !== itemID);
                    const newWordsInCloud = [...filteredCloud, initialWords[wordIndex]];

                    const sortFunction = (a: { id: string; }, b: { id: string; }) => {
                        const aIndex = initialWords.findIndex((word: { id: any; }) => word.id === a.id);
                        const bIndex = initialWords.findIndex((word: { id: any; }) => word.id === b.id);
                        return aIndex - bIndex
                    };
                    newWordsInCloud.sort(sortFunction);

                    setWordsInPasteField(filteredPasteField);
                    setWordsInCloud(newWordsInCloud);
                }
                    break;
            }
        }
    });


    return (
        <div className={styles.dragAndDropContainer} ref={dropRef}>
            <WordPasteField words={wordsInPasteField}/>
            <WordCloud words={wordsInCloud}/>
        </div>
    )
}

export default DragAndDropContainer