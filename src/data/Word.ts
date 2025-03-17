export class Word {
    word: string; 
    meaning: string;
    example: string;
    translation: string;
    category: string;

    constructor(
        word: string, 
        meaning: string,
        example: string,
        translation: string,
        category: string,
    ) {
        this.word = word;
        this.meaning = meaning;
        this.example = example;
        this.translation = translation;
        this.category = category;
    }
}