import pandas as pd

df = pd.read_csv('NT_Greek_Master.csv')

df_counts = df.groupby('strongs_number').size().reset_index(name='count').sort_values(by='count', ascending=False)

most_used = df.set_index('strongs_number').join(df_counts.set_index('strongs_number')).reset_index().sort_values(by='count', ascending=False)


df_unique = pd.read_csv('NT_Greek_Master_Unique.csv')
most_used_unique = df_unique.set_index('strongs_number').join(df_counts.set_index('strongs_number')).reset_index().sort_values(by='count', ascending=False)

print(most_used_unique.head())
df_nouns = most_used_unique.loc[most_used_unique['parsing_abbreviation'].str.contains('N-N')]

print(df_nouns.head())

# verbs are not well behaved
df_allverbs = most_used.loc[most_used['parsing_abbreviation'].str.contains('V-')]
df_verbs_first_person = most_used.loc[most_used['parsing_abbreviation'].str.contains(r'V*1S', regex=True)]
df_adjectives = most_used_unique.loc[most_used_unique['parsing_abbreviation'].str.contains('Adj-')]
df_conjunction = most_used_unique.loc[most_used_unique['parsing_abbreviation'].str.contains('Conj')]
