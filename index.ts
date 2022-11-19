#! /usr/bin/env node


import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';



const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));


async function welcome() {
    figlet(`Calculator App  \n`, (err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
    await sleep();


    const rainbowTitle = chalkAnimation.rainbow(
        'Develop by: Hassan Javed \n'
    );
    await sleep();
    rainbowTitle.stop();


    console.log(`
    ${chalk.bgBlue('HOW TO USE CALCULATOR')} 
    I am a process on your computer.
    If you get any operator wrong I will be ${chalk.bgRed('killed')}
    So get  operator right. (+, -, x, /)..
  `);

}


const handleCalculate = async () => {

    let num1 = await inquirer.prompt([{
        name: "num",
        type: "number",
        message: "Enter first value:"
    }
    ]);
    let oper = await inquirer.prompt([{
        name: "operator",
        type: "input",
        message: "Enter operator:"
    }
    ]);
    let num2 = await inquirer.prompt([{
        name: "num",
        type: "number",
        message: "Enter Secend value:"
    }
    ]);

    const spinner = createSpinner('Calculating value...').start();
    await sleep();
    console.log("\n");

    if (oper.operator == "+") {
        spinner.success({ text: ` Answer = ${(num1.num) + (num2.num)}` })
        process.exit(0);
    }
    else if (oper.operator == "-") {
        spinner.success({ text: ` Answer = ${num1.num - num2.num}` })
        process.exit(0);
    }
    else if (oper.operator == "*") {
        spinner.success({ text: ` Answer = ${num1.num * num2.num}` })
        process.exit(0);

    }
    else if (oper.operator == "/") {
        spinner.success({ text: ` Answer = ${num1.num / num2.num}` })
        process.exit(0);
    }
    else {
        spinner.error({ text: `💀💀💀 you entered wrong operator!` });
        process.exit(1);
    }
}




// Run it with top-level await
console.clear();
await welcome();
handleCalculate()



