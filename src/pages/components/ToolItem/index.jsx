import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown, faBroom } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css'

import { toolItemClick, actionItemClick } from '@/slice/toolSlice'

import { TOOLS } from '@/constants'

const ToolItem = () => {
    const dispatch = useDispatch()
    const activeToolItem = useSelector((state) => state.tool.activeToolItem)
    const handleMenuClick = (itemName) => {
        dispatch(toolItemClick(itemName))
    }

    const handleActioItemClick = (itemName) => {
        dispatch(actionItemClick(itemName))
    }
    return (
        <div className={styles.menuContainer}>
            <div className={styles.iconWrapper} onClick={() => handleActioItemClick(TOOLS.UNDO)}>
                <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper} onClick={() => handleActioItemClick(TOOLS.REDO)}>
                <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
            </div>
            <div className={cx(styles.iconWrapper, { [styles.active]: activeToolItem === TOOLS.PENCIL })} onClick={() => handleMenuClick(TOOLS.PENCIL)}>
                <FontAwesomeIcon icon={faPencil} className={styles.icon} />
            </div>
            <div className={cx(styles.iconWrapper, { [styles.active]: activeToolItem === TOOLS.ERASER })} onClick={() => handleMenuClick(TOOLS.ERASER)}>
                <FontAwesomeIcon icon={faEraser} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper} onClick={() => handleActioItemClick(TOOLS.ERASEALL)}>
                <FontAwesomeIcon icon={faBroom} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper} onClick={() => handleActioItemClick(TOOLS.DOWNLOAD)}>
                <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
            </div>
        </div>
    )
}

export default ToolItem;