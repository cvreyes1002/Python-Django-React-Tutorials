from tkinter import *
from quiz_brain import QuizBrain

THEME_COLOR = "#375362"


class QuizInterface:
    def __init__(self, quiz_brain: QuizBrain):
        self.score = 0
        self.quiz = quiz_brain

        self.window = Tk()
        self.window.title("Quizzler")
        self.window.config(padx=20, pady=20, bg=THEME_COLOR)

        self.score_label = Label(text="Score: 0", bg=THEME_COLOR, fg="white", font=("Arial", 10, "bold"))
        self.score_label.grid(row=0, column=1)

        self.canvas = Canvas(width=300, height=250, bg="white")
        self.question_text = self.canvas.create_text(
            150,
            125,
            width=280,
            text="Text",
            font=("Arial", 20, "italic")
        )
        self.canvas.grid(row=1, column=0, columnspan=2, pady=50)
        # Buttons
        check_image = PhotoImage(file="./images/true.png")
        self.true_button = Button(image=check_image, highlightthickness=0, command=lambda: self.button_clicked(True))
        # self.true_button = Button(image=check_image, highlightthickness=0, command=self.clicked_true)
        self.true_button.grid(row=2, column=0)

        x_image = PhotoImage(file="./images/false.png")
        self.false_button = Button(image=x_image, highlightthickness=0, command=lambda: self.button_clicked(False))
        # self.false_button = Button(image=x_image, highlightthickness=0, command=self.clicked_false)
        self.false_button.grid(row=2, column=1)

        self.get_next_question()
        self.window.mainloop()

    def get_next_question(self):
        q_text = self.quiz.next_question()
        self.canvas.config(bg="white")
        self.canvas.itemconfig(self.question_text, text=q_text)

    def button_clicked(self, which_button: bool):
        if which_button:
            is_answer_correct = self.quiz.check_answer("true")
        else:
            is_answer_correct = self.quiz.check_answer("false")

        if is_answer_correct:
            self.canvas.config(bg="green")
            self.score += 1
            self.score_label.config(text=f"Score: {self.score}")
        else:
            self.canvas.config(bg="red")

        self.window.after(1000, self.still_has_questions)

    def still_has_questions(self):
        if self.quiz.still_has_questions():
            self.get_next_question()
        else:
            self.canvas.config(bg="white")
            self.canvas.itemconfig(self.question_text, text="You have reached the end of the quiz!")
            self.true_button.configure(state="disabled")
            self.false_button.configure(state="disabled")

    # def clicked_true(self):
    #     is_answer_correct = self.quiz.check_answer("True")
    #     if is_answer_correct:
    #         print("Answer is true, Update Score!")
    #         self.score += 1
    #         self.score_label.config(text=f"Score: {self.score}")
    #
    # def clicked_false(self):
    #     is_answer_correct = self.quiz.check_answer("False")
    #     print(is_answer_correct)
    #     if is_answer_correct:
    #         print("Answer is false, Update Score!")
    #         self.score += 1
    #         self.score_label.config(text=f"Score: {self.score}")
