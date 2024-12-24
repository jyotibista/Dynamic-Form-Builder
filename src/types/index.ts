export type Validation = {
    required?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    regex?: string;

};

export type Item = {
    id: string;
    type: "textbox" | "dropdown" | "radio" | "combobox" | "multiselect" | "datetime" | "file";
    label: string;
    validation: Validation;
    options?: string[];
    value?: string;
};



