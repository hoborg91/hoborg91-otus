export interface ILanguage { 
    readonly value: string;
    readonly viewValue: string;
}

export const en: ILanguage = {
    value: 'en',
    viewValue: 'English',
};

export const ru: ILanguage = {
    value: 'ru',
    viewValue: 'Russian',
};
