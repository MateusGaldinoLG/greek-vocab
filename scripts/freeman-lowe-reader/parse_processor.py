# import json
# import os

# import pandas as pd

# # def abbreviate_parsing(r):
# #     parsing = r['parsing_abbreviation']
# #     verb_words = ['active', 'middle', 'passive']
# #     if


# with open('text.json', 'r') as file:
#     data = json.load(file)
#     chapters = data['chapters']
#     for chapter in chapters:
#         chapter_number = chapter['chapter_number']
#         chapter_title = chapter['chapter_title']
#         texts = chapter['texts']
#         for text_data in texts:
#             text_title = text_data['title']
#             text_words = text_data['text']
#             file_name = text_title.replace(" ", "_").lower().replace("\"", "")
#             print("Processing " + file_name)
#             if not os.path.isfile(f"{file_name}.csv"):
#                 continue
#             df = pd.read_csv(f"{file_name}.csv", index_col=0)
#             print(df.head())

#             df['parsing_abbreviation'] = df.apply(abbreviate_parsing, axis=1)