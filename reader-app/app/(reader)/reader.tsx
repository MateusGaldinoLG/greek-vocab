import { FlatList, Text, View } from "react-native";
import greekReader from "@/assets/json/total.json";
import TextCard from "@/components/TextCard";

export default function Reader(){
    let chapters = greekReader.chapters as Chapter[];
    let chapter = chapters[0];
    console.log(chapter.texts)

    return (
    <View className="bg-white">
      <Text className="text-xl font-bold text-blue-500">
        {greekReader.book}
      </Text>
      <FlatList
        data={chapters}
        renderItem={({item}) => (
            <>
                <Text className="text-xl">{item.chapter_title}</Text>
                {item.texts.map((text) => (
                    <Text className="text-lg">{text.title}</Text>
                ))}
            </>
        )}
        keyExtractor={(item) => item.chapter_number.toString()}
      />
      <FlatList
        data={chapter.texts}
        renderItem = {({item}) => (
            <TextCard {...item} />
        )}
        keyExtractor={(item) => item.title}
      />
    </View>
    )
}