# import pandas as pd
# from datetime import datetime
# import random
# import smtplib
#
# my_email = "creyes.citystyle@gmail.com"
# app_password = "mhbukyxbqvfqjelm"
#
# # Step 1: Load the CSV file
# df = pd.read_csv("birthdays.csv")
#
# # Step 2: Get today's date
# today = datetime.now()
# today_month = today.month
# today_day = today.day
#
# # Step 3: Filter rows where month and day match today
# matches = df[(df["month"] == today_month) & (df["day"] == today_day)]
#
# # Step 4: Show results
# if not matches.empty:
#     for index, row in matches.iterrows():
#         # print(f"Send email to {row['name']} at {row['email']}")
#         number = random.randint(1, 3)
#         template_letter = f"./letter_templates/letter_{number}.txt"
#
#         # Read file
#         with open(template_letter, "r") as file:
#             content = file.read()
#
#         # Replace placeholder
#         personalized_message = content.replace("[NAME]", row["name"])
#         with smtplib.SMTP("smtp.gmail.com") as connection:
#             connection.starttls()
#             connection.login(user=my_email, password=app_password)
#             connection.sendmail(
#                 from_addr=my_email,
#                 to_addrs=row["email"],
#                 msg=personalized_message
#             )
# else:
#     print("No birthdays today.")

#####################
# Tutorial Solution
#####################
import smtplib
from datetime import datetime
import pandas
import random

my_email = "creyes.citystyle@gmail.com"
app_password = "mhbukyxbqvfqjelm"

today = datetime.now()
today_tuple = (today.month, today.day)

data = pandas.read_csv("birthdays.csv")
birthdays_dict = {(data_row["month"], data_row["day"]): data_row for (index, data_row) in data.iterrows()}
# print(birthdays_dict)

if today_tuple in birthdays_dict:
    birthday_person = birthdays_dict[today_tuple]
    file_path = f"letter_templates/letter_{random.randint(1, 3)}.txt"
    with open(file_path) as letter_file:
        contents = letter_file.read()
        contents = contents.replace("[NAME]", birthday_person["name"])

    with smtplib.SMTP("smtp.gmail.com") as connection:
        connection.starttls()
        connection.login(user=my_email, password=app_password)
        connection.sendmail(
            from_addr=my_email,
            to_addrs=birthday_person["email"],
            msg=f"Subject: Happy Birthday!\n\n{contents}"
        )

