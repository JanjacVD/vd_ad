export type Language = "hr" | "en";
export type Translatable = {
    [key in Language]: string;
};
