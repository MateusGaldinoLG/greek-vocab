import { FlatList, Text, View } from "react-native";
import greekReader from "@/assets/json/total.json";
import TextCard from "@/components/TextCard";
import { Link } from "expo-router";

export default function Reader(){
    let chapters = greekReader.chapters as Chapter[];

    return (
      <View className="bg-white flex-1 justify-center p-10">
        <Text className="text-3xl font-bold text-center text-blue-500">
          {greekReader.book}
        </Text>
        <FlatList
          data={chapters}
          renderItem={({item}) => (
              <>
                  <Text className="text-2xl text-blue-800">
                    Chapter {item.chapter_number} - {item.chapter_title}
                  </Text>
                  {item.texts.map((text, index) =>
                      <Link href={`/texts/${text.title}`}>
                        <Text className="font-semibold text-xl">
                          {index+1}. {text.title}
                        </Text>
                      </Link>
                  )}
              </>
          )}
          keyExtractor={(item) => item.chapter_number.toString()}
        />
      </View>
    )
}