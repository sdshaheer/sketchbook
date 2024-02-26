import { COLORS, TOOLS } from "@/constants";
import styles from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { changeColor, changeBrushSize } from "@/slice/colorSlice";
import cx from 'classnames'
// import { socket } from "@/socket";


const ColorBox = () => {
  const dispatch = useDispatch();
  const activeToolItem = useSelector((state) => state.tool.activeToolItem);
  const showStroke = activeToolItem === TOOLS.PENCIL;
  const showBrush =
    activeToolItem === TOOLS.PENCIL ||
    activeToolItem === TOOLS.ERASER;

  const { color, size } = useSelector((state) => state.color[activeToolItem]);

  const updateColor = (newColor) => {
    dispatch(changeColor({ item: activeToolItem, color: newColor }))
  };

  const updateBrushSize = (e) => {
    dispatch(changeBrushSize({ item: activeToolItem, size: e.target.value }))
  };



  return (
    <div className={styles.colorboxContainer}>
      {showBrush && <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Brush Size</h4>
        <div className={styles.itemContainer}>
          <input type="range" min={1} max={21} step={2} onChange={updateBrushSize} value={size} />
        </div>
      </div>}
      {showStroke && <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Stroke Color</h4>
        <div className={styles.itemContainer}>
          <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.RED })} style={{ backgroundColor: COLORS.RED }} onClick={() => updateColor(COLORS.RED)} />
          <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.YELLOW })} style={{ backgroundColor: COLORS.YELLOW }} onClick={() => updateColor(COLORS.YELLOW)} />
          <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.GREEN })} style={{ backgroundColor: COLORS.GREEN }} onClick={() => updateColor(COLORS.GREEN)} />
          <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.BLACK })} style={{ backgroundColor: COLORS.BLACK }} onClick={() => updateColor(COLORS.BLACK)} />
          <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.BLUE })} style={{ backgroundColor: COLORS.BLUE }} onClick={() => updateColor(COLORS.BLUE)} />
          <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.ORANGE })} style={{ backgroundColor: COLORS.ORANGE }} onClick={() => updateColor(COLORS.ORANGE)} />
        </div>
      </div>}

    </div>)
}

export default ColorBox;