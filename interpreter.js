const operators = {
    "add": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return args[0]+args[1];
        },
    },
    "minus": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return -args[0];
        },
    },
    "times": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return args[0]*args[1];
        },
    },
    "over": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return 1/args[0];
        },
    },
    "round": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return args[0]%1;
        },
    },
    "div": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return Math.floor(args[0]/args[1]);
        },
    },
    "decimal": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return args[0]%1;
        },
    },
    "mod": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return args[0]%args[1];
        },
    },
    "exp": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return args[0]**args[1];
        },
    },
    "equal": {
        // Array modification required
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            if (typeof args[0] == "object") {
                if (args[0].length == args[1].length) {
                    for (let i=0; i<args[0].length; i++) {
                        if (args[0][i] != args[1][i]) {
                            return false;
                        }
                    }
                    return true;
                } else {return false}
            }
            return args[0]==args[1];
        },
    },
    "up": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return args[0]<args[1];
        },
    },
    "down": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return args[0]>args[1];
        },
    },
    "not": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return !args[0];
        },
    },
    "or": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return args[0] || args[1];
        },
    },
    "and": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return args[0] && args[1];
        },
    },
    "chr": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return String.fromCharCode(args[0]);
        },
    },
    "asc": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return args[0].charCodeAt(0);
        },
    },
    "shift": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return String.fromCharCode(Number(args[0].charCodeAt(0))+args[1]);
        },
    },
    "wrap": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return [args[0]];
        },
    },
    "array": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            let array = [];
            for (let i=0; i<args[0]; i++) {
                array.push(null);
            }
            return array;
        },
    },
    "take": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return structuredClone(args[0])[args[1]];
        },
    },
    "replace": {
        inputs: 3,
        evaluatingInputs: [true, true, true],
        evaluate: function (args) {
            let initialArray = structuredClone(args[0]);
            initialArray[args[1]] = structuredClone(args[2]);
            return initialArray;
        },
    },
    "steal": {
        inputs: 3,
        evaluatingInputs: [true, true, true],
        evaluate: function (args) {
            let initialArray = structuredClone(args[0]);
            let newArray = [];
            for (let i=args[1]; i<args[2]+args[1]; i++) {
                newArray.push(initialArray[i]);
            }
            return newArray;
        },
    },
    "length": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return args[0].length;
        },
    },
    "join": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            let initialArray = structuredClone(args[0]);
            let newArray = structuredClone(args[1]);
            for (let i=0; i<newArray.length; i++) {
                initialArray.push(newArray[i]);
            }
            return initialArray;
        },
    },
    "char": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (typeof args[0] == "boolean") {
                if (args[0]) {
                    return "1";
                } else {
                    return "0";
                }
            } else if (typeof args[0] == "number") {
                return JSON.stringify(args[0]);
            } else if (typeof args[0] == "object") {
                return ""; // Error
            } else {
                return args[0];
            }
        },
    },
    "num": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (typeof args[0] == "boolean") {
                if (args[0]) {
                    return 1;
                } else {
                    return 0;
                }
            } else if (typeof args[0] == "string") { // char
                return Number(args[0]);
            } else if (typeof args[0] == "object") {
                return Number(args[0][0]); // Error
            } else {
                return args[0];
            }
        },
    },
    "bool": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (typeof args[0] == "number") {
                return args[0] == 1;
            } else if (typeof args[0] == "string") { // char
                return args[0] == "1";
            } else if (typeof args[0] == "object") {
                return Boolean(args[0][0]); // Error
            } else {
                return args[0];
            }
        },
    },
    // Firstof for arrays needed here
}

const commands = {
    "new": {
        inputs: 2,
        evaluatingInputs: [false, true],
        run: function(args, variables, stack, line, functions) {
            let newVariables = variables;
            newVariables[args[0]] = args[1];
            return [newVariables, "", stack, line+1, functions, "noskip"];
        },
    },
    "set": {
        inputs: 2,
        evaluatingInputs: [false, true],
        run: function(args, variables, stack, line, functions) {
            let newVariables = variables;
            newVariables[args[0]] = args[1];
            return [newVariables, "", stack, line+1, functions, "noskip"];
        },
    },
    "out": {
        inputs: 1,
        evaluatingInputs: [true],
        run: function(args, variables, stack, line, functions, newline=true) {
            let newVariables = variables;
            let output = "";
            if (args[0] == null) {
                output = `<span class="tx-h">nothing</span>`;
            } else if (typeof args[0] == "number") {
                output = String(args[0]);
            } else if (typeof args[0] == "string") { // char
                output = args[0];
            } else if (typeof args[0] == "boolean") {
                output = args[0] ? `<span class="tx-h">true</span>` : `<span class="tx-a">not</span> <span class="tx-h">true</span>`;
            } else {
                for (let item of args[0]) {
                    output += this.run([item], variables, stack, line, functions, false)[1];
                }
            }
            output += newline ? "<br>" : "";
            return [newVariables, output, stack, line+1, functions, "noskip"];
        },
    },
    "function": {
        inputs: 2,
        evaluatingInputs: [false, false],
        run: function(args, variables, stack, line, functions) {
            let newVariables = variables;
            functions[args[0]] = [line+1, args[1]]; // Store line number of function body and parameter name
            return [newVariables, "", stack, line+1, functions, "skipall"]; // "skipall" - skip executing body of function and the return command
        },
    },
    "make": {
        inputs: 2,
        evaluatingInputs: [false, true],
        run: function(args, variables, stack, line, functions) {
            let newVariables = {}; // No accessible variables outside function
            let newLine = functions[args[0]][0]; // Get line number of function body
            let newStack = structuredClone(stack);
            newStack.push({
                call: line,
                variables: variables,
                type: "function",
            })
            newVariables[functions[args[0]][1]] = args[1]; // Store argument in function's parameter variable
            return [newVariables, "", newStack, newLine, functions, "noskip"];
        },
    },
    "return": {
        inputs: 1,
        evaluatingInputs: [true],
        run: function(args, variables, stack, line, functions) {
            let lastCall = stack[stack.length-1];
            let newStack = stack.slice(0, -1); // Remove last call from stack
            let newLine = lastCall.call+1;
            let newVariables = lastCall.variables; // Not accessible outside function - scope
            newVariables["made"] = args[0]; // Return value stored in special variable "made"
            return [newVariables, "", newStack, newLine, functions, "noskip"];
        },
    },
    "if": {
        inputs: 1,
        evaluatingInputs: [true],
        run: function(args, variables, stack, line, functions) {
            let newVariables = variables;
            newVariables["else"] = !args[0]; // Store whether an else statement should be executed in a special variable called "else"
            let newStack = structuredClone(stack);
            newStack.push({
                call: line,
                variables: variables,
                type: "if",
            });
            if (args[0]) { // The *real* if statement
                return [newVariables, "", newStack, line+1, functions, "noskip"]; // Do not skip
            } else {
                return [newVariables, "", newStack, line+1, functions, "skipexceptlast"]; // Skip executing body of if statement but run the 'end' command
            }
        },
    },
    "while": {
        inputs: 1,
        evaluatingInputs: [true],
        run: function(args, variables, stack, line, functions) {
            let newVariables = variables;
            let newStack = structuredClone(stack);
            if (args[0]) {
                newStack.push({
                    call: line,
                    variables: variables,
                    type: "while",
                });
                return [newVariables, "", newStack, line+1, functions, "noskip"]; // Do not skip
            } else {
                return [newVariables, "", newStack, line+1, functions, "skipall"]; // Skip executing body of while loop including end command. End not needed since the stack is not added to
            }
        },
    },
    "end": {
        inputs: 0,
        evaluatingInputs: [],
        run: function(args, variables, stack, line, functions) {
            let newVariables = variables;
            console.log("End statement reached.");
            let lastCall = stack[stack.length-1];
            let newStack = stack.slice(0, -1);
            let newLine = line+1;
            if (lastCall.type == "if") {
                // END IF
                for (let key in lastCall.variables) {
                    if (key in newVariables) {
                        newVariables[key] = lastCall.variables[key]; // Scope - variables already declared before are updated inside the if statement
                    }
                }
                console.log("End of if statement reached.");
            } else if (lastCall.type == "while") {
                // END WHILE
                for (let key in lastCall.variables) {
                    if (key in newVariables) {
                        newVariables[key] = lastCall.variables[key]; // Scope - variables already declared before are updated inside the while loop
                    }
                }
                console.log("End of while loop reached.");
                // Go back to the start, and let the while command check the condition again (and skip if needed)
                newLine = lastCall.call;
            }
            return [newVariables, "", newStack, newLine, functions, "noskip"]; // Do not skip executing body
        },
    },
}

const constants = {
    "space": function(){return " "},
    "newline": function(){return "\n"},
    "tab": function(){return "\t"},
    "alpha": function(){return ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]},
    "zero": function(){return 0},
    "one": function(){return 1},
    "two": function(){return 2},
    "three": function(){return 3},
    "four": function(){return 4},
    "five": function(){return 5},
    "six": function(){return 6},
    "seven": function(){return 7},
    "eight": function(){return 8},
    "nine": function(){return 9},
    "ten": function(){return 10},
    "nothing": function(){return null},
    "pi": function(){return 3.1415926535897932384626433},
    "true": function(){return true},
    "case": function(){return 26},
    "noted": function(){return variables["noted"]},
    "made": function(){return variables["made"]},
    "else": function(){return variables["else"]},
}

function parseWord(word, variables) {
    if (word in variables) {
        return variables[word];
    } else if (word in constants) {
        return constants[word]();
    } else if (String(Number(word)) == word) {
        return Number(word); // Parse number
    } else if (word.length == 1) {
        return word; // Single character
    } else {
        let arr = [];
        for (let char of word) {
            arr.push(char);
        }
        return arr; // Parse string into array of chars
    }
}

// Recursive
function evaluate(arg, variables, functions) {
    // Identifier -> identifier
    // Operator+value -> value
    // Value -> value
    // Operator+identifier -> value?
    console.log("Evaluating: "+arg);

    if (arg.length == 1) {
        // Return the single value
        let parsed = parseWord(arg[0], variables);
        return parsed;
    } else {
        let args = [];
        console.log("Breakdown:");
        if (arg[0] in operators) {
            // Split the words into sections, and evaluate each section
            let operator = operators[arg[0]];
            let expectedArgs = operator.inputs;
            let initialArgs = expectedArgs;
            let allArgsBefore = [];
            let i = 0;
            for (let word of arg) {
                if (i != 0) {
                    allArgsBefore.push(word); // Keep track of arguments
                    if (word in operators) {
                        expectedArgs += operators[word].inputs - 1; // Additional argument expected (minus operator, which takes up one word)
                    } else {
                        expectedArgs--;
                        if (expectedArgs < initialArgs) {
                            // As soon as one whole argument is ended, store in args
                            initialArgs = expectedArgs;
                            args.push(evaluate(allArgsBefore, variables, functions));
                            allArgsBefore = [];
                        }
                    }
                    console.log("Argument: "+word+", Expected "+expectedArgs+" more.");
                }
                i++;
            }
            console.log("End breakdown:");

            // Return the operator's calculation
            return operator.evaluate(args);
        } else {
            console.log("End Breakdown ERRONEOUS:");
            return 0; // Hopefully this code won't run, unless the user types in two non-operators in the space of one
        }
    }
}

function runLine(line, variables, stack, functions, skipFlag, skipType, lineNumber) {
    let newVariables = structuredClone(variables);
    let principalCommand = line[0];
    let output = "";
    let newStack = structuredClone(stack);
    let newFunctions = structuredClone(functions);
    let newSkipFlag = skipFlag;
    let newSkipType = skipType;
    let newLine = lineNumber;

    if (newSkipFlag != 0) {
        if (["end", "return"].includes(principalCommand)) {
            newSkipFlag--;
        } else if (["function", "process", "repeat", "while", "count", "search", "if"].includes(principalCommand)) {
            newSkipFlag++;
        }
        newLine = lineNumber+1;
    }

    // If skipFlag is now 0, then the line can be executed. Otherwise, it is skipped.
    if (newSkipFlag == 0 && skipType != "skipall" && principalCommand in commands) { // ie. not skipall: noskip or skipexceptlast
        let command = commands[principalCommand];

        // Format arguments to principal command (first of line)
        let args = [];
        let expectedArgs = command.inputs; // Keep track of how many args needed
        let initialArgs = expectedArgs;
        let i = 0;
        let allArgsBefore = [];
        for (let word of line) {
            if (i != 0) {
                allArgsBefore.push(word);
                if (word in operators) {
                    expectedArgs += operators[word].inputs - 1; // Additional args expected.
                } else {
                    expectedArgs--;
                    if (expectedArgs < initialArgs) {
                        initialArgs = expectedArgs;
                        if (command.evaluatingInputs[args.length] == true) {
                            // If the argument is allowed to be evaluated by the command details
                            args.push(evaluate(allArgsBefore, variables, functions)); // Evaluate into the *real* args list
                            allArgsBefore = [];
                        } else {
                            args.push(allArgsBefore[0]);
                            allArgsBefore = [];
                        }
                    }
                }
                console.log("Argument: "+word+", Expected "+expectedArgs+" more.");
            }
            i++;
        }

        // Run command
        console.log("Running the command "+principalCommand+" with arguments "+JSON.stringify(args));
        let result = command.run(args, variables, stack, lineNumber, functions); // Runs the line
        newVariables = result[0];
        output = result[1];
        newStack = result[2];
        newLine = result[3];
        newFunctions = result[4];
        newSkipFlag = ["skipall", "skipexceptlast"].includes(result[5]) ? 1 : 0;
        newSkipType = result[5];
    } else if (newSkipFlag == 0 && skipType != "skipall" && principalCommand == "note") {
        // Note is a special command - it is not contained in the commands object, since it is a command.
        let note = [];
        let i = 0;
        for (let word of line) {
            if (i != 0) {
                console.log(word);
                for (let char of word) {
                    note.push(char);
                }
                note.push(" ");
            }
            i++;
        }
        note.pop(); // Remove extra space
        newLine = lineNumber+1;
        newVariables["noted"] = note; // Store a note in a special variable called "noted" (it's a reserved name anyway)
    } else {
        // Error command unrecognised
        newLine = lineNumber+1;
    }
    if (newSkipFlag == 0) {
        newSkipType = "noskip";
    }
    return { variables: newVariables, output, newLine, newSkipFlag, newStack, newFunctions, newSkipType };
}

let output = "";
let code = [];

let lineNumber = 0;
let stack = [];
let variables = {noted: null, made: null, else: false,}; // Reserved variable name for comments, function return values, and if statements
let functions = {}; // Table of line numbers of functions and their parameter names
let skipFlag = 0;
let skipType = "noskip";
let result;

function beginStep(wordic) {
    // Convert the code into a 2D array of lines and words
    output = "";
    let len = wordic.length;
    let word = "";
    let line = [];
    let i = 0;
    code = []
    for (let char of wordic) {
        if (char == " " || char == "\n" || i==len-1) {
            line.push(word);
            word = "";
        } else {
            word += char;
        }
        if (char == "\n" || i==len-1) {
            // Run the line
            code.push(line);
            line = [];
        }
        i++;
    }

    // Initialise the interpreter state
    lineNumber = 0;
    stack = [];
    variables = {noted: null, made: null, else: false,}; // Reserved variable name for comments, function return values, and if statements
    functions = {}; // Table of line numbers of functions and their parameter names
    skipFlag = 0;
    result;
    document.getElementById("output-value").innerHTML = "";
    document.getElementById("pointer").style.top = (lineNumber*22)+"px";
}

function step() {
    // Check for end of code
    if (lineNumber >= code.length) {
        console.log("LN:"+lineNumber);
        console.log("LINE: END OF CODE");
        return false;
    }

    let initial = true;
    while (initial || skipFlag > 0) { // LineNumber < code.length check is as a safeguard in case code blocks were not closed
        // Run line
        line = code[lineNumber];
        console.log("LN:"+lineNumber);
        console.log("LINE:"+line);
        result = runLine(line, variables, stack, functions, skipFlag, skipType, lineNumber);

        // Update interpreter state
        variables = result.variables;
        output += result.output;
        lineNumber = result.newLine;
        skipFlag = result.newSkipFlag;
        skipType = result.newSkipType;
        stack = result.newStack;
        functions = result.newFunctions;

        initial = false;
        document.getElementById("output-value").innerHTML += result.output;
    }
    document.getElementById("pointer").style.top = (lineNumber*22)+"px";
    document.getElementById("callers").innerHTML = "";
    for (let call of stack) {
        document.getElementById("callers").innerHTML += `<div class="caller" style="top: ${call.call*22}px;"></div>`;
    }
    return true;
}

function run(wordic) {
    beginStep(wordic);
    let cont = true;
    while (cont) {
        cont = step();
    }
    document.getElementById("callers").innerHTML += "";
}
