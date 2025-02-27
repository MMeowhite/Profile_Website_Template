# Python和MNIST数据集

这篇文章将会简要介绍Python的部分基础语法以及MNIST数据集的导入、可视化，为后续机器学习进行铺垫。

> "The question is not, 'Can machines think?' but 'Can machines do what we (as thinking beings) can do?'" <br/><span style="display: block; text-align: right; font-weight: bold;">- <strong>Alan Turing</strong></span>

MNIST数据集简要介绍：

![video](https://www.bilibili.com/video/BV17m41127Kh)

## 0 Python 学习路径
Python 是一种多用途的高级编程语言，以其简洁和可读性著称。它广泛应用于各个领域，如 Web 开发、数据分析、机器学习、自动化等。Python 的语法清晰易懂，使其成为初学者和经验丰富的开发者的理想选择。
Python 的主要特点：
- **简洁且可读的语法**：Python 代码易于阅读和编写，使用缩进来定义代码块。
- **解释型语言**：Python 是一种解释型语言，意味着代码逐行执行，这使得调试更加容易。
- **跨平台**：Python 是跨平台的，这意味着你可以在 Windows、macOS 和 Linux 上编写并运行 Python 程序，而无需修改。
- **丰富的库**：Python 拥有庞大的标准库和活跃的第三方库生态系统，这使得扩展其功能变得容易。
- **社区支持**：Python 拥有一个庞大且活跃的社区，使得查找资源、教程和支持变得容易。

在本讲座之前，Python 的学习路径概述如下：

### 0.1 Python 的第一步
   - **目标**：学习基本语法、变量、数据类型和简单操作。
   - **资源**：
     - [官方 Python 教程](https://docs.python.org/3/tutorial/)
     - Python 文档
   - **主题**：
     - 安装 Python
     - 运行 Python 代码
     - 变量和数据类型（int, float, str, list, tuple, dict, set）
     - 基本输入/输出
     - 注释
     - 运算符（算术、比较、逻辑）

### 0.2 控制流
   - **目标**：理解如何使用条件语句和循环。
   - **主题**：
     - if, else, elif 语句
     - for 和 while 循环
     - break, continue 和 pass
     - 列表推导式

### 0.3 函数和模块
   - **目标**：学习如何将代码组织成可重用的部分，使用函数和模块。
   - **主题**：
     - 使用 def 定义函数
     - 函数参数和返回值
     - 变量作用域（全局 vs 局部）
     - 导入和使用模块
     - 内置 Python 模块（例如 math, datetime）

### 0.4 数据结构
   - **目标**：学习 Python 的内置数据结构及其高效使用方法。
   - **主题**：
     - 列表和列表操作
     - 元组和元组操作
     - 字典和字典操作
     - 集合和集合操作
     - 字符串操作

### 0.5 文件处理
   - **目标**：学习如何在 Python 中读取和写入文件。
   - **主题**：
     - 打开文件（open()）
     - 读取文件（read(), readlines()）
     - 写入文件（write(), writelines()）
     - 处理文件路径（os.path）
     - 使用上下文管理器（with）

### 0.6 面向对象编程（OOP）
   - **目标**：学习 Python 中的面向对象编程基础。
   - **主题**：
     - 类和对象
     - 属性和方法
     - self 关键字
     - 构造函数（__init__）
     - 继承
     - 多态
     - 封装
     - 方法重写

### 0.7 错误处理
   - **目标**：学习如何处理 Python 中的错误和异常。
   - **主题**：
     - try, except, else 和 finally
     - 自定义异常
     - 断言
     - 常见的 Python 异常（例如 IndexError, TypeError）

### 0.8 使用库和框架
   - **目标**：学习如何使用流行的 Python 库来完成不同的任务。
   - **库**：
     - **NumPy**：数值操作
     - **Pandas**：数据分析
     - **Matplotlib**：数据可视化
     - **Flask/Django**：Web 开发
     - **Requests**：HTTP 请求
     - **BeautifulSoup**：网页抓取

### 0.9 测试和调试
   - **目标**：学习 Python 中测试和调试的基本知识。
   - **主题**：
     - 使用 print() 进行调试
     - pdb 模块（Python 调试器）
     - 使用 unittest 进行单元测试
     - 测试中的断言
     - 测试驱动开发（TDD）

### 0.10 使用 API
   - **目标**：学习如何使用 Python 与 API 进行交互。
   - **主题**：
     - 使用 requests 发起 HTTP 请求
     - 处理 JSON 数据
     - API 认证
     - API 错误处理

### 0.11 高级主题（可选）
   - **目标**：深入探讨 Python 编程中的更高级概念。
   - **主题**：
     - 生成器和迭代器
     - 装饰器
     - 上下文管理器
     - 多线程和多进程
     - 异步编程（使用 asyncio）

### 0.12 项目
   - **目标**：通过完成小项目来应用所学知识。
   - **建议**：
     - **简单计算器**：使用函数和 OOP 实现一个基本计算器。
     - **待办事项列表**：实现一个命令行或基于 GUI 的待办事项应用。
     - **天气应用**：构建一个从 API 获取天气数据的应用。
     - **网页抓取器**：创建一个从网站抓取数据的简单脚本。
     - **个人网站**：使用 Flask 或 Django 构建一个简单的作品集网站。

### 0.13 进一步资源
   - **书籍**：
     - "Python 编程快速上手" by Al Sweigart
     - "Python 编程：从入门到实践" by Eric Matthes
   - **网站**：
     - [Python.org 文档](https://docs.python.org/3/)
     - [Real Python](https://realpython.com/)
     - [LeetCode](https://leetcode.com/) （用于练习）
   - **视频**：
     - Youtube: [Corey Schafer 的 YouTube 频道](https://www.youtube.com/c/Coreyms)
     - Bilibili: [字节跳动频道](https://www.bilibili.com/video/BV1rpWjevEip/?spm_id_from=333.337.search-card.all.click)
   - **Github 项目**
     - [Python 教程](https://github.com/walter201230/Python)
     - [基于项目的学习](https://github.com/practical-tutorials/project-based-learning?tab=readme-ov-file#python)
     - [Python-100-Days](https://github.com/jackfrued/Python-100-Days)

### 0.14 练习
   - **目标**：定期练习编码，以提高解决问题的能力。
   - **建议**：
     - 参与 HackerRank、CodeWars 或 LeetCode 等网站上的编程挑战。
     - 尝试为开源项目做贡献。
     - 查看其他程序员的代码，并尝试理解他们的解决方案。



## 1 Introduction to Python

Firstly, I will introduce the following part of Python: Assignment Statement, Variable and Data type, Control Flow Statement, Function.

### 1.1 赋值语句

在计算机科学中，等号是灵魂！等号的左右部分分别称为变量和值，就像这样 `变量 = 值`。变量用于存储数据值。例如，语句 `a = 1` 和 `b = true` 分别表示 `a,1` 和 `b,true` 是变量和值。变量可以由字母、数字 0-9、特殊符号 @#$%^&* 等及其任意组合命名。但它们遵循一定的规则和约定，以确保它们被正确命名和访问。以下是 Python 中定义和使用变量的关键规则。

- **以字母或下划线开头**：<br/>
  变量名必须以字母（a-z, A-Z）或下划线（`_`）开头。
    - 有效：`my_variable`, `_variable`
    - 无效：`1variable`（<u>不能以数字开头</u>）
- **后面可以跟字母、数字或下划线**：<br/>
  在第一个字母之后，变量名可以包含数字（0-9）、字母（a-z, A-Z）和下划线（`_`）。
    - 有效：`my_variable2`, `variable_123`
    - 无效：`my-variable`（不允许使用连字符）
- **区分大小写**：<br/>
  Python 是区分大小写的，这意味着 `Variable`、`variable` 和 `VARIABLE` 被视为不同的变量。
    - `myVariable` 和 `myvariable` 是两个不同的变量。
- **不能使用保留关键字**：<br/>
  变量名不能是 Python 的保留关键字，如 `if`、`for`、`else`、`True`、`None`、`class`、`import` 等。
    - 无效：`if`、`else`、`while`、`try` 等。

在 Python 中，变量是动态类型的，这意味着你不需要显式声明它们的类型。你可以直接使用赋值运算符 `=` 为变量赋值。

```python
x = 10         # 整数
name = "John"  # 字符串
is_active = True # 布尔值

print(f"x={x}")
print(f"x 的类型是 {type(x)}")

print("\n------------------------------------------\n")

print(f"name={name}")
print(f"name 的类型是 {type(name)}")

print("\n------------------------------------------\n")

print(f"is_active={is_active}")
print(f"is_active 的类型是 {type(is_active)}")
```

此外，Python 允许在一行中为多个变量赋值，用逗号分隔。

```python
x, y, z = 5, 3.14, "Hello" # 多重赋值，x 被赋值为 5，y 被赋值为 3.14，z 被赋值为 hello
print(f"x={x}, y={y}, z={z}")
```

### 1.2 变量与数据类型

与 C、C++、Java 相比，Python 是一种弱类型语言。这意味着在创建新数据时，你不需要精确地定义数据类型。但我们仍然需要了解 Python 中的变量和数据类型，这将有助于你开始学习 `PyTorch` 或 `Tensorflow` 库。在这一部分，我列出了一些常见的变量和数据类型：

- **数值类型**：
    - **int**：整数（整型）<br/>
      示例：`x = 5`
    - **float**：浮点数（小数）<br/> 示例：`y = 3.14`
    - **complex**：复数 <br/>
      示例：`z = 1 + 2j`
- **序列类型**：
    - **list**：有序、可变的集合 <br/>
      示例：`my_list = [1, 2, 3]`
    - **tuple**：有序、不可变的集合 <br/>
      示例：`my_tuple = (1, 2, 3)`
    - **range**：不可变的数字序列，用于循环<br/>
      示例：`my_range = range(5)`
- **文本类型**：
    - **string**：字符串（字符序列） <br/>
      示例：`name = "John"`
- **映射类型**：
    - **dict**：字典（无序的键值对集合） <br/>
      示例：`my_dict = {'name': 'John', 'age': 30}`
- **集合类型**：
    - **set**：无序的唯一元素集合 <br/>
      示例：`my_set = {1, 2, 3}`
    - **frozenset**：不可变的集合 <br/>
      示例：`my_frozenset = frozenset([1, 2, 3])`
- **布尔类型**：
    - **bool**：布尔值，True 或 False <br/>
      示例：`is_valid = True`
- **二进制类型**：
    - **bytes**：不可变的字节序列 <br/>
      示例：`b = b"hello" (01101000 01100101 01101100 01101100 01101111)`
    - **bytearray**：可变的字节序列 <br/>
      示例：`ba = bytearray([65, 66, 67])`
    - **memoryview**：内存的字节格式视图 <br/>
      示例：`m = memoryview(b"hello")`

你应该在代码的任何地方了解变量的数据类型，以避免类型错误。

同时，Python 是动态类型的，这意味着变量的类型可以在运行时改变。你可以随时将变量重新赋值为不同的类型。

在这里，我定义了一些 Python 中常用的类型：

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

列表内的元素可以是不同类型，同时**元素是可以被修改的**

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

元组内的元素也可以是不同类型，但是**元素是不可以被修改的**

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

对于字典（dictionary），它是与其他语言相比最强大的数据类型。字典中的每个项都以 `key=value` 的形式表示。

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

你能使用以下的方法返回值：

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

## 2. MNIST 数据集简介

MNIST（Modified National Institute of Standards and Technology）数据集是机器学习和计算机视觉领域中一个非常流行的数据集。它由 **60,000 张训练图像** 和 **10,000 张测试图像** 组成，每张图像都是 **28x28 像素的灰度图像**，表示手写数字（0 到 9）。

### 2.1 MNIST 的关键点：

- **用途**：该数据集用于训练和评估数字分类的机器学习模型。
- **图像**：每张图像表示一个数字，由不同的人书写，风格、粗细和倾斜度各不相同。
- **格式**：数据集分为两部分：
    1. **训练集**：60,000 张带标签的图像，用于训练机器学习模型。
    2. **测试集**：10,000 张带标签的图像，用于测试训练模型的性能。

### 2.2 MNIST 图像细节：

- **大小**：28 像素 x 28 像素（每张图像有 784 个特征）

- **类型**：灰度图像（每个像素值范围为 0 到 255，其中 0 表示黑色，255 表示白色）

- **标签**：每张图像都标有它所代表的数字（0-9）。

### 2.3 MNIST 的重要性：

MNIST 数据集具有以下特点：

- **基准测试**：MNIST 已成为评估机器学习算法（尤其是图像识别领域）的标准基准。

- **易于使用**：它被认为是初学者友好的，因为任务（数字分类）相对简单且定义明确。

- **预处理**：图像已经过预处理（归一化和居中），使其成为实验机器学习模型的良好起点。

### 2.4 MNIST 使用案例示例：

可以在 MNIST 数据集上训练一个简单的神经网络来识别手写数字。该模型将 28x28 的图像作为输入，并输出一个预测的标签（0-9）。

### 2.5 在 Python 中加载 MNIST：

在 Python 中，你可以使用流行的库（如 **TensorFlow**、**Keras** 和 **Sklearn**）轻松加载 MNIST 数据集。

### 2.6 例：使用`Keras`+`Matplotlib`加载并可视化MNIST数据集:

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

### 2.7 使用 `sklearn` 加载 MNIST 数据集的简单示例

在今天的课程中，我将详细介绍简单且实用的 MNIST 数据集以及 `matplotlib` 和 `sklearn` 库。

`Matplotlib` 是 Python 中一个流行的绘图库，而 Pyplot 是用于绘图的模块，尤其适用于 2D 可视化。它提供了一个类似 MATLAB 的接口，用于创建各种类型的图表，如折线图、条形图、直方图、散点图等。

**Matplotlib 的主要特性：**
- **多功能绘图**：可以创建各种类型的可视化图表，包括 2D 和 3D 图表。
- **自定义**：可以轻松自定义图表的外观，如颜色、标签、标题和网格线。
- **子图**：可以使用子图在单个图形中排列多个图表。
- **集成**：它与 NumPy 和 Pandas 等其他库集成良好，便于数据可视化。

```python
import matplotlib.pyplot as plt # import matplotlib.pyplot library for visuliaztion
```

`sklearn`（**Scikit-learn**）是 Python 中一个流行的机器学习库。它提供了简单高效的数据挖掘和数据分析工具，构建在 NumPy、SciPy 和 matplotlib 之上。它广泛用于实现分类、回归、聚类和降维等机器学习算法。

**sklearn 的主要特性：**
- **算法**：包含多种监督学习和无监督学习的机器学习算法，例如：
    - 分类（如逻辑回归、支持向量机、决策树）
    - 回归（如线性回归、岭回归）
    - 聚类（如 K-means、DBSCAN）
    - 降维（如主成分分析 PCA、UMAP）
- **预处理**：提供数据预处理的工具（如归一化、分类特征编码）。
- **模型选择**：提供模型选择和评估的工具（如交叉验证、超参数调优）。
- **集成**：可以轻松与其他 Python 库（如 pandas 用于数据处理，matplotlib 用于可视化）集成。

```python
from sklearn.datasets import fetch_openml # import sklean.dataset for loa dataset from OpenML dataset
```

首先，我们应该从OpenML数据库通过使用`fetch_openml()`函数来加载MNIST数据集

语法: `fetch_openml("data_name")`

```python
# here, we load and print the mnist_784 dataset with version 1
mnist = fetch_openml('mnist_784', version=1)
print("mnist: ", mnist)
```

从上面的输出可以看到输出非常杂乱无章，我们可以用以下的函数来清晰地查看对象的属性和方法

1.   `dir()`
2.   `vars()`
3.   `help()`
4.   `inspect.getmembers()`
5.   `callable()`

```python
dir(mnist)
```

实际上，`mnist` 是一个 Python 对象，我们将在下一章中学习它。在这里，你需要知道 Python 对象具有属性和方法，你可以通过 `.attribute_name` 返回属性，并通过 `.function_name()` 调用函数。

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

在深度学习中，我们通常使用由 `mnist` 划分的 `data` 和 `target`。

```python
X = mnist['data']
y = mnist['target']

# check the dimension of the data and target
print(X.shape)  # the shape of data: (70000, 784) [28 x 28 = 784]
print(y.shape)  # the shape of target: (70000,)
```

下一步通过`plt`对象实现可视化。

```python
# visualize first image of this dataset in gray model
plt.imshow(mnist.data.iloc[0].values.reshape(28, 28), cmap="gray")

# draw the image
plt.show()
```

要使用 `matplotlib` 显示一个 3x3 的图像网格，你可以使用 `plt.subplot()` 在同一图形中创建子图。这样可以控制图像的布局。

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

### 2.8 问题

目前的问题是 **计算机如何识别并返回任意灰度图像中的正确目标数字？** 因为计算机是二进制系统，它只能读取和写入 0 和 1。

为了解决这个问题，引入了 **机器学习**。我们将在后续章节中学习并解决它。