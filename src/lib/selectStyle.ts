import { StylesConfig, CSSObjectWithLabel } from "react-select";

export const reactSelectStyles: StylesConfig = {
    control: (base: CSSObjectWithLabel) => ({
        ...base,
        backgroundColor: "#1f2937",
        borderColor: "#4B5563",
    }),
    menu: (base: CSSObjectWithLabel) => ({
        ...base,
        backgroundColor: "#1f2937",
    }),
    option: (base: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
        ...base,
        backgroundColor: state.isFocused ? "#374151" : "#1f2937",
        color: "white",
    }),
    singleValue: (base: CSSObjectWithLabel) => ({
        ...base,
        color: "white",
    }),
    multiValue: (base: CSSObjectWithLabel) => ({
        ...base,
        backgroundColor: "#374151",
    }),
    multiValueLabel: (base: CSSObjectWithLabel) => ({
        ...base,
        color: "white",
    }),
    multiValueRemove: (base: CSSObjectWithLabel) => ({
        ...base,
        color: "white",
        ":hover": {
            backgroundColor: "#4B5563",
        },
    }),
};