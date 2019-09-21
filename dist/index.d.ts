declare type PositionString = "CENTER" | "LEFT_TOP" | "RIGHT_TOP" | "CENTER_TOP" | "LEFT_CENTER" | "LEFT_BOTTOM" | "RIGHT_BOTTOM" | "CENTER_BOTTOM" | "RIGHT_CENTER";
declare type AxisString = "x" | "y" | "both";
declare type ContainerPosition = [number, number] | PositionString;
interface IOptions {
    container?: Element | Window;
    axis?: AxisString;
}
export default function (position: ContainerPosition, nodes: NodeList, options: IOptions): Node;
export {};
