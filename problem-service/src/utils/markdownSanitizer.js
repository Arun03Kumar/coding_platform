const TurndownService = require("turndown");
const marked = require("marked");
const sanitizedHtmlLibrary = require("sanitize-html");

function sanitizeMarkdownContent(markdownContent) {
    console.log(markdownContent);
  const turndownService = new TurndownService();
  const convertedHtml = marked.parse(markdownContent);
  console.log(convertedHtml);
  const sanitizedHtml = sanitizedHtmlLibrary(convertedHtml, {
    allowedTags: sanitizedHtmlLibrary.defaults.allowedTags.concat(["img"]),
  });
  console.log(sanitizedHtml);
  const sanitizeMarkdown = turndownService.turndown(sanitizedHtml);
  console.log(sanitizeMarkdown);
  return sanitizeMarkdown;
}

module.exports = sanitizeMarkdownContent;
