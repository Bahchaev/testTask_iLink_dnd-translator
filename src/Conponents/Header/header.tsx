import React from "react";
import styles from './styles.module.css'

interface HeaderProps {
    text: string
}

function Header(
    {
        text
    }: HeaderProps
) {
    return <span className={styles.header}>{text}</span>
}

export default Header