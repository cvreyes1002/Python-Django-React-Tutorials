from calendar import firstweekday

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

driver =webdriver.Chrome()

driver.get("https://secure-retreat-92358.herokuapp.com")
# print(driver.title)

# Finding by Name does not work on this site
# first_name = driver.find_element(By.NAME, "fname")
# first_name.send_keys("John")

first_name = driver.find_element(By.XPATH, "/html/body/form/input[1]")
first_name.send_keys("John")

last_name = driver.find_element(By.XPATH, "/html/body/form/input[2]")
last_name.send_keys("Smith")

email = driver.find_element(By.XPATH, "/html/body/form/input[3]")
email.send_keys("john.smith@gmail.com")

button = driver.find_element(By.CSS_SELECTOR, "form button")
button.click()

input("Press any key to continue. ")

driver.quit()
