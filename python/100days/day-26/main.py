import random
import pandas

# List Comprehension
numbers = [1, 2, 3]
new_list = []
for n in numbers:
    add_1 = n + 1
    new_list.append(add_1)
print(new_list)

# new_list = [new_item for item in list]
numbers_list = [1, 2, 3]
new_list2 = [n + 1 for n in numbers_list]
print(new_list2)

name = "John"
letters_list = [letter for letter in name]
print(letters_list)

#range
range_list = [x * 2 for x in range(1, 5)]
print(range_list)

names = ["Alex", "John", "Caroline", "Dave", "Eleanor", "Freddie"]
short_names = [name for name in names if len(name) < 5]
long_names = [name.upper() for name in names if len(name) > 4]
print(short_names)
print(long_names)

with open("file1.txt") as file:
    file1 = file.read().splitlines()
    print(file1)

with open("file2.txt") as file:
    file2 = file.read().splitlines()
    print(file2)

# Find common items in file1 and file2 and put result in a new list using list comprehension
result = [int(num) for num in file1 if num in file2]
print(result)

#####################################
# Dictionary Comprehension
# new_dict = {new_key:new_value for (key, value) in dict.items()}
#
# Conditional Dictionary Comprehension
# new_dict = {new_key:new_value for (key, value) in dict.items() if test}
#####################################
students_scores = {student:random.randint(0, 100) for student in names}
print(students_scores)

passed_students = {student:score for student, score in students_scores.items() if score >= 75}
print(passed_students)

sentence = "What is the Airspeed Velocity of an Unladen Swallow?"
sentence_result = {word:len(word) for word in sentence.split()}
print(sentence_result)

weather_c = {
    "Monday": 12,
    "Tuesday": 14,
    "Wednesday": 15,
    "Thursday": 16,
    "Friday": 17,
    "Saturday": 18,
    "Sunday": 19
}
weather_f = {day:temp_c * 9/5 + 32 for day, temp_c in weather_c.items()}
print(weather_f)

#######################################
# Looping over panda frames
#######################################

student_dict = {
    "student": ["John", "James", "Jason"],
    "score": [99, 98, 97]
}

# for (key, value) in student_dict.items():
#     print(key, value)

student_data_frame = pandas.DataFrame(student_dict)
# print(student_data_frame)

# for (key, value) in student_data_frame.items():
#     print(key)
#     print(value)

# Loop through rows of a data frame
for (index, row) in student_data_frame.iterrows():
    # print(index)
    # print(row)
    # print(row.student)
    # print(row.score)

    if row.student == "John":
        print(f"{row.student} {row.score}")
