import random
import pandas as pd

def retrieve_verb():
    verbs = pd.read_csv('gold_standard_verbs.csv', header=None, names=["OCR_agree", "verb", "lemma", "POS", "machine_parsers"])
    # print(len(verbs))
    # print(verbs['lemma'])
    # print(verbs['lemma'].unique())
    unique_lemmas = verbs['lemma'].unique()
    num_verbs = len(unique_lemmas)
    verb = unique_lemmas[random.randint(0, num_verbs - 1)]
    return verb


moods = ['indicative', 'imperative', 'subjunctive', 'optative']
voices = ['active', 'passive', 'middle']
tenses = ['present', 'future', 'perfect', 'imperfect', 'aorist', 'plu-perfect']


current_mood = moods[random.randint(0, len(moods) - 1)]
current_voice = voices[random.randint(0, len(voices) - 1)]
current_tense = tenses[random.randint(0, len(tenses) - 1)]
current_verb = retrieve_verb()
print(f"Conjugate the verb {current_verb} using the {current_tense} tense in the {current_mood} mood and the {current_voice} voice. After that, write its infinitive and participle")