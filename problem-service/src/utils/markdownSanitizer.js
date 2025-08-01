const TurndownService = require("turndown");
const marked = require("marked");
const sanitizedHtmlLibrary = require("sanitize-html");

function sanitizeMarkdownContent(markdownContent) {
  const turndownService = new TurndownService();
  const convertedHtml = marked.parse(markdownContent);
  const sanitizedHtml = sanitizedHtmlLibrary(convertedHtml, {
    allowedTags: sanitizedHtmlLibrary.defaults.allowedTags,
  });
  const sanitizeMarkdown = turndownService.turndown(sanitizedHtml);
  return sanitizeMarkdown;
}

module.exports = sanitizeMarkdownContent;
