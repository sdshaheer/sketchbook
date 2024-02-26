import SketchPad from "./components/SketchPad";
import ToolItem from "./components/ToolItem";
import ColorBox from "./components/ColorBox";

export default function Home() {
  return (
    <div className="bg-[#202124] overflow-hidden sm:h-screen">
      <ToolItem />
      <SketchPad />
      <ColorBox />
    </div>
  );
}
