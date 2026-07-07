import requests
from datetime import datetime as dt
from dateutil.relativedelta import relativedelta

STOCK = "TSLA"
COMPANY_NAME = "Tesla Inc"
API_KEY = "K75BHR0I413S3B3R"
NEWS_API_KEY = "f6eb8b8cace64c5d92bb737f5e2b5ff2"
ALPHA_ENDPOINT = "https://www.alphavantage.co/query"
NEWSAPI_ENDPOINT = "https://newsapi.org/v2/everything"

parameters = {
    "function": "TIME_SERIES_DAILY",
    "symbol": STOCK,
    "apikey": API_KEY,
}

# Get today's date
today = dt.today()

# Subtract 1 month
last_month = today - relativedelta(months=1)
formatted_date = last_month.strftime("%Y-%m-%d")
# print(formatted_date)

newsapi_params = {
    "q": COMPANY_NAME,
    "from": formatted_date,
    "sortBy": "publishedAt",
    "apiKey": NEWS_API_KEY,
}

# response = requests.get(ALPHA_ENDPOINT, params=parameters)
# response.raise_for_status()
#
# stock_data = response.json()

# stock_data = stock_data["Time Series (Daily)"]
# last_2_days_data = dict(list(stock_data.items())[:2])
# yesterday_stock = float(list(last_2_days_data.values())[0]['4. close'])
# other_day_stock = float(list(last_2_days_data.values())[1]['4. close'])

yesterday_stock = 428.3500
other_day_stock = 411.7900

# print(yesterday_stock)
# print(other_day_stock)

percentage_diff = int(abs(((yesterday_stock - other_day_stock) / other_day_stock) * 100))
print(percentage_diff)

news_response = requests.get(NEWSAPI_ENDPOINT, params=newsapi_params)
news_response.raise_for_status()
news_data = news_response.json()
first_3_articles = news_data["articles"][:3]
print(first_3_articles[0]["title"])
print(first_3_articles[0]["description"])

## STEP 1: Use https://www.alphavantage.co
# When STOCK price increase/decreases by 5% between yesterday and the day before yesterday then print("Get News").

## STEP 2: Use https://newsapi.org
# Instead of printing ("Get News"), actually get the first 3 news pieces for the COMPANY_NAME. 

## STEP 3: Use https://www.twilio.com
# Send a seperate message with the percentage change and each article's title and description to your phone number. 


# Optional: Format the SMS message like this:
"""
TSLA: 🔺2%
Headline: Were Hedge Funds Right About Piling Into Tesla Inc. (TSLA)?. 
Brief: We at Insider Monkey have gone over 821 13F filings that hedge funds and prominent investors are required to file by the SEC The 13F filings show the funds' and investors' portfolio positions as of March 31st, near the height of the coronavirus market crash.
or
"TSLA: 🔻5%
Headline: Were Hedge Funds Right About Piling Into Tesla Inc. (TSLA)?. 
Brief: We at Insider Monkey have gone over 821 13F filings that hedge funds and prominent investors are required to file by the SEC The 13F filings show the funds' and investors' portfolio positions as of March 31st, near the height of the coronavirus market crash.
"""
# https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=K75BHR0I413S3B3R
# https://newsapi.org/v2/everything?q="Tesla Inc"&from=2026-04-10&sortBy=publishedAt&apiKey=f6eb8b8cace64c5d92bb737f5e2b5ff2
