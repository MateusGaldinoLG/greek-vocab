interface WordData{
    word: string;
    lemma: string;
    english_translation: string;
    beta_code: string;
    parsing_abbreviation: string;
}

interface TextParagraph{
    title: string;
    alternate_title: string | null;
    text: string;
    word_data: WordData[];
}

interface Chapter{
    chapter_number: number;
    chapter_title: string;
    texts: TextParagraph[];
}

interface Book{
    book: string;
    chapters: Chapter[];
}