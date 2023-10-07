const fs = require('fs');

// Зчитуємо JSON дані з файлу
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Помилка читання файлу data.json:', err);
        return;
    }

    try {
        const jsonData = JSON.parse(data);

        // Фільтруємо дані за умовами: ku === 13 і індекс більший за 5
        const filteredData = jsonData.filter(entry => entry.ku === 13 && parseFloat(entry.value) > 5);

        // Створюємо рядок з відфільтрованими значеннями і записуємо його у файл output.txt
        const outputText = filteredData.map(entry => parseFloat(entry.value).toFixed(1)).join('\n');

        fs.writeFile('output.txt', outputText, 'utf8', err => {
            if (err) {
                console.error('Помилка запису у файл output.txt:', err);
            } else {
                console.log('Результати збережено у файл output.txt');
            }
        });
    } catch (jsonError) {
        console.error('Помилка обробки JSON:', jsonError);
    }
});
