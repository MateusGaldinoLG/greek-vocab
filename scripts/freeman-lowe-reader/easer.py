import pandas as pd
import json
import requests
from beta_code import greek_to_beta_code as gtbc
from bs4 import BeautifulSoup
import re
import os

def retrieve_lemma(word):
    parsed_word = re.sub(r'[.,"·;\[\]]', '', word)
    parsed_word = re.sub(r'[\']', '', parsed_word) # solve this problem later
    url = f"https://anastrophe.uchicago.edu/morpho-api//wordwheel/{parsed_word}"
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:150.0) Gecko/20100101 Firefox/150.0"
    }
    response = requests.get(url, headers=headers)
    lemma = ""
    parsing = ""
    if(response.status_code == 200):
        res_json = json.loads(response.text)
        lemma = res_json['parses'][0]['lemma']
        lemma = re.sub(r'\d+', '', lemma)
        parsing = re.sub(r"\s<br>", ",", res_json['parses'][0]['parse'])
        parsing = re.sub(r"<br/>", "", parsing)
        parsing = re.sub("&#x2713", "", parsing)
        if ('No parse information found' in res_json['description']):
            lemma = "inconclusive"
            parsing = "inconclusive"    
    else:
        lemma = "inconclusive"
        parsing = "inconclusive"
    return lemma, parsing

def retrieve_definition(lemma):
    definition = ""
    url = f"https://anastrophe.uchicago.edu/logeion-api/detail?w={lemma}"
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:150.0) Gecko/20100101 Firefox/150.0"
    }
    response = requests.get(url, headers=headers)
    if(response.status_code == 200):
        data = re.sub(r'}\s*?{', '},{', response.text)
        result = json.loads('[' + data + ']')
        if result[0]['detail']['shortdef']:
            definition = result[0]['detail']['shortdef'][0]
        else:
            definition = "Inconclusive"
    return definition

cols = ["word","lemma","english_translation","parsing_abbreviation","beta_code","chapter_number","chapter_name","title"]
df = pd.DataFrame(columns=cols)


with open('text.json', 'r') as file:
    data = json.load(file)
    chapters = data['chapters']
    for chapter in chapters:
        chapter_number = chapter['chapter_number']
        chapter_title = chapter['chapter_title']
        texts = chapter['texts']
        for text_data in texts:
            df = pd.DataFrame(columns=cols)
            text_title = text_data['title']
            text_words = text_data['text']
            file_name = text_title.replace(" ", "_").lower().replace("\"", "")
            if os.path.isfile(f"{file_name}.csv"):
                continue
            if not text_words:
                continue
            print("Creating" + file_name)
            # print(text_words)
            for word in text_words.split(" "):
                lemma = ""
                definition = ""
                beta_code = gtbc(word)
                lemma, parsing = retrieve_lemma(word=word)
                if (lemma != "inconclusive"):
                    definition = retrieve_definition(lemma=lemma)
                else:
                    definition = "inconclusive"
                print([word,lemma,definition,parsing,beta_code,chapter_number,chapter_title,text_title])
                df.loc[len(df)] = [word,lemma,definition,parsing,beta_code,chapter_number,chapter_title,text_title]
            df.to_csv(f"{file_name}.csv")
