import { Text, View } from "react-native";
import InteractiveText from "./InteractiveTextProps";
import { useEffect, useState } from "react";
import fetchWordMeaning from "@/services/readerFetch";


export default function TextCard({ title, alternate_title, text, word_data }: TextParagraph) {
  let words = text.split(" ");
  const [wordMeanings, setWordMeaning] = useState<string[]>([]);

  useEffect(() => {
    let meanings = [];
    for(let i = 0; i < words.length; i++){
      meanings.push(fetchWordMeaning(words[i], i, word_data));
    }
    setWordMeaning(meanings);
  }, [])
  return (
    <View className="bg-white rounded-2xl p-4 m-4 shadow-md border border-gray-200">
      <Text className="text-2xl font-bold text-gray-900">
        {title}

        {alternate_title && (
          <Text className="text-lg font-normal text-gray-500">
            {" "}
            ({alternate_title})
          </Text>
        )}
      </Text>

      <Text className="mt-3 mb-6 leading-6 text-gray-700">
        <InteractiveText words={words} wordMeanings={wordMeanings} />
      </Text>
      <View className="">
        <Text className="text-xl font-bold">Words in Text:</Text>
        {word_data.map((item, index) => (
          <Text>
            <Text className="font-bold">{item.word}</Text>: {wordMeanings[index]}
          </Text>
        ))}
      </View>
    </View>
  );
}