numbers = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

#New list of squared numbers
squared_numbers = [number ** 2 for number in numbers]
print(squared_numbers)

#Create a new list which contain ever numbers only
even_numbers = [number for number in numbers if number % 2 == 0]
print(even_numbers)
