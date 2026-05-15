import { useLocalSearchParams, useNavigation } from "expo-router"
import { Button, FlatList, ScrollView, Text, View } from "react-native";
import greekReader from "@/assets/json/total.json";
import TextCard from "@/components/TextCard";


export default function TextBody() {
    const { text } = useLocalSearchParams();
    const navigation = useNavigation();

    let chapters = greekReader.chapters as Chapter[];
    let chapter = chapters[0];
    let paragraph = chapter.texts.find((item) => item.title == text);


    return (
        <View className="flex-1 mt-4">
            <View className={"mx-5 flex-row items-center"}>
                <Button title="Back" onPress={() => navigation.goBack()} />
            </View>
            <ScrollView contentContainerStyle={{paddingTop: 20}} >
                {paragraph ? <TextCard {...paragraph} />
                        : <Text>Ops... An Error Happened</Text>
                }
            </ScrollView>
        </View>
    )
}