var replace = require("replace");

/**
 * The following is a HOT Fix for:
 * Webpacks ExtractTextPlugin outputs 
 * absolute urls instead of relarive
 */
replace({
    regex: "/assets",
    replacement: "assets",
    paths: ['build/style.css'],
    recursive: true,
    silent: true,
});