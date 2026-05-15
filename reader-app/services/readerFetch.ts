

function fetchWordMeaning(word: string, pos: number, wordData: WordData[]): string{
    let translation = wordData[pos].english_translation
                                   .replace(/[^\x00-\x7F]/g, "")
                                   .split(",")
                                   .filter((item) => item.trim() !== "")
                                   .join(",");
    let parse = wordData[pos].parsing_abbreviation;
    let lemma = wordData[pos].lemma;
    let wordMeaning = `[${parse} of ${lemma}] ${translation}`;
    return wordMeaning;
}

export default fetchWordMeaning;