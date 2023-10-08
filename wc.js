
//TODO
//
//    - add command options to dictionary so multiple options can be called in combination
//         eg: wc -cl


const fs = require('fs');

var sizeTotals = [];
var numLinesTotals = [];
var numWordsTotals = [];
var numCharsTotals = [];


function wc() {

    if (!whichInput) {
        if (process.argv[2] == undefined) {
            console.log('Use -h for help.')
            return;
        };
    }


    if (process.argv[2]) {
        var command = process.argv[2];
    };


    var pathToFile = process.argv[3];


    if (whichInput) {
        fileName = '';
    };


    if (pathToFile) {
    
        var filesToCheck = [];
        var counter = 2;
        var nextFile = 'INITIAL'

        // check for additional files
        while (nextFile) {
            
            nextFile = process.argv[counter];

            // ignore undefined, also ignore any commands
            if (nextFile != undefined ) {
                if (nextFile.slice(0,1) != '-') {
                    filesToCheck.push(nextFile);
                };
            };

            counter++;
        };

        var splitPath = process.argv[3].split('/');
        var fileName = splitPath[splitPath.length - 1];
    };



    if (!whichInput) {
        if (command[0] != '-') {
            fileName = command; 
        };
    };



    //help
    if (['-h', '--help'].includes(command)) {
        
                    // ansi escape code - bold
        console.log('\n\x1b[1mNAME\x1b[0m \n       Clone of Unix wc command - \n       wc - print newline, word, and byte counts for each file\n')

                    // ansi escape code - bold
        console.log('\x1b[1mSYNOPSIS\x1b[0m');
        console.log('       \x1b[1mwc\x1b[0m [OPTION]... [FILE]...\n');
        console.log('            TODO: Command Chaining')

        console.log('       -c, --bytes \n              print the byte counts\n');
        console.log('       -l, --lines \n              print the newline counts\n');
        console.log('       -w, --words \n              print the word counts\n');
        console.log('       -m, --chars \n              print the character counts\n');
        return;
    };



    const validCommands = new Set ([
        '-c', '--bytes',
        '-l', '--lines',
        '-w', '--words',
        '-m', '--chars',
    ]);



    // check if valid command
    if ( !(validCommands.has(command) || (filesToCheck && filesToCheck.includes(command))) && (command != undefined) && command != fileName) {
        console.log(`Invalid command: ${command}     Use -h for help.`);
    };



    // size
    if (['-c', '--bytes'].includes(command)) {

        function sizeFiles() {
            for (let i = 0; i < filesToCheck.length; i++) {

                fileName = filesToCheck[i];
                pathToFile = filesToCheck[i];      
                
                if (fileName.includes('/')) {
                    outputName = fileName.split('/');
                    outputName = outputName[outputName.length - 1]
                } else {
                    outputName = fileName;
                };

                console.log(`${sizeOf()} ${outputName}`);
            };
        };

        if (filesToCheck) {
            sizeFiles()
        } else {

            if (fileName.includes('/')) {
                outputName = fileName.split('/');
                outputName = outputName[outputName.length - 1]
            } else {
                outputName = fileName;
            };

            console.log(`${sizeOf()} ${outputName}`);
        };
        
    };


    // lines
    if (['-l', '--lines'].includes(command)) {

        function lineFiles() {
            for (let i = 0; i < filesToCheck.length; i++) {

                fileName = filesToCheck[i];
                pathToFile = filesToCheck[i];

                if (fileName.includes('/')) {
                    outputName = fileName.split('/');
                    outputName = outputName[outputName.length - 1]
                } else {
                    outputName = fileName;
                };

                console.log(`${numLines()} ${outputName}`);
            };
        };

        if (filesToCheck) {
            lineFiles()
        } else {

            if (fileName.includes('/')) {
                outputName = fileName.split('/');
                outputName = outputName[outputName.length - 1]
            } else {
                outputName = fileName;
            };

            console.log(`${numLines()} ${outputName}`);
        };

    };


    // words
    if (['-w', '--words'].includes(command)) {

        function wordFiles() {
            for (let i = 0; i < filesToCheck.length; i++) {

                fileName = filesToCheck[i];
                pathToFile = filesToCheck[i];

                if (fileName.includes('/')) {
                    outputName = fileName.split('/');
                    outputName = outputName[outputName.length - 1]
                } else {
                    outputName = fileName;
                };

                console.log(`${numWords()} ${outputName}`);
            };
        };

        if (filesToCheck) {
            wordFiles()
        } else {

            if (fileName.includes('/')) {
                outputName = fileName.split('/');
                outputName = outputName[outputName.length - 1]
            } else {
                outputName = fileName;
            };

            console.log(`${numWords()} ${outputName}`);
        };

    };


    // chars
    if (['-m', '--chars'].includes(command)) {

        function charFiles() {
            for (let i = 0; i < filesToCheck.length; i++) {

                fileName = filesToCheck[i];
                pathToFile = filesToCheck[i];

                if (fileName.includes('/')) {
                    outputName = fileName.split('/');
                    outputName = outputName[outputName.length - 1]
                } else {
                    outputName = fileName;
                };

                console.log(`${numChars()} ${outputName}`);
            };
        };

        if (filesToCheck) {
            charFiles()
        } else {

            if (fileName.includes('/')) {
                outputName = fileName.split('/');
                outputName = outputName[outputName.length - 1]
            } else {
                outputName = fileName;
            };

            console.log(`${numChars()} ${outputName}`);
        };

    };


    // default - 0 options provided - only filename
    if ( (command == fileName) || (whichInput && !command) ) {

        function defaultFiles() {
            for (let i = 0; i < filesToCheck.length; i++) {

                fileName = filesToCheck[i];
                pathToFile = filesToCheck[i];

                if (fileName.includes('/')) {
                    outputName = fileName.split('/');
                    outputName = outputName[outputName.length - 1]
                } else {
                    outputName = fileName;
                };

                outputFileName = ' ' + fileName;

                console.log(`${numLines().padStart(10, ' ')}${numWords().padStart(10, ' ')}${sizeOf().padStart(10, ' ')}${outputFileName}`);
            };
        };

        if (filesToCheck) {
            defaultFiles()
        } else {

            if (fileName.includes('/')) {
                outputName = fileName.split('/');
                outputName = outputName[outputName.length - 1]
            } else {
                outputName = fileName;
            };

            pathToFile = fileName;
            console.log(`${numLines().padStart(10, ' ')}${numWords().padStart(10, ' ')}${sizeOf().padStart(10, ' ')} ${outputName}`);
        };

    };    


    
    function sizeOf() {

        // if input is being piped
        if(whichInput) {

            var size = Buffer.byteLength(receivedData, 'utf8');

            sizeTotals.push(size);
            return `${size}`.padStart(10, ' ');

        } else {

            // if not piped input is a file
            try {

                var {size} = fs.statSync(pathToFile);

                sizeTotals.push(size);
                return `${size}`.padStart(10, ' ');

            } catch(err) {
                return `No such file or directory...`;
            };
        };

    };


    function numLines() {

        var lines = -1;

        if (whichInput) {

            try {
                const allFileContents = receivedData;

                allFileContents.split(/\r?\n/).forEach( line => {lines++;} );
                numLinesTotals.push(lines);
                return String(lines).padStart(10, ' ');

            } catch(err) {
                return `PROBLEMO in numLines()`;
            };

        } else {

            try {
                const allFileContents = fs.readFileSync(pathToFile, 'utf-8');

                allFileContents.split(/\r?\n/).forEach( line => {lines++;} );
                
                numLinesTotals.push(lines);
                return String(lines).padStart(10, ' ');

            } catch(err) {
                return `No such file or directory...`;
            };


        };

    };


    function numWords() {

        var wordCount = 0;

        if (whichInput) {

            try {
                const allFileContents = receivedData;

                allFileContents.split(/\r?\n/).forEach( line => {wordCount += line.trim().split(/\s+/).filter(el => el !== "").length;} );

            } catch(err) {
                return `PROBLEMO in numWords()`;
            };

        } else {

            try {
                const allFileContents = fs.readFileSync(pathToFile, 'utf-8');
                
                allFileContents.split(/\r?\n/).forEach( line => {wordCount += line.trim().split(/\s+/).filter(el => el !== "").length;} );

            } catch(err) {
                return `No such file or directory...`;
            };

        };

        numWordsTotals.push(wordCount);
        return `${wordCount}`.padStart(10, ' ');
    };


    function numChars() {

        var charCount = 0;

        if (whichInput) {

            try {
                charCount = receivedData.length;
            } catch(err) {
                return `No such file or directory...`;
            };
            
        } else {

            try {
                const allFileContents = fs.readFileSync(pathToFile, 'utf-8');

                charCount = allFileContents.length;

            } catch(err) {
                return `No such file or directory...`;
            };
            
        };

        numCharsTotals.push(charCount);
        return `${charCount}`.padStart(10, ' ');
    };



    // should only kick if there is a command but no file, otherwise use default 3 options
    if ((!pathToFile) && (command != fileName) && (!whichInput)) {

        console.log('Missing path to file... Use -h for help.');
        return;
    };



    // Multi-file totals

    const multiTotals = [];

    if (numLinesTotals.length > 1) {

        var combinedTotal = numLinesTotals.reduce((a, b) => {return a + b}, 0)
        multiTotals.push(combinedTotal);
    };
    
    
    if (numWordsTotals.length > 1) {
        
        var combinedTotal = numWordsTotals.reduce((a, b) => {return a + b}, 0)
        multiTotals.push(combinedTotal);
    };
    
    
    if (numCharsTotals.length > 1) {
      
        var combinedTotal = numCharsTotals.reduce((a, b) => {return a + b}, 0)
        multiTotals.push(combinedTotal);
    };

    if (sizeTotals.length > 1) {
      
        var combinedTotal = sizeTotals.reduce((a, b) => {return a + b}, 0)
        multiTotals.push(combinedTotal);
    };


    // format totals
    var totalOutput = '';

    for (i = 0; i < multiTotals.length; i++) {

        var padTotal = String(multiTotals[i]).padStart(10, ' ');

        totalOutput += `${padTotal}`.padStart(10, ' '); 
    };
    
    if (totalOutput) {
        totalOutput += ' total';
    };

    if (totalOutput) {
        console.log(totalOutput);
    };
};



// stdin handling below vvv
var whichInput = null;
var stdin = process.stdin;
let receivedData = '';

if (stdin.setRawMode) {
    
    // No data is being piped, so fall back to your existing code
    whichInput = false;

    wc();

} else {

    whichInput = true;

    // resume stdin in the parent process (node app won't quit all by itself
    stdin.resume();

    stdin.on('data', (data) => {
        receivedData += data;
    });

    stdin.on('end', () => {
        wc();
    });

};