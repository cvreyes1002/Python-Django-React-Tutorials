from bs4 import BeautifulSoup
import requests

response = requests.get("https://web.archive.org/web/20200518073855/https://www.empireonline.com/movies/features/best-movies-2/")
empire_web_page = response.text

soup = BeautifulSoup(empire_web_page, "html.parser")
# movie_titles = soup.find("div", class_="entity-info-items__list")
movie_titles = soup.find_all("h3", class_="title")

best_100_movies = []
for title in movie_titles:
    best_100_movies.append(title.getText())
    # print(title.getText())

movies_to_watch = best_100_movies[::-1]

with open("movies.txt", mode="w") as file:
    for movie in movies_to_watch:
        file.write(f"{movie}\n")