import requests
from bs4 import BeautifulSoup
import pandas as pd



url = "https://www.perseus.tufts.edu/hopper/vocablist?works=Perseus%3Atext%3A1999.01.0167&sort=weighted_freq&filt=100&filt_custom=&output=table&lang=greek"

# df = pd.read_html(url)[2]

# print(df.columns)

response = requests.get(url)

if response.status_code == 200:
    # Get the HTML content as a string
    html_content = response.text

    soup = BeautifulSoup(response.text, 'html.parser')

    # 3. Extract data
    table = soup.find('table', {"id": "vocab_list"})
    title = soup.find('span', {"class": "title"}).text
    
    headers = [header.text.strip() for header in table.find_all('tr')[1].find_all('th')]

    rows = []
    for row in table.find_all('tr')[1:]:
        cells = row.find_all('td')
        if cells:
            row_data = {headers[i]: cells[i].text.strip() for i in range(len(cells))}
            rows.append(row_data)
    print(rows[0])

    df = pd.DataFrame(rows, columns=headers)
    print(df.head())
    df.to_csv(f'{title}_weighted_frequency.csv', index=False)
else:
    print(f"Failed to retrieve content. Status code: {response.status_code}")