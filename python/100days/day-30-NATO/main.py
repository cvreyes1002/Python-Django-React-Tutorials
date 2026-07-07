import pandas

data = pandas.read_csv("nato_phonetic_alphabet.csv")

phonetic_dict = {row.letter: row.code for index, row in data.iterrows()}
print(phonetic_dict)

is_input_invalid = True

def input_name():
    word = input("Enter your name: ").upper()
    try:
        output_list = [phonetic_dict[letter] for letter in word]
    except KeyError:
        print("Sorry, only letters in the alphabet please.")
        input_name()
    else:
        print(output_list)

input_name()
