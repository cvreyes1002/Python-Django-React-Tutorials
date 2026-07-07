#################################
# START - NOT Using Decorators
#################################

def log_behavior(func):
    def wrapper():
        print("Logging: The function is starting.")
        func()
        print("Logging: The function has finished.")
    return wrapper

def greet():
    print("Hello, World!")

# Manually wrapping the function
decorated_greet = log_behavior(greet)
decorated_greet()
#################################
# END - NOT Using Decorators
#################################


#################################
# START - Using Decorators
#################################
def log_behavior_decorator(func):
    def wrapper():
        print("Logging: The function is starting.")
        func()
        print("Logging: The function has finished.")
    return wrapper

@log_behavior_decorator
def greet_decorator():
    print("Hello, World!")

# Now calling the function automatically includes the logging
greet_decorator()
#################################
# END - Using Decorators
#################################
