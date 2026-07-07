import turtle
import pandas
import csv

screen = turtle.Screen()
screen.title("US States Game")
image = "blank_states_img.gif"
screen.addshape(image)
turtle.shape(image)

# with open("50_states.csv") as csvfile:
#     csvreader = csv.reader(csvfile)
#     data_list = list(csvreader)
#
# print(data_list)

# state_x_y_coords = []

answer_state = turtle.textinput("Guess the State", "Input a state name.")


data = pandas.read_csv("50_states.csv")
print(type(data))
all_states = data.values.tolist()
# print(answer_state)
# print(all_states)

for state in all_states:
    if state[0] == answer_state:
        t = turtle.Turtle()
        t.hideturtle()
        t.penup()
        t.goto(state[1], state[2])
        t.write(state[0], font=("Arial", 7, "bold"))


turtle.exitonclick()
