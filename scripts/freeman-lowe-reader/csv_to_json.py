import json
import os
import pandas as pd

total = {}

with open('text.json', 'r') as file:
    data = json.load(file)
    chapters = data['chapters']
    for chapter in chapters:
        chapter_number = chapter['chapter_number']
        chapter_title = chapter['chapter_title']
        texts = chapter['texts']
        for text_data in texts:
            text_title = text_data['title']
            text_words = text_data['text']
            file_name = text_title.replace(" ", "_").lower().replace("\"", "")
            print("Processing " + file_name)
            if not os.path.isfile(f"{file_name}.csv"):
                text_data['word_data'] = []
                continue
            df = pd.read_csv(f"{file_name}.csv", index_col=0)
            df = df.drop(columns=["chapter_number", "chapter_name", "title"])
            # df.to_json(f"{file_name}.json", force_ascii=False, orient='records')
            os.makedirs('json',exist_ok=True)
            result = json.loads(df.to_json(force_ascii=False, orient='records'))
            text_data['word_data'] = result
    total = data


with open("./json/total.json", "w", encoding='utf-8') as outfile:
    json.dump(total, outfile, ensure_ascii=False, indent=4)