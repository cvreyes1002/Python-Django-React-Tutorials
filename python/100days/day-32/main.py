import smtplib
#
my_email = "creyes.citystyle@gmail.com"
app_password = "mhbukyxbqvfqjelm"
#
# with smtplib.SMTP("smtp.gmail.com") as connection:
#     connection.starttls()
#     connection.login(user=my_email, password=app_password)
#     connection.sendmail(
#         from_addr=my_email,
#         to_addrs="jong.v.reyes@gmail.com",
#         msg="Subject:This is a test\n\nTest from Python!"
#     )

import datetime as dt
import smtplib
import random

# quotes = []
# with open("quotes.txt", "r") as file:
#     for line in file:
#         quotes.append(line.strip())

now = dt.datetime.now()
day_of_week = now.weekday()
if day_of_week == 2:
    with open("quotes.txt", "r") as file:
        quotes = [line.strip() for line in file]
        random_quote= random.choice(quotes)

    with smtplib.SMTP("smtp.gmail.com") as connection:
        connection.starttls()
        connection.login(user=my_email, password=app_password)
        connection.sendmail(
            from_addr=my_email,
            to_addrs="jong.v.reyes@gmail.com",
            msg=f"Subject: Quote of the Day\n\n{random_quote}"
        )
