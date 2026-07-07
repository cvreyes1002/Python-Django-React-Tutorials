from turtledemo.chaos import jumpto

from pandas.core.internals.construction import dataclasses_to_dicts

student_dict = {
    "student": ["Angela", "James", "Lily"], 
    "score": [56, 76, 98]
}

#Looping through dictionaries:
for (key, value) in student_dict.items():
    #Access key and value
    pass

import pandas
student_data_frame = pandas.DataFrame(student_dict)

#Loop through rows of a data frame
for (index, row) in student_data_frame.iterrows():
    #Access index and row
    #Access row.student or row.score
    pass

# Keyword Method with iterrows()
# {new_key:new_value for (index, row) in df.iterrows()}

#TODO 1. Create a dictionary in this format:
# {"A": "Alfa", "B": "Bravo"}
data = pandas.read_csv("nato_phonetic_alphabet.csv")
# phonetic_dict = {}
# for (index, row) in data.iterrows():
#     phonetic_dict.update({row.letter: row.code})

phonetic_dict = {row.letter: row.code for index, row in data.iterrows()}
print(phonetic_dict)

# for key, value in data_dict.items():
#     print(key, value)

#TODO 2. Create a list of the phonetic code words from a word that the user inputs.
name = input("Enter your name: ").upper()
output_list = [phonetic_dict[letter] for letter in name]
print(output_list)

# name_phonetic_dict = {key:value for (key, value) in data_dict.items() if key in name_char_list}
# print(name_phonetic_dict)

# name_list = [letter for letter in name if letter not in data_dict]
# print(name_list)
