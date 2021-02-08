import React from "react";
import Word from "../Word/Word";
import styles from './styles.module.css'
import sentenceSet from '../../sentenceSet'
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../itemTypes";

function WordCloud() {

    const sentence = sentenceSet.get(Array.from(sentenceSet.keys())[0]);
    const wordsArr = sentence.replace(',', '').split(' ');
    const words = wordsArr.map((word:string, index:number) =>
        <Word text={word} index={index}/>
    );

    const [{canDrop, isOver}, drop] = useDrop({
        accept: ItemTypes.WORD,
        drop: (item, monitor) => {
            //console.log(item);
            if (canDrop) {
                const dropZone = document.getElementById(`WordCloudZone`);
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
            id={'WordCloudZone'}
            className={styles.wordCloud}
            ref={drop}
        >
            {words}
        </div>
    )
}

export default WordCloud