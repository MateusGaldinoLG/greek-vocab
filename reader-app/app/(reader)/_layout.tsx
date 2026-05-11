import { Tabs } from "expo-router";
import { Text, View } from "react-native";

const TabIcon = ({focused, title}: any) => {
    return (
        <View>
            <View className="bg-white size-full justify-center items-center mt-4 rounded-full">
                <Text className="text-secondary size-full text-base font-semibold ml-2">{title}</Text>
            </View>
        </View>
    )
}

const _Layout = () => {
    return (
        <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            tabBarStyle: {
                // backgroundColor: '#0f0D23',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: 'absolute',
                overflow: 'hidden',
                borderColor: '0f0d23'
            }
        }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Index',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabIcon focused={focused} title="Index" />
                        </>
                    )
                }}
            />
            <Tabs.Screen
                name="reader"
                options={{
                    title: 'Reader',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabIcon focused={focused} title="Reader" />
                        </>
                    )
                }}
            />
        </Tabs>
    )
}

export default _Layout;