import { StatusBar } from 'react-native';
import './global.css';
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen
          name="(reader)"
          options={{headerShown: false}}
        />
      </Stack>
    </>
  );
}
