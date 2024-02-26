import React from "react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TOOLS } from "@/constants";
import { actionItemClick } from "@/slice/toolSlice";
import styles from "./index.module.css";

const SketchPad = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);
  const shouldDraw = useRef(false);
  const { activeToolItem, actionToolItem } = useSelector((state) => state.tool);
  const { color, size } = useSelector((state) => state.color[activeToolItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionToolItem === TOOLS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();

      // context.fillStyle = "blue";
      // context.fillRect(0, 0, canvas.width, canvas.height);
    } else if (actionToolItem === TOOLS.ERASEALL) {
      context.fillStyle = "#202124";
      context.fillRect(0, 0, canvas.width, canvas.height);
    } else if (
      actionToolItem === TOOLS.UNDO ||
      actionToolItem === TOOLS.REDO
    ) {
      if (historyPointer.current > 0 && actionToolItem === TOOLS.UNDO)
        historyPointer.current -= 1;
      else if (
        historyPointer.current < drawHistory.current.length - 1 &&
        actionToolItem === TOOLS.REDO
      )
        historyPointer.current += 1;
      else return;

      const imageData = drawHistory.current[historyPointer.current];
      context.putImageData(imageData, 0, 0);
    }
    dispatch(actionItemClick(null));
  }, [actionToolItem, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = (color, size) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    changeConfig(color, size);

  }, [color, size]);

  // before browser paint
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    function setCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    setCanvasSize()

    window.addEventListener("resize", setCanvasSize);



    const beginPath = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };
    const handleMouseDown = (e) => {
      shouldDraw.current = true;

      beginPath(
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY
      );

    };

    const handleMouseMove = (e) => {
      if (!shouldDraw.current) return;

      let clientX, clientY;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      drawLine(clientX, clientY)

    };

    const handleMouseUp = (e) => {
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    };



    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    canvas.addEventListener("touchstart", handleMouseDown);
    canvas.addEventListener("touchmove", handleMouseMove);
    canvas.addEventListener("touchend", handleMouseUp);


    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      canvas.removeEventListener("touchstart", handleMouseDown);
      canvas.removeEventListener("touchmove", handleMouseMove);
      canvas.removeEventListener("touchend", handleMouseUp);


    };
  }, []);

  return (
    <>
      <img
        // src="https://i.ibb.co/7Yp4H6P/Group-12.png"
        src="https://cdn-www.bluestacks.com/bs-images/featured_com.adsk.sketchbook.jpg"
        alt=""
        style={{ position: "absolute", top: 0, left: 0, scale: "0.6", width: "300px" }}
        className={styles.logo}
      />
      <canvas ref={canvasRef} ></canvas>
    </>
  );
};

export default SketchPad;
