import React, {useCallback, useState} from "react";
import styles from './styles.module.css'
// @ts-ignore
import cn from "classnames"
import {useDrop} from 'react-dnd'
import {ItemTypes} from "../../itemTypes";
import Word from "../Word/WordProps";
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


    return (
        <div
            id={'WordDropZone'}
            className={styles.dropZone}
            >
            {wordsInField.map((word: { id: number; text: string }, index: number) =>
                <Word
                    key={word.id}
                    index={index}
                    id={word.id}
                    text={word.text}
                />
            )}
        </div>
    )
}

export default WordPasteField