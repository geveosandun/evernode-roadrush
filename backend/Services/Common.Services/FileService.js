const fs = require('fs');

export class FileService {
    // Method to write content to a file
    static writeFile(filePath, content, contentType = null) {
        try {
            if (contentType)
                fs.writeFileSync(filePath, content);
            else
                fs.writeFileSync(filePath, content);

        } catch (e) {
            console.log(e)
        }
    }

    // Method to read content from a file
    static readFile(filePath) {
        return fs.readFileSync(filePath, 'utf-8');
    }

    static changeMode(filePath, mode) {
        fs.chmodSync(filePath, mode);
    }
}