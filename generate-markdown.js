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
    const countries = JSON.parse(core.getInput('countries'));
    const fileName = core.getInput('file-name');

    // Generate Markdown content
    const markdownContent = generateMarkdown(countries);

    // Create Markdown file
    createMarkdownFile(markdownContent, fileName);
} catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
}
