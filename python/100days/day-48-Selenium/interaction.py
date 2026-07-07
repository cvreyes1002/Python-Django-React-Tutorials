from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
# from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

edge_options = Options()
driver = webdriver.Edge(options=edge_options)

driver.get("https://secure-retreat-92358.herokuapp.com")
# driver.get("https://en.wikipedia.org/wiki/Main_Page")
# print(driver.title)

# Find by id
# article_count = driver.find_element(By.ID, "articlecount")
# print(article_count)

# Find by css selector
# article_count = driver.find_elements(By.CSS_SELECTOR, "#articlecount a")
# data = [article.text for article in article_count]
# print(data[1])
# print(doc_link.text)
# print(doc_link.text)
#
# article_count = driver.find_element(By.CSS_SELECTOR, "#articlecount a")
# article_count.click()

# all_portals = driver.find_element(By.LINK_TEXT, "Content portals")
# all_portals.click()

# search = driver.find_element(By.NAME, "search")
# search.send_keys("Python")
# search.send_keys(Keys.ENTER)

# Find by name
# search_bar = driver.find_element(By.NAME, "q")
# print(search_bar.tag_name)
# print(search_bar.get_attribute("placeholder"))

first_name = driver.find_element(By.NAME, "fname")
# first_name.send_keys("John")
# last_name = driver.find_element(By.NAME, "lname")
# last_name.send_keys("Smith")
# email = driver.find_element(By.NAME, "email")
# email.send_keys("john.smith@gmail.com")
#
# button = driver.find_element(By.LINK_TEXT, "Sign Up")
# button.click()

input("Press any key to close the browser: ")

driver.quit()
