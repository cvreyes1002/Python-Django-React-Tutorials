from turtle import Screen
from paddle import Paddle
from ball import Ball
from scoreboard import Scoreboard
import time

screen = Screen()
screen.bgcolor("black")
screen.setup(width=800, height=600)
screen.title("Pong")
screen.tracer(0)

r_paddle = Paddle((350, 0))
l_paddle = Paddle((-350, 0))
ball = Ball()
scoreboard = Scoreboard()

screen.listen()
screen.onkey(r_paddle.go_up, "Up")
screen.onkey(r_paddle.go_down, "Down")
screen.onkey(l_paddle.go_up, "w")
screen.onkey(l_paddle.go_down, "s")

game_is_on = True
while game_is_on:
    time.sleep(ball.ball_speed)
    screen.update()
    ball.move()

    # Detect collision with wall
    if ball.ball.ycor() > 280 or ball.ball.ycor() < -280:
        ball.bounce_y()

    # Detect collision with right paddle
    if ball.ball.distance(r_paddle.paddle) < 50 and ball.ball.xcor() > 320 or ball.ball.distance(
            l_paddle.paddle) < 50 and ball.ball.xcor() < -320:
        ball.bounce_x()

    # Detect R paddle misses
    if ball.ball.xcor() > 380:
        ball.reset_position()
        scoreboard.l_point()

    # Detect L paddle misses
    if ball.ball.xcor() < -380:
        ball.reset_position()
        scoreboard.r_point()


screen.exitonclick()
