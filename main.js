const fs = require('fs');

try {
    const rawData = fs.readFileSync('data.json', 'utf8');
    const jsonData = JSON.parse(rawData);

    if (!Array.isArray(jsonData)) {
        throw new Error('Data is not an array.');
    }

    const filteredValues = jsonData
        .filter(entry => {
            const ku = parseFloat(entry.ku);
            const value = parseFloat(entry.value);
            return !isNaN(ku) && !isNaN(value) && ku === 13 && value > 5;
        })
        .map(entry => entry.value);

    if (filteredValues.length > 0) {
        const outputFilename = 'output.txt';
        fs.writeFileSync(outputFilename, filteredValues.join('\n'), 'utf8');
    } else {
        console.log('No matching entries found.');
    }
} catch (error) {
    console.error('An error occurred:', error.message);
}
