import requests
from datetime import datetime
import smtplib
import time

my_email = "creyes.citystyle@gmail.com"
app_password = "mhbukyxbqvfqjelm"

MY_LAT = 14.500572  # Your latitude
MY_LONG = 121.035483  # Your longitude


def is_iss_nearby():
    response = requests.get(url="http://api.open-notify.org/iss-now.json")
    response.raise_for_status()
    data = response.json()

    iss_latitude = float(data["iss_position"]["latitude"])
    iss_longitude = float(data["iss_position"]["longitude"])
    print(iss_latitude, iss_longitude)

    # Your position is within +5 or -5 degrees of the ISS position.
    if MY_LAT - 5 <= iss_latitude <= MY_LAT + 5 and MY_LONG - 5 <= iss_longitude <= MY_LONG + 5:
        return True
    else:
        return False


def is_night():
    parameters = {
        "lat": MY_LAT,
        "lng": MY_LONG,
        "formatted": 0,
        "tzid": "Asia/Manila",
    }

    response = requests.get("https://api.sunrise-sunset.org/json", params=parameters)
    response.raise_for_status()
    data = response.json()
    sunrise = int(data["results"]["sunrise"].split("T")[1].split(":")[0])
    sunset = int(data["results"]["sunset"].split("T")[1].split(":")[0])
    print(sunrise, sunset)

    time_now = datetime.now().hour
    print(time_now)

    if time_now >= sunrise and time_now <= sunrise:
        return True
    else:
        return False

while True:
    time.sleep(60)
    if is_night() and is_iss_nearby():
        with smtplib.SMTP("smtp.gmail.com") as connection:
            connection.starttls()
            connection.login(user=my_email, password=app_password)
            connection.sendmail(
                from_addr=my_email,
                to_addrs="jong.v.reyes@gmail.com",
                msg=f"Subject: ISS Nearby!! \n\nThe ISS is above you in the sky."
            )

