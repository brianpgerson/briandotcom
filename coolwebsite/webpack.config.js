module.exports = {
    entry: "./frontend/entry.js",
    output: {
        path: __dirname + '/app/assets/javascripts',
        filename: "bundle.js"
    },
    module: {
        loaders: [
        ]
    }
};
