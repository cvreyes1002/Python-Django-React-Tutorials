import time

current_time = time.time()
# print(current_time)


def speed_calc_decorator(func):
    def wrapper():
        start_time = time.time()
        func()
        end_time = time.time()
        run_time = end_time - start_time
        print(run_time)

    return wrapper


@speed_calc_decorator
def fast_function():
    for i in range(10000000):
        i * i


@speed_calc_decorator
def slow_function():
    for i in range(100000000):
        i * i


fast_function()
slow_function()

# def log_behavior_decorator(func):
#     def wrapper():
#         print("Logging: The function is starting.")
#         func()
#         print("Logging: The function has finished.")
#     return wrapper
#
# @log_behavior_decorator
# def greet_decorator():
#     print("Hello, World!")
#
# # Now calling the function automatically includes the logging
# greet_decorator()
