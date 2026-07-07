from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
# from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

edge_options = Options()
# chrome_options = Options()
driver = webdriver.Edge(options=edge_options)
# driver = webdriver.Chrome(options=chrome_options)

# driver.get("https://www.amazon.com/Instant-Pot-Multi-Use-Programmable-Pressure/dp/B00FLYWNYQ/ref=sr_1_1?crid=TAJN9Q7FEJIX&dib=eyJ2IjoiMSJ9.5s_5RS4qKJMOxc04dnxdoss-L7XfL35kgkFImE1NyQOXlEPSuClbuMBdvXdjqK3KmCdTKG5iaBPZaBdH3IIckC4HbL0BQBZwJTmiTSPn5tl4qqHb3PEE5Kx__bgN1Vf-e04A4C2jKTu6DpM_Bgn8MF6taZdIGZJCWoov1xx91W-YJbOA_lzzoD29qxuQpqN6JR9NqQlbtM1rsOiAnO8x1XnSwaKtFIOTpP1hkKivaO8._qF7EWtYfWpLA97BdGVS7XFbXQ5rBVavBePRhjctNDg&dib_tag=se&keywords=instant%2Bpot&qid=1778570175&sprefix=instant%2Bpot%2Caps%2C810&sr=8-1&th=1")
# price = driver.find_element(By.CLASS_NAME, "a-price-whole")
# print(price.text)

driver.get("https://www.python.org")
print(driver.title)

# Find by name
# search_bar = driver.find_element(By.NAME, "q")
# print(search_bar.tag_name)
# print(search_bar.get_attribute("placeholder"))

# Find by id
# navigation = driver.find_element(By.ID, "mainnav")
# print(navigation.text)

#Find by class
# logo = driver.find_element(By.CLASS_NAME, "python-logo")
# print(logo.size)

#Find by css selector
# doc_link = driver.find_element(By.CSS_SELECTOR, ".documentation-widget a")
# print(doc_link.text)

#Find by XPATH
# bug_link = driver.find_element(By.XPATH, '//*[@id="site-map"]/div[2]/div/ul/li[3]/a')
# print(bug_link.text)

driver.quit()
