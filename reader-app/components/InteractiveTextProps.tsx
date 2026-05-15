import fetchWordMeaning from "@/services/readerFetch";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  LayoutRectangle,
} from "react-native";

type InteractiveTextProps = {
  words: string[];
  wordMeanings: string[];
};

export default function InteractiveText({
  words, wordMeanings
}: InteractiveTextProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [wordLayouts, setWordLayouts] = useState<
    Record<number, LayoutRectangle | undefined>
  >({});

  const { width: screenWidth } = useWindowDimensions();

  const POPUP_WIDTH = 260;
  const SCREEN_PADDING = 12;

  return (
    <View className="flex-row flex-wrap">
      {words.map((word, index) => {
        const isSelected = selectedIndex === index;

        const layout = wordLayouts[index];

        // Center popup above the word
        let popupLeft = 0;

        // Arrow position INSIDE popup
        let arrowLeft = POPUP_WIDTH / 2 - 6;

        if (layout) {
          // Desired popup x relative to screen
          const desiredPopupX =
            layout.x +
            layout.width / 2 -
            POPUP_WIDTH / 2;

          // Clamp inside screen
          const clampedPopupX = Math.max(
            SCREEN_PADDING,
            Math.min(
              desiredPopupX,
              screenWidth -
                POPUP_WIDTH -
                SCREEN_PADDING
            )
          );

          // Convert to local coordinates
          popupLeft = clampedPopupX - layout.x;

          // Position arrow so it points to word center
          arrowLeft =
            layout.width / 2 -
            popupLeft -
            6;
        }

        return (
          <View
            key={`${word}-${index}`}
            className="relative flex-row items-center"
            onLayout={(e) => {
              const layout =
                e?.nativeEvent?.layout;

              if (!layout) return;

              setWordLayouts((prev) => ({
                ...prev,
                [index]: layout,
              }));
            }}
          >
            {isSelected && layout && (
              <View
                style={{
                  width: POPUP_WIDTH,
                  left: popupLeft,
                }}
                className="
                  absolute
                  bottom-8
                  z-10
                  rounded-2xl
                  bg-gray-900
                  p-3
                  shadow-lg
                "
              >
                <Text className="text-sm leading-5 text-white break-all">
                  {word}: {wordMeanings[selectedIndex]}
                </Text>

                {/* Arrow */}
                <View
                  style={{
                    left: arrowLeft,
                  }}
                  className="
                    absolute
                    bottom-[-6px]
                    h-3
                    w-3
                    rotate-45
                    bg-gray-900
                  "
                />
              </View>
            )}

            <Pressable
              onPress={() =>
                setSelectedIndex(
                  isSelected ? null : index
                )
              }
            >
              <Text className="border-b border-blue-500 text-base leading-6 text-blue-700">
                {word}
              </Text>
            </Pressable>

            {index < words.length - 1 && (
              <Text className="text-base leading-6">
                {" "}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
}