import inquirer from 'inquirer';

class Student {
    firstName: string;
    lastName: string;
    studentID: number;
    courses: string[];
    balance: number;

    constructor(firstName: string, lastName: string, studentID: number, courses: string[], balance: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.studentID = studentID;
        this.courses = courses;
        this.balance = balance;
    }

    enroll(courseName: string) {
        this.courses.push(courseName);
        console.log(`${courseName} has been added to the courses enrolled by ${this.firstName} ${this.lastName}.`);
    }

    viewBalance() {
        console.log(`The balance of ${this.firstName} ${this.lastName} is $${this.balance}.`);
    }

    payTuition(amount: number) {
        this.balance -= amount;
        console.log(`${amount} has been paid by ${this.firstName} ${this.lastName}.`);
    }

    showStatus() {
        console.log(`Name: ${this.firstName} ${this.lastName}`);
        console.log(`Student ID: ${this.studentID}`);
        console.log(`Courses Enrolled: ${this.courses}`);
        console.log(`Balance: $${this.balance}`);
    }
}

function generateStudentID() {
    return Math.floor(Math.random() * 90000) + 10000;
}

inquirer.prompt([
    {
        type: 'input',
        name: 'firstName',
        message: "Enter first name:"
    },
    {
        type: 'input',
        name: 'lastName',
        message: "Enter last name:"
    },
    {
        type: 'number',
        name: 'courseCount',
        message: "How many courses do you want to enroll in?"
    }
]).then(answers => {
    let studentID = generateStudentID();
    let courses: string[] = [];
    let balance = 0;

    let student1 = new Student(answers.firstName, answers.lastName, studentID, courses, balance);

    for (let i = 0; i < answers.courseCount; i++) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'courseName',
                message: `Enter course ${i + 1} name:`
            }
        ]).then(answers => {
            student1.enroll(answers.courseName);
        });
    }

    inquirer.prompt([
        {
            type: 'number',
            name: 'paymentAmount',
            message: "Enter payment amount:"
        }
    ]).then(answers => {
        student1.payTuition(answers.paymentAmount);
        student1.showStatus();
    });
});
