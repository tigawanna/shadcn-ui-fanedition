import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "./button";
import '../../tailwind.css';
export default {
    title: "Level / Sub level",
};
export const ButtonStory = () => (_jsx(Button, { variant: "default", size: "lg", className: "bg-violet-600 ", children: "Hello" }));
