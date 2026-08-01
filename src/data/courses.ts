export interface Lesson {
  id: number;
  title: string;
  description: string;
  explanation: string;
  code: string;
  challenge: string;
  hint: string;
  completed: boolean;
}

export interface Course {
  language: string;
  icon: string;
  color: string;
  description: string;
  lessons: Lesson[];
}

export const courses: Record<string, Course> = {
  Python: {
    language: "Python",
    icon: "🐍",
    color: "from-green-500 to-emerald-600",
    description: "Learn Python from beginner to advanced.",
    lessons: [
      {
        id: 1,
        title: "Introduction to Python",
        description: "Write and run your first Python program.",
        explanation:
          "Python is a beginner-friendly programming language known for its clear, readable syntax. It is used for web development, automation, data science, artificial intelligence, and many other fields.\n\nPython runs instructions from top to bottom. The built-in print function displays text or values in the console, making it a useful first tool for seeing what your program does.",
        code: `print("Hello, Python!")
print("I am learning to code.")`,
        challenge: "Print your name and one reason you want to learn Python.",
        hint: "Put the text you want to display inside quotes and pass it to print().",
        completed: false,
      },
      {
        id: 2,
        title: "Variables",
        description: "Store information in named variables and reuse it later.",
        explanation:
          "A variable is a name that refers to a value. Variables let a program remember information such as a user's name, a score, or the number of items in a cart.\n\nIn Python, create a variable with the assignment operator (=). You do not need to declare its type first, and you can use the variable by writing its name in a later expression.",
        code: `student_name = "Maya"
lessons_completed = 2

print(student_name)
print(lessons_completed)`,
        challenge: "Create variables for your favorite language and weekly study hours, then print both.",
        hint: "Use quotes for text values, but not for whole numbers.",
        completed: false,
      },
      {
        id: 3,
        title: "Data Types",
        description: "Learn how Python represents text, numbers, and true-or-false values.",
        explanation:
          "Every value has a data type that describes what kind of information it holds. Common Python types include strings for text, integers for whole numbers, floats for decimal numbers, and booleans for True or False.\n\nThe type of a value determines which operations make sense. Numbers can be added mathematically, while strings can be joined together. The type function lets you inspect any value's type.",
        code: `course = "Python"
lesson_count = 5
progress = 0.4
is_beginner = True

print(type(course))
print(type(lesson_count))
print(type(progress))
print(type(is_beginner))`,
        challenge: "Create one string, integer, float, and boolean, then print the type of each.",
        hint: "Python booleans are written as True and False with capital first letters.",
        completed: false,
      },
      {
        id: 4,
        title: "Loops",
        description: "Repeat actions efficiently with for and while loops.",
        explanation:
          "Loops run the same block of code multiple times. A for loop is useful when iterating over a sequence or a known range of values.\n\nPython uses indentation to show which statements belong inside a loop. The range function can generate a sequence of numbers, and each number is assigned to the loop variable one at a time.",
        code: `for lesson_number in range(1, 6):
    print("Starting lesson", lesson_number)

print("All lessons started!")`,
        challenge: "Use a loop to print the numbers 1 through 10.",
        hint: "The ending value passed to range is not included.",
        completed: false,
      },
      {
        id: 5,
        title: "Functions",
        description: "Group reusable instructions into functions.",
        explanation:
          "A function is a named block of code designed to perform a specific task. Functions reduce repetition and make larger programs easier to understand.\n\nDefine a Python function with the def keyword. Parameters provide input to the function, and a return statement sends a result back to the code that called it.",
        code: `def create_greeting(name):
    return "Welcome, " + name + "!"

message = create_greeting("Jordan")
print(message)`,
        challenge: "Write a function named double that accepts a number and returns twice its value.",
        hint: "Return the parameter multiplied by 2.",
        completed: false,
      },
    ],
  },

  Java: {
    language: "Java",
    icon: "☕",
    color: "from-orange-500 to-red-600",
    description: "Master Java programming.",
    lessons: [
      {
        id: 1,
        title: "Introduction to Java",
        description: "Build a small Java program that prints to the console.",
        explanation:
          "Java is a strongly typed programming language used for backend services, Android applications, and large software systems. Java source code is compiled into bytecode that runs on the Java Virtual Machine.\n\nEvery Java application starts from a class. The main method is the entry point that runs first, and System.out.println writes a line of output to the console.",
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
        challenge: "Change the program so it prints your name on a second line.",
        hint: "Add another System.out.println statement inside main.",
        completed: false,
      },
      {
        id: 2,
        title: "Variables",
        description: "Declare typed variables that store values in Java.",
        explanation:
          "A Java variable has a type, a name, and a value. The type tells Java what kind of information the variable may store and helps catch mistakes before the program runs.\n\nDeclare a variable by placing its type before its name. For example, String stores text and int stores whole numbers. A variable can then be used anywhere it is in scope.",
        code: `public class Main {
    public static void main(String[] args) {
        String studentName = "Maya";
        int lessonsCompleted = 2;

        System.out.println(studentName);
        System.out.println(lessonsCompleted);
    }
}`,
        challenge: "Create variables for your age and favorite programming language, then print them.",
        hint: "Use int for age and String for the language name.",
        completed: false,
      },
      {
        id: 3,
        title: "Data Types",
        description: "Work with Java's common primitive and reference data types.",
        explanation:
          "Java provides primitive types for simple values. int stores whole numbers, double stores decimal numbers, boolean stores true or false, and char stores one character.\n\nText is represented by the String reference type. Choosing an appropriate type makes the purpose of a variable clear and controls which operations can be performed on it.",
        code: `public class Main {
    public static void main(String[] args) {
        int lessonCount = 5;
        double progress = 42.5;
        boolean isLearning = true;
        char grade = 'A';
        String course = "Java";

        System.out.println(course + ": " + progress + "%");
    }
}`,
        challenge: "Declare one int, double, boolean, char, and String with your own values.",
        hint: "Use single quotes for char values and double quotes for String values.",
        completed: false,
      },
      {
        id: 4,
        title: "Loops",
        description: "Repeat Java statements with a for loop.",
        explanation:
          "Loops automate repetitive work. A for loop combines a starting value, a condition, and an update into one statement.\n\nThe loop body runs while its condition remains true. Braces group the statements that should repeat, and the counter can be used inside the loop body.",
        code: `public class Main {
    public static void main(String[] args) {
        for (int lesson = 1; lesson <= 5; lesson++) {
            System.out.println("Starting lesson " + lesson);
        }
    }
}`,
        challenge: "Write a for loop that prints the even numbers from 2 through 10.",
        hint: "Start at 2 and increase the counter by 2 each time.",
        completed: false,
      },
      {
        id: 5,
        title: "Methods",
        description: "Organize reusable behavior in Java methods.",
        explanation:
          "A method is a named group of statements that performs a task. Methods can receive values through parameters and return a result of a declared type.\n\nStatic methods can be called directly from the main method in this beginner example. When a method returns no value, its return type is void; otherwise, it must return a matching value.",
        code: `public class Main {
    static int doubleNumber(int number) {
        return number * 2;
    }

    public static void main(String[] args) {
        int result = doubleNumber(6);
        System.out.println(result);
    }
}`,
        challenge: "Create a method named add that returns the sum of two integer parameters.",
        hint: "Give the method two int parameters and an int return type.",
        completed: false,
      },
    ],
  },

  "C++": {
    language: "C++",
    icon: "⚙️",
    color: "from-blue-500 to-indigo-600",
    description: "Learn the foundations of C++ programming.",
    lessons: [
      {
        id: 1,
        title: "Introduction to C++",
        description: "Compile a simple C++ program and display output.",
        explanation:
          "C++ is a fast, general-purpose language used for games, operating systems, embedded devices, and performance-sensitive applications. A compiler translates C++ source code into a program the computer can run.\n\nThe main function is where execution begins. The iostream header provides console input and output tools, and std::cout sends text to the console.",
        code: `#include <iostream>

int main() {
    std::cout << "Hello, C++!" << std::endl;
    return 0;
}`,
        challenge: "Add another output statement that prints what you want to build with C++.",
        hint: "Copy the std::cout line and change the text inside the quotes.",
        completed: false,
      },
      {
        id: 2,
        title: "Variables",
        description: "Store typed values in C++ variables.",
        explanation:
          "A variable gives a value a meaningful name. C++ requires each variable to have a declared type so the compiler knows how the value should be stored and used.\n\nThe int type stores whole numbers, while std::string stores text. Include the string header when using std::string, and initialize variables with values when they are created.",
        code: `#include <iostream>
#include <string>

int main() {
    std::string studentName = "Maya";
    int lessonsCompleted = 2;

    std::cout << studentName << " completed "
              << lessonsCompleted << " lessons." << std::endl;
    return 0;
}`,
        challenge: "Create variables for your favorite language and study hours, then print them.",
        hint: "Use std::string for text and int for a whole number.",
        completed: false,
      },
      {
        id: 3,
        title: "Data Types",
        description: "Represent numbers, characters, text, and logical values in C++.",
        explanation:
          "C++ offers different data types for different kinds of information. int stores whole numbers, double stores decimals, char stores one character, and bool stores true or false.\n\nUsing the correct type makes programs clearer and avoids wasted memory or invalid operations. The std::boolalpha output modifier displays boolean values as words instead of 1 or 0.",
        code: `#include <iostream>
#include <string>

int main() {
    int lessonCount = 5;
    double progress = 40.5;
    char level = 'B';
    bool isLearning = true;
    std::string course = "C++";

    std::cout << std::boolalpha << isLearning << std::endl;
    return 0;
}`,
        challenge: "Declare one variable using each data type shown and print all five values.",
        hint: "Join values in one output statement with additional << operators.",
        completed: false,
      },
      {
        id: 4,
        title: "Loops",
        description: "Use C++ loops to repeat a block of code.",
        explanation:
          "A for loop is useful when the number of repetitions is known. It contains an initializer, a condition, and an update expression.\n\nThe loop body runs while the condition is true. Curly braces identify the code that repeats, and the counter variable changes after each iteration.",
        code: `#include <iostream>

int main() {
    for (int lesson = 1; lesson <= 5; lesson++) {
        std::cout << "Starting lesson " << lesson << std::endl;
    }
    return 0;
}`,
        challenge: "Write a loop that counts down from 5 to 1, then prints \"Go!\".",
        hint: "Start the counter at 5 and use -- to decrease it.",
        completed: false,
      },
      {
        id: 5,
        title: "Functions",
        description: "Create reusable C++ functions with parameters and return values.",
        explanation:
          "Functions break a program into smaller, reusable tasks. A function declaration specifies its return type, name, and parameters.\n\nWhen a function is called, argument values are assigned to its parameters. The return statement sends a result back to the caller, where it can be stored or used immediately.",
        code: `#include <iostream>

int doubleNumber(int number) {
    return number * 2;
}

int main() {
    int result = doubleNumber(6);
    std::cout << result << std::endl;
    return 0;
}`,
        challenge: "Write a function named square that accepts an integer and returns its square.",
        hint: "Multiply the parameter by itself in the return statement.",
        completed: false,
      },
    ],
  },

  React: {
    language: "React",
    icon: "⚛️",
    color: "from-cyan-500 to-blue-600",
    description: "Build modern web apps with React.",
    lessons: [
      {
        id: 1,
        title: "What is React?",
        description: "Discover how React builds interfaces from reusable pieces.",
        explanation:
          "React is a JavaScript library for building user interfaces. It lets developers describe what the screen should look like for the current application state.\n\nReact interfaces are assembled from components. Each component owns a small part of the screen, which makes an application easier to understand and maintain.",
        code: `function App() {
  return <h1>Hello, React!</h1>;
}

export default App;`,
        challenge: "Change the heading so it welcomes a new CodePilot student.",
        hint: "Edit the text between the opening and closing h1 tags.",
        completed: false,
      },
      {
        id: 2,
        title: "JSX",
        description: "Describe user interfaces with JSX syntax.",
        explanation:
          "JSX is a syntax extension that lets you write markup-like code inside JavaScript. Build tools transform JSX into regular JavaScript that React understands.\n\nJSX expressions use curly braces to include JavaScript values. Elements must be properly closed, and a component must return one parent element.",
        code: `function Greeting() {
  const student = "Maya";

  return <p>Welcome back, {student}!</p>;
}`,
        challenge: "Create a lesson count variable and display it in a second paragraph.",
        hint: "Wrap both paragraphs in a div and place the variable inside curly braces.",
        completed: false,
      },
      {
        id: 3,
        title: "Components",
        description: "Create reusable React components.",
        explanation:
          "A component is a JavaScript function that returns JSX. Components should have capitalized names so React can distinguish them from built-in HTML elements.\n\nSmall components can be combined to create complete pages. Reusing a component avoids duplicating the same interface markup.",
        code: `function LessonBadge() {
  return <span>Beginner Lesson</span>;
}

function App() {
  return <LessonBadge />;
}`,
        challenge: "Create a CourseTitle component and render it inside App.",
        hint: "Define another capitalized function that returns a heading.",
        completed: false,
      },
      {
        id: 4,
        title: "Props",
        description: "Pass data from a parent component to a child.",
        explanation:
          "Props are values provided to a component by its parent. They let the same component display different information each time it is used.\n\nA component receives its props as an object. Props are read-only, so a child component should display or use them without changing them.",
        code: `function CourseCard({ title }: { title: string }) {
  return <h2>{title}</h2>;
}

function App() {
  return <CourseCard title="Learn React" />;
}`,
        challenge: "Add a level prop and display it below the course title.",
        hint: "Add level to both the prop type and the destructured function parameter.",
        completed: false,
      },
    ],
  },
};