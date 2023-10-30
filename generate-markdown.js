const core = require('@actions/core');
const fs = require('fs');

function generateMarkdown(countries) {
    let markdownContent = '';
    countries.forEach(country => {
        markdownContent += `## ${country.name}\n\n`;
        markdownContent += `* ${country.states.join('\n* ')}\n\n`;
    });
    return markdownContent;
}

function createMarkdownFile(markdownContent, fileName) {
    fs.writeFileSync(fileName, markdownContent);
    core.info(`Markdown file '${fileName}' created successfully.`);
    core.setOutput('markdown-file', fileName);
}

try {
    // Get input parameters from GitHub Actions
    const countries = '[{"name": "Country1", "states": ["State1", "State2"]}, {"name": "Country2", "states": ["State3", "State4"]}]';
    const fileName = 'countries.md';
    //core.getInput('file-name');

    // Generate Markdown content
    const markdownContent = generateMarkdown(countries);

    // Create Markdown file
    createMarkdownFile(markdownContent, fileName);
} catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
}
