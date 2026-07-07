from bs4 import BeautifulSoup
import requests

response = requests.get("https://news.ycombinator.com/news")
yc_web_page = response.text

soup = BeautifulSoup(yc_web_page, "html.parser")
###################
# Find All
###################
article_texts = []
article_links = []

articles = soup.find_all("span", class_="titleline")
# print(title_lines)
for article in articles:
    # Remove all nested spans inside "titleline"
    for nested_span in article.find_all("span"):
        nested_span.decompose()

    for item in article:
        article_texts.append(item.getText())
        article_links.append(item.get("href"))

article_upvotes = [int(score.getText().split()[0]) for score in soup.find_all(name="span", class_="score")]

print(article_texts)
print(article_links)
print(article_upvotes)

highest_upvote = max(article_upvotes)
index = article_upvotes.index(highest_upvote)

print(highest_upvote)
print(index)

print(article_texts[index])
print(article_links[index])

##################################################
# START - Test to see if you can find one article
##################################################
# article_tag = soup.find(name="span", class_="titleline")
# article_tag = article_tag.find(name="a")
# print(article_tag)

# print(article_tag.getText())
# print(article_tag.get("href"))
#
# score_tag = soup.find(name="span", class_="score")
# print(score_tag.getText())
##################################################
# END - Test to see if you can find one article
##################################################


# with open("website.html", encoding="utf_8") as file:
#     contents = file.read()
#
# soup = BeautifulSoup(contents, "html.parser")
# # print(soup.title)
# # print(soup.title.string)
# # print(soup.prettify())
#
# all_anchor_tags = soup.find_all("a")
# # print(all_anchor_tags)
# # for tag in all_anchor_tags:
#     # print(tag)
#     # print(tag.getText())
#     # print(tag.get("href"))
#
# # heading = soup.find(name="h1", id="name")
# # print(heading)
#
# section_heading = soup.find(name="h3", class_="heading")
# print(section_heading)
# print(section_heading.getText())
# print(section_heading.name)
#
# company_url = soup.select_one(selector="p a")
# print(company_url)
#
# # Using id
# name = soup.select_one(selector="#name")
# print(name)
#
# # Using class
# headings = soup.select(".heading")
# print(headings)
