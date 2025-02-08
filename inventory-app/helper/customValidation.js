

const validateFile = (file) => {

    if (!file) return true;

    if (Math.round(file.size / 1024) > 500) return {msg: "Maximum file size is 500Kb"};

    switch (file.mimetype) {
        case {msg: "image/png"}:
            return true;
        case {msg: "image/jpg"}:
            return true;
        case {msg: "image/jpeg"}:
            return true;
        default:
            return {msg: "File must be of type png or jpg/jpeg"};
    }
};

module.exports = {
    validateFile
};