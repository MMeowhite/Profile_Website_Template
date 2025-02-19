# Introduction to Python and MNIST dataset

In todays lecture, we will study the Python and MNIST dataset used in deep learning.

> "The question is not, 'Can machines think?' but 'Can machines do what we (as thinking beings) can do?'" <br/><span style="display: block; text-align: right; font-weight: bold;">- <strong>Alan Turing</strong></span>

## 0 Python Learning Path
Python is a versatile, high-level programming language known for its simplicity and readability. It is widely used in various fields like web development, data analysis, machine learning, automation, and more. Python's syntax is clear and easy to understand, making it a great choice for beginners and experienced developers alike.
Key Features of Python:
- **Simple and Readable Syntax**: Python code is easy to read and write, using indentation to define code blocks.
- **Interpreted Language**: Python is an interpreted language, meaning code is executed line by line, which makes debugging easier.
- **Cross-Platform**: Python is platform-independent, which means you can write Python programs that run on Windows, macOS, and Linux without modification.
- **Extensive Libraries**: Python has a large standard library and a vibrant ecosystem of third-party libraries, which makes it easy to extend its functionality.
- **Community Support**: Python has a large and active community, making it easy to find resources, tutorials, and support.

Before this lecture, Python learning path is outlined:

### 0.1 First Step to Python
   - **Objective**: Learn basic syntax, variables, data types, and simple operations.
   - **Resources**:
     - [Official Python Tutorial](https://docs.python.org/3/tutorial/)
     - Python documentation
   - **Topics**:
     - Installing Python
     - Running Python code
     - Variables and data types (int, float, str, list, tuple, dict, set)
     - Basic Input/Output
     - Comments
     - Operators (Arithmetic, Comparison, Logical)

### 0.2 Control Flow
   - **Objective**: Understand how to use conditional statements and loops.
   - **Topics**:
     - `if`, `else`, `elif` statements
     - `for` and `while` loops
     - `break`, `continue`, and `pass`
     - List comprehensions

### 0.3 Functions and Modules
   - **Objective**: Learn how to organize code into reusable pieces using functions and modules.
   - **Topics**:
     - Defining functions with `def`
     - Function arguments and return values
     - Variable scope (global vs local)
     - Importing and using modules
     - Built-in Python modules (e.g., `math`, `datetime`)

### 0.4 Data Structures
   - **Objective**: Learn about Python's built-in data structures and how to use them efficiently.
   - **Topics**:
     - Lists and list operations
     - Tuples and tuple operations
     - Dictionaries and dictionary operations
     - Sets and set operations
     - String manipulation

### 0.5 File Handling
   - **Objective**: Learn how to read from and write to files in Python.
   - **Topics**:
     - Opening files (`open()`)
     - Reading files (`read()`, `readlines()`)
     - Writing to files (`write()`, `writelines()`)
     - Working with file paths (`os.path`)
     - Using context managers (`with`)

### 0.6 Object-Oriented Programming (OOP)
   - **Objective**: Learn the basics of object-oriented programming in Python.
   - **Topics**:
     - Classes and objects
     - Attributes and methods
     - `self` keyword
     - Constructors (`__init__`)
     - Inheritance
     - Polymorphism
     - Encapsulation
     - Method Overriding

### 0.7 Error Handling
   - **Objective**: Learn how to handle errors and exceptions in Python.
   - **Topics**:
     - `try`, `except`, `else`, and `finally`
     - Custom exceptions
     - Assertions
     - Common Python exceptions (e.g., `IndexError`, `TypeError`)

### 0.8 Working with Libraries and Frameworks
   - **Objective**: Learn how to work with popular Python libraries for different tasks.
   - **Libraries**:
     - **NumPy**: Numerical operations
     - **Pandas**: Data analysis
     - **Matplotlib**: Data visualization
     - **Flask/Django**: Web development
     - **Requests**: HTTP requests
     - **BeautifulSoup**: Web scraping

### 0.9 Testing and Debugging
   - **Objective**: Learn the essentials of testing and debugging in Python.
   - **Topics**:
     - Using `print()` for debugging
     - The `pdb` module (Python Debugger)
     - Unit testing with `unittest`
     - Assertions in tests
     - Test-Driven Development (TDD)

### 0.10 Working with APIs
   - **Objective**: Learn how to interact with APIs using Python.
   - **Topics**:
     - Making HTTP requests with `requests`
     - Working with JSON data
     - Authentication with APIs
     - API error handling

### 0.11 Advanced Topics (Optional)
   - **Objective**: Delve into more advanced concepts in Python programming.
   - **Topics**:
     - Generators and Iterators
     - Decorators
     - Context Managers
     - Multithreading and Multiprocessing
     - Asynchronous programming (using `asyncio`)

### 0.12 Projects
   - **Objective**: Apply what you've learned by working on small projects.
   - **Suggestions**:
     - **Simple calculator**: A basic calculator using functions and OOP.
     - **To-Do list**: Implement a command-line or GUI-based to-do list app.
     - **Weather app**: Build an app that fetches weather data from an API.
     - **Web scraper**: Create a simple script that scrapes data from a website.
     - **Personal website**: Build a simple portfolio website using Flask or Django.

### 0.13 Further Resources
   - **Books**:
     - "Automate the Boring Stuff with Python" by Al Sweigart
     - "Python Crash Course" by Eric Matthes
   - **Websites**:
     - [Python.org Documentation](https://docs.python.org/3/)
     - [Real Python](https://realpython.com/)
     - [LeetCode](https://leetcode.com/) (For practice)
   - **Videos**:
     - Youtube: [Corey Schafer's YouTube Channel](https://www.youtube.com/c/Coreyms)
     - Bilibili: [ByteDance channel](https://www.bilibili.com/video/BV1rpWjevEip/?spm_id_from=333.337.search-card.all.click)
   - **Github Projects**
     - [Python Tutorials](https://github.com/walter201230/Python)
     - [Project-based-learning](https://github.com/practical-tutorials/project-based-learning?tab=readme-ov-file#python)
     - [Python-100-Days](https://github.com/jackfrued/Python-100-Days)

### 0.14 Practice
   - **Objective**: Practice coding regularly to enhance problem-solving skills.
   - **Suggestions**:
     - Participate in coding challenges on websites like HackerRank, CodeWars, or LeetCode.
     - Try to contribute to open-source projects.
     - Review code from other programmers and try to understand their solutions.



## 1 Introduction to Python

Firstly, I will introduce the following part of Python: Assignment Statement, Variable and Data type, Control Flow Statement, Function.

### 1.1 Assignmnet Statement

In Computer Science, equal sign is soul! The left and right part of the equal sign is called variable and value just like this `varible = value`. Variables are used to store data values. For example The statement `a = 1` and ` = true` represents `a,1`and `b,true` are varibles and values, respectively. The variable could be named by letter , number 0-9, special sign @#$%^&* *ect* and their abtrary combiations. But They follow certain rules and conventions that ensure they are named and accessed correctly. Below are the key rules for defining and using variables in Python.

- **Start with a letter or an underscore**:  <br/>
  A variable name must begin with a letter (a-z, A-Z) or an underscore (`_`).
  - Valid: `my_variable`, `_variable`
  - Invalid: `1variable` (<u>cannot start with a number</u>)
- **Followed by letters, numbers, or underscores**: <br/>
  After the first letter, the variable name can include numbers (0-9), letters (a-z, A-Z), and underscores (`_`).
  - Valid: `my_variable2`, `variable_123`
  - Invalid: `my-variable` (hyphens are not allowed)
- **Case-sensitive**: <br/>
  Python is case-sensitive, meaning that `Variable`, `variable`, and `VARIABLE` are considered different variables.
  - `myVariable` and `myvariable` are two distinct variables.
- **No reserved keywords**: <br/>
  A variable name cannot be a Python reserved keyword, such as `if`, `for`, `else`, `True`, `None`, `class`, `import`, etc.
  - Invalid: `if`, `else`, `while`, `try`, etc.

In Python, variables are dynamically typed, meaning you do not need to declare their type explicitly. You can directly assign a value to a variable using the assignment operator `=`.

```python
x = 10         # integer
name = "John"  # string
is_active = True # boolean

print(f"x={x}")
print(f"Type of x is {type(x)}")

print("\n------------------------------------------\n")

print(f"name={name}")
print(f"Type of name is {type(name)}")

print("\n------------------------------------------\n")

print(f"is_active={is_active}")
print(f"Type of is_active is {type(is_active)}")
```

Otherwise, Python allows multiple variables to be assigned in a single line, separated by commas.

```python
x, y, z = 5, 3.14, "Hello" # multiple assignments, x is assigned 5, y is assigned 3.14 and z is assigned hello
print(f"x={x}, y={y}, z={z}")
```

### 1.2 Variable and Data type

Python is a weak language type in contrast to C,C++,Java. It means you do not define data type exactly when you want to creat a new data. But we still know the variable and data type in python, it will be benefit when you start learning `PyTorch` or `Tensorflow` library. In this part, I list some common variable and data type in the following context:

  - Numeric Types:
    - **int**: Integer (whole numbers) <br/>
      Example: `x = 5`
    - **float**: Floating-point number (decimal numbers) <br/> Example: `y = 3.14`
    - **complex**: Complex numbers <br/>
      Example: `z = 1 + 2j`
  - Sequence Types:
    - **list**: Ordered, mutable collection <br/>
      Example: `my_list = [1, 2, 3]`
    - **tuple**: Ordered, immutable collection <br/>
      Example: `my_tuple = (1, 2, 3)`
    - **range**: Immutable sequence of numbers, used for loops<br/>
      Example: `my_range = range(5)`
  - Text Type:
    - **string**: String (a sequence of characters) <br/>
      Example: `name = "John"`
  - Mapping Type:
    - **dict**: Dictionary (unordered collection of key-value pairs) <br/>
      Example: `my_dict = {'name': 'John', 'age': 30}`
  - Set Types:
    - **set**: Unordered collection of unique elements <br/>
      Example: `my_set = {1, 2, 3}`
    - **frozenset**: Immutable set <br/>
      Example: `my_frozenset = frozenset([1, 2, 3])`
  - Boolean Type:
      - **bool**: Boolean value, either True or False <br/>
      Example: `is_valid = True`
  - Binary Types:
      - **bytes**: Immutable sequence of bytes <br/>
      Example: `b = b"hello" (01101000 01100101 01101100 01101100 01101111)`
      - **bytearray**: Mutable sequence of bytes <br/>
      Example: `ba = bytearray([65, 66, 67])`
      - **memoryview**: View of memory in byte format <br/>
      Example: `m = memoryview(b"hello")`

You should konw your data type of variable in your code in any place to avoid type error.

Meanwhile, Python is dynamically typed, meaning the type of a variable can change during runtime. You can reassign a variable to a different type at any time.

Here, I define some common type used in Python:

```python
a = 10       # a is an integer
print(f"a={a}")
print(f"The type of a is {type(a)}")

b = "Hello"  # b is a string
print(f"b={b}")
print(f"The type of b is {type(b)}")

c = True # c is a boolean, you should be careful about the first letter of boolean value must be uppercase
print(f"c={c}")
print(f"The type of c is {type(c)}")
```

List can include different data type and mutable value:

```python
d = [1,2,3]
print(f"d={d}")
print(f"The type of d is {type(d)}")


e = [1, "Hello", True]
print(f"e={e}")
print(f"The type of e is {type(e)}")

f = [2, 2]
print(f"f={f}")
print(f"The type of f is {type(f)}")
f[0] = 1
print(f"After change, f={f}")
print(f"Afther change, the type of f is {type(f)}")
```

For tuple, you must be keep in attention that the element of tuple is immutable:

```python
g = (1, 2, 3)
print(f"g={g}")
print(f"The type of g is {type(g)}")

h = (1, "Hello", True)
print(f"h={h}")
print(f"The type of h is {type(h)}")

i = (2, 2)
print(f"i={i}")
print(f"The type of i is {type(i)}")
# i[0] = 1
# print(f"After change, i={i}")
# print(f"Afther change, the type of i is {type(i)}")
```

For dictionnary, it is the most powerful data type in contrast to other language. Each item in dictionary is presented as `key=value`.

```python
person = {
    "name" : "MMeowhite",
    "age" : 24,
    "animals": ["cat", "dog", "dragon"],
    "location": {
        "site": "West China Campus of Sichuan university",
        "email": "miaopeng@stu.scu.edu.cn",
        "code": 610065
    }
}

print(f"person={person}")
print(f"The type of person is {type(person)}")
```

And you can use these methods to return value:

- Access values directly through the dictionary keys (e.g., object["key"]).

- Use the `get()` method to safely retrieve values and avoid a KeyError.

- Use `values()` to get all values, or iterate through key-value pairs using `items()`.

```python
# Access values directly through the dictionary keys
name = person["name"]
print(f"The name of the person: {name}")
# age = person["aeg"]
# print(f"the name of the person: {person["name"]}") # error: f-string: unmatched '['

print("\n------------------------------------\n")

# Use the get() method to safely retrieve values and avoid a KeyError
animals = person.get("animals")
print(f"The animals of the person: {animals}")
animal = person.get("animal")
print(f"The animal of the person: {animal}") # if the value is not exists, it return None to avoid KeyError
animal = person.get("animal", "Unknown")
print(f"The animal of the person: {animal}") # Meanwhile, you can declare a default value when the value is not exists

print("\n------------------------------------\n")

# Use the values() method to retrieve all value stored in dictionary
values = person.values()
print(f"The values of the person: {values}")

print("\n------------------------------------\n")

# Use the item() method to retrieve all keys and values
for key, value in person.items():
    print(f"Key: {key}, Value: {value}")
```

### 1.3 Control Flow Statement

Control flow statements are used to decide the execution path of a program, including conditional statements, loops, and branching structures. Python provides several control flow statements to implement different program logic.

#### 1.3.1. If-Else Statement

The `if` statement is used to execute code based on a condition.

```python
age = 18

if age >= 18:
    print("You are an adult.")
else:
    print("You are a minor.")
```



#### 1.3.2 If-Elif-Else Statement

The `elif` (else if) statement checks multiple conditions in sequence.

```python
# Example of if-elif-else statement
age = 20

if age < 13:
    print("You are a child.")
elif age < 18:
    print("You are a teenager.")
else:
    print("You are an adult.")
```



#### 1.3.3 For loop

The `for` loop iterates over a sequence (like a list, tuple, or range).

```python
# Example of a for loop
for i in range(5):  # Iterates from 0 to 4
    print(i)
```



#### 1.3.4. While Loop

The `while` loop repeatedly executes a block of code as long as a condition is `True`.

```python
# Example of while loop
count = 0

while count < 5:
    print(count, end=",")
    count += 1  # Increment to avoid infinite loop
```



#### 1.3.5. Break Statement

The `break` statement is used to exit a loop prematurely when a condition is met.

```python
# Example of break statement
for i in range(10):
    if i == 5:
        break  # Exit the loop when i equals 5
    print(i)
```



#### 1.3.6. Continue Statement

The `continue` statement skips the current iteration of a loop and proceeds to the next iteration.

```python
# Example of continue statement
for i in range(5):
    if i == 3:
        continue  # Skip the iteration when i equals 3
    print(i, end="\t")
```



#### 1.3.7. Pass Statement

The pass statement is a placeholder that does nothing. It’s often used when a statement is required syntactically but no action is needed.

```python
# Example of pass statement
for i in range(5):
    if i == 3:
        pass  # Do nothing when i equals 3
    print(i, end="\n")
```



#### 1.3.8. Complex Statement

We can combine these condition keywords to implement complex statement.

```python
# Full Example
age = 25
for i in range(3): 
    if age < 18:
        print("You are a minor.")
        break
    elif age == 25:
        print(f"You are {age} years old, an adult.")
        continue
    else:
        print("You are older than 18.")
    pass
```



#### 1.3.9. Summary

- `if`, `elif`, `else`: Used for decision-making.
- `for` loop: Used for iterating over sequences.
- `while` loop: Used for looping as long as a condition is True.
- `break`: Exits the loop.
- `continue`: Skips to the next iteration of the loop.
- `pass`: Does nothing, used as a placeholder.

### 1.4 Function

This guide will walk you through the basics of writing and using functions in Python. Functions allow you to group code into reusable blocks, making your program more modular and easier to maintain.


#### 1.4.1. What is function in python?

A **function** in Python is a block of code that only runs when it is called. You can pass data (known as **parameters**) into a function, and it can return data as well.

How can we define a function in python? In Python, you define a function using the `def` keyword, followed by the function name, parentheses, and a colon. The body of the function starts on the next line, indented.

```python
# python function syntax
def function_name(parameters):
    # Function body
    # Code to execute
    return result  # Optional return value
```

For instance, We define a `greet()` function to print message.

```python
def greet():
    print("Hello, welcome to Python functions!") # In this example, the function greet will print a welcome message when called.
```



#### 1.4.2. How to calling a function?

Once a function is defined, you can call it by using its name followed by parentheses.

```python
greet() # Calling the function to print the message
```



#### 1.4.3. How can we define and use a python function with parameters?

A function can accept parameters (inputs) that allow you to pass data into the function for processing. Parameters are placed inside the parentheses.
```python
def function_name(parameter1, parameter2):
    # Code to execute
    # value to return
    return value
```

For example, I define a function `sum()` to return the sum of two parameter `a` and `b`

```python
def sum(a, b):
    result = a + b
    return result
a = 1
b = 2
c = sum(a, b)
print(f"The sum of the a and b is {c}") # the output will be sum of a and b
```

Notes: if you haven't any code to execute and any value to return, you should use built-in keywords pass to avoid compile syntax error.

```python
def null_function(a, b):
    pass

null_function(a, b)
```



#### 1.4.4. How can we define a python function with default parameters?

You can assign default values to parameters. If the caller does not provide a value for that parameter, the default value is used.

```python
# define a function to print input name
# if we do not input name into the function, it will return the defautl name: Guest.
def greet(name="Guest"):
    print(f"Hello, {name}!")

greet("Alice")  # Output: Hello, Alice!
greet()         # Output: Hello, Guest!
```



#### 1.4.5. The local variables and global variables

When you write your own code, you also should be careful about the variable scope. The varibale scope could be divided into two types: **Local Variables** and **Global Variables **.

- **Local Variables**: Variables declared inside a function are local to that function and cannot be accessed outside of it.

- **Global Variables**: Variables declared outside of a function are global and can be accessed from anywhere in the code.

```python
x = 10  # Global variable

def my_function():
    y = 5  # Local variable
    print(x + y)

my_function()  # Output: 15
print(x) # This will be output 10 correctly because x is local to the entire code
# print(y)  # This will raise an error because y is local to the function
```



#### 1.4.6. Advance: lambda expression (Optional)

Python also allows you to define **anonymous functions** using the **lambda** keyword. These functions are typically used for short-term, one-line operations.

```python
lambda parameters: expression
```

For example, if we want to return the square of any number, we can use lambda expression.

```python
square = lambda x: x ** 2
print(square(4))  # Output: 16
```



#### 1.4.7. Summary
In summary, functions are a fundamental part of Python programming. They allow you to:
- Group code into reusable blocks
- Accept inputs via parameters
- Return values with the return keyword
- Use default values and handle variable scope

### 1.5 Recommandation

In the last, I recommand you to read this documents Thoroughly [ **Python Numpy Tutorial(with Jupyter and Colab): https://cs231n.github.io/python-numpy-tutorial/**  ] completed by *CS231n* course teacher group in *Compuer Science Deparment of Standford University*. In this Python guideline, <u>it introduces python basis and most popular third-party library except Pandas</u>. You can click it to jump into any part in this tutorials if you have unfamilar section quickly.
- [Jupyter and Colab Notebooks](https://cs231n.github.io/python-numpy-tutorial/#jupyter-and-colab-notebooks)
- [Python](https://cs231n.github.io/python-numpy-tutorial/#python)
  - [Python versions](https://cs231n.github.io/python-numpy-tutorial/#python-versions)
  - [Basic data types](https://cs231n.github.io/python-numpy-tutorial/#basic-data-types)
  - [Containers](https://cs231n.github.io/python-numpy-tutorial/#containers)
    - [Lists](https://cs231n.github.io/python-numpy-tutorial/#lists)
    - [Dictionaries](https://cs231n.github.io/python-numpy-tutorial/#dictionaries)
    - [Sets](https://cs231n.github.io/python-numpy-tutorial/#sets)
    - [Tuples](https://cs231n.github.io/python-numpy-tutorial/#tuples)
  - [Functions](https://cs231n.github.io/python-numpy-tutorial/#functions)
  - [Classes](https://cs231n.github.io/python-numpy-tutorial/#classes)
- [Numpy](https://cs231n.github.io/python-numpy-tutorial/#numpy)
  - [Arrays](https://cs231n.github.io/python-numpy-tutorial/#arrays)
  - [Array indexing](https://cs231n.github.io/python-numpy-tutorial/#array-indexing)
  - [Datatypes](https://cs231n.github.io/python-numpy-tutorial/#datatypes)
  - [Array math](https://cs231n.github.io/python-numpy-tutorial/#array-math)
  - [Broadcasting](https://cs231n.github.io/python-numpy-tutorial/#broadcasting)
  - [Numpy Documentation](https://cs231n.github.io/python-numpy-tutorial/#numpy-documentation)
- [SciPy](https://cs231n.github.io/python-numpy-tutorial/#scipy)
  - [Image operations](https://cs231n.github.io/python-numpy-tutorial/#image-operations)
  - [MATLAB files](https://cs231n.github.io/python-numpy-tutorial/#matlab-files)
  - [Distance between points](https://cs231n.github.io/python-numpy-tutorial/#distance-between-points)
- [Matplotlib](https://cs231n.github.io/python-numpy-tutorial/#matplotlib)
  - [Plotting](https://cs231n.github.io/python-numpy-tutorial/#plotting)
  - [Subplots](https://cs231n.github.io/python-numpy-tutorial/#subplots)
  - [Images](https://cs231n.github.io/python-numpy-tutorial/#images)

## 2.Introduction to the MNIST Dataset

The MNIST (Modified National Institute of Standards and Technology) dataset is a popular dataset in machine learning and computer vision. It consists of **60,000 training images** and **10,000 testing images** of handwritten digits (0 through 9), each image being a **28x28 pixel grayscale image**.

### 2.1 Key Points about MNIST:

- **Purpose**: The dataset is used to train and evaluate machine learning models for digit classification.
- **Images**: Each image represents a single digit, written by a variety of people, with variations in style, thickness, and slant.
- **Format**: The dataset is provided in two parts:
  1. **Training set**: 60,000 labeled images used for training machine learning models.
  2. **Test set**: 10,000 labeled images used to test the performance of the trained model.

### 2.2 MNIST Image Details:

- **Size**: 28 pixels x 28 pixels (784 features per image)

- **Type**: Grayscale (each pixel value ranges from 0 to 255, where 0 is black and 255 is white)

- **Labels**: Each image is labeled with the digit (0-9) it represents.

### 2.3 Why MNIST is Important:

There are some characteristics for MNIST datasets:

- **Benchmarking**: MNIST has become a standard benchmark for evaluating machine learning algorithms, especially those in the field of image recognition.

- **Easy to Use**: It is considered beginner-friendly, as the task (digit classification) is relatively simple and well-defined.

- **Preprocessed**: The images are already preprocessed (normalized and centered), making it a good starting point for experimenting with machine learning models.

### 2.4 Example of MNIST Use Case:

A simple neural network can be trained on the MNIST dataset to recognize handwritten digits. The model would take a 28x28 image as input and output a predicted label from 0-9.

### 2.5 Loading MNIST in Python:

In Python, you can easily load the MNIST dataset using popular libraries like **TensorFlow**, **Keras** and **Sklearn**.

### 2.6 Example code to load MNIST in Keras library:

```python
from tensorflow.keras.datasets import mnist

# Load the MNIST dataset
(x_train, y_train), (x_test, y_test) = mnist.load_data()

# x_train and x_test contain the image data
# y_train and y_test contain the corresponding labels
print(x_train.shape)  # (60000, 28, 28)
print(y_train.shape)  # (60000,)

# Visulize the MNIST dataset
import matplotlib.pyplot as plt

# Plot the first image in the training set
plt.imshow(x_train[0], cmap='gray')
plt.title(f"Label: {y_train[0]}")
plt.show()
```

### 2.7 Simple Example to Load MNIST daset by sklearn

In todays lecture, I will introduce the simple and useful MNIST dataset and `matplotlib` and `sklearn` library in detail.

`Matplotlib` is a popular plotting library in Python, and Pyplot is the module used for plotting, especially for 2D visualizations. It provides a MATLAB-like interface for making various types of plots, such as line plots, bar charts, histograms, scatter plots, and more.

**Key Features of Matplotlib:**
- Versatile Plotting: You can create a wide range of visualizations, including 2D and 3D plots.
- Customization: You can easily customize the appearance of plots, such as colors, labels, titles, and gridlines.
- Subplots: You can arrange multiple plots in a single figure using subplots.
- Integration: It integrates well with other libraries such as NumPy and Pandas, making it easy to visualize data.

```python
import matplotlib.pyplot as plt # import matplotlib.pyplot library for visuliaztion
```

`sklearn` **(Scikit-learn)** is a popular library in Python for machine learning. It provides simple and efficient tools for data mining and data analysis, built on top of NumPy, SciPy, and matplotlib. It is widely used for implementing machine learning algorithms for classification, regression, clustering, and dimensionality reduction.

**Key Features of sklearn:**
- Algorithms: Includes a variety of machine learning algorithms for both supervised and unsupervised learning, such as:
  - Classification (e.g., Logistic Regression, SVM, Decision Trees)
  - Regression (e.g., Linear Regression, Ridge Regression)
  - Clustering (e.g., K-means, DBSCAN)
  - Dimensionality Reduction (e.g., PCA, UMAP)
- Preprocessing: Offers tools for preprocessing data (e.g., normalization, encoding categorical features).
- Model Selection: Provides tools for model selection and evaluation (e.g., cross-validation, hyperparameter tuning).
- Integration: Easily integrates with other Python libraries like pandas for data manipulation and matplotlib for visualizations.

```python
from sklearn.datasets import fetch_openml # import sklean.dataset for loa dataset from OpenML dataset
```

Firstly, we should load dataset from OpenML dataset by uitilizing `fetch_openml` function.

Syntax: `fetch_openml("data_name")`

```python
# here, we load and print the mnist_784 dataset with version 1
mnist = fetch_openml('mnist_784', version=1)
print("mnist: ", mnist)
```

From the output, we can see the dataset object has too much haphazard‌ information. To inspect the object orderly, we need to use other function to show it in order. Here, some common function will be introduced in the following context and be exampled in the following code.

1.   `dir()`
2.   `vars()`
3.   `help()`
4.   `inspect.getmembers()`
5.   `callable()`

```python
dir(mnist)
```

Acctually, The `mnist` is a Python object we will study in next chapter. Here, you should know the Python object has attributes and methods and you can return the attributes by `.attribute_name` and call the function by `.function_name()`.

```python
print("mnist.DESCR: ", mnist.DESCR)
print("\n--------------------------------------------------\n")

print(f"mnist.categories: {mnist.categories}")
print("\n--------------------------------------------------\n")

print("mnist.url: {}".format(mnist.url))
print("\n--------------------------------------------------\n")

print("mnist.feature_names: {}".format(mnist.feature_names))
print("\n--------------------------------------------------\n")

print(f"mnist.target: {mnist.target}")
print(f"mnist.target_name: {mnist.target_names}")
print("\n--------------------------------------------------\n")


print("mnist.frame: ", mnist.frame) # mnist.frame includes both data and target (labels)
print("mnist.frame.shape: ", mnist.frame.shape)
print("\n--------------------------------------------------\n")

print("mnist.data: %s" %(mnist.data)) # mnist.frame only includes data
print("minist.data.shape: %s" %{mnist.data.shape})
print("--------------------------------------------------\n")
```

For deep learning, we usually use `data` and `target` divivided by `mnist`.

```python
X = mnist['data']
y = mnist['target']

# check the dimension of the data and target
print(X.shape)  # the shape of data: (70000, 784) [28 x 28 = 784]
print(y.shape)  # the shape of target: (70000,)
```

Next step is to visualize the image thorough `plt` object.

```python
# visualize first image of this dataset in gray model
plt.imshow(mnist.data.iloc[0].values.reshape(28, 28), cmap="gray")

# draw the image
plt.show()
```

To display a 3x3 grid of images using matplotlib, you can use `plt.subplot()` to create subplots within the same figure. This allows you to control the layout of the images.

```python
# Create a 3x3 grid of subplots using plt.subplots() for better layout control
fig, axes = plt.subplots(3, 3, figsize=(9, 9))
print("fig: ", fig) # This is the figure object, which represents the entire window or page where your plot(s) will be drawn. A figure can contain multiple subplots, titles, legends, labels, etc. It's the "canvas" that holds all of the plotting elements.
print("axes: ", axes)

print("\n----------------------------------------------------------------------------------------------------\n")

# Loop through each subplot and display the images
for i in range(9):  # 9 images for 3x3 grid
    ax = axes[i // 3, i % 3]  # Calculate the correct subplot (row, col) Notes: "//" stands for to be divisible by or exact division, "%" stands for mode operator
    ax.imshow(mnist.data.iloc[i].values.reshape(28, 28), cmap="gray")
    ax.set_title(f"The target number is {mnist.target.iloc[i]}.")  # return the title by target values
    ax.axis('off')  # Hide axis for better visualization

# Adjust the layout to avoid overlap
plt.tight_layout(pad=3.0)  # Increase the padding between subplots
plt.show()
```

### 2.8 Problem

The key problem is **How can the computer recognize and return  the correct target number given arbitary gray color picture?** Because the computer is binary system, it only read and write 0 and 1.



To solve this problem, the **machine learning** is introduced. We will learn and solve it in later chapter.