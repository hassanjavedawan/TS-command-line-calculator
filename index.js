#! /usr/bin/env node
/** @format */
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms));
async function welcome() {
    figlet(`Calculator App  \n`, (err, data) => {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data);
    });
    await sleep();
    const rainbowTitle = chalkAnimation.rainbow("Develop by: Hassan Javed \n");
    await sleep();
    rainbowTitle.stop();
    console.log(`
    ${chalk.bgBlue("HOW TO USE CALCULATOR")} 
    I am a process on your computer.
    Enter First Number...
    Select Operator...
    Enter Second Number...
  `);
}
async function handleCalculate() {
    let num1 = await inquirer.prompt([
        {
            name: "num",
            type: "number",
            message: "Enter first value:",
        },
    ]);
    let oper = await inquirer.prompt([
        {
            name: "operator",
            type: "list",
            message: "Select operator:",
            choices: [
                "Addition (+)",
                "Subtraction (-)",
                "Multiplication (*)",
                "Division (/)",
            ],
        },
    ]);
    let num2 = await inquirer.prompt([
        {
            name: "num",
            type: "number",
            message: "Enter Second value:",
        },
    ]);
    const spinner = createSpinner("Calculating value...").start();
    await sleep();
    console.log("\n");
    if (oper.operator == "Addition (+)") {
        spinner.success({ text: ` Answer = ${num1.num + num2.num} \n` });
    }
    else if (oper.operator == "Subtraction (-)") {
        spinner.success({ text: ` Answer = ${num1.num - num2.num} \n` });
    }
    else if (oper.operator == "Multiplication (*)") {
        spinner.success({ text: ` Answer = ${num1.num * num2.num} \n` });
    }
    else if (oper.operator == "Division (/)") {
        spinner.success({ text: ` Answer = ${num1.num / num2.num} \n` });
    }
    else {
        spinner.error({ text: `💀💀💀 you entered wrong operator! \n` });
    }
}
async function againStart() {
    do {
        await handleCalculate();
        var again = await inquirer.prompt({
            name: "repeat",
            type: "input",
            message: "Do you went to continue? Press y or n:",
        });
    } while (again.repeat === "y" ||
        again.repeat === "Y" ||
        again.repeat === "yes" ||
        again.repeat === "yes");
}
// Run it with top-level await
console.clear();
await welcome();
againStart();
