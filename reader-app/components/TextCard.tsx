import { Text, View } from "react-native";
import InteractiveText from "./InteractiveTextProps";


export default function TextCard({ title, alternate_title, text, word_data }: TextParagraph) {
    let words = text.split(" ");
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

      <Text className="mt-3 leading-6 text-gray-700">
        <InteractiveText words={words} wordData={word_data} />
      </Text>
    </View>
  );
}