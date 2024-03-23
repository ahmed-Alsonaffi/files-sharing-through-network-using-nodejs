const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '..', 'files');

exports.getFiles = (req, res, next) => {
    fs.readdir(directoryPath, (err, files) => {
        console.log(files);
        fileList = files.map(file =>{
            const filePath = path.join(directoryPath, file);
            const stats = fs.statSync(filePath);
            const fileSize = Math.ceil(stats.size/(1024*1024));

            return {file: file, size: fileSize}
        })
        console.log(fileList)
        res.render('main', {
            files: fileList
        });
    })

}

exports.getFile = (req, res, next) => {
    const filePath = path.join(__dirname, '..', decodeURIComponent(req.url));
    console.log(filePath)
    fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
            console.error('Error accessing file:', err);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }

        const fileName = path.basename(filePath);
        
        fs.stat(filePath, (err, stats) => {
            if (err) {
              console.error('Error getting file stats:', err);
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Internal Server Error');
              return;
            }
      
            const fileSize = stats.size;
      
            const fileStream = fs.createReadStream(filePath);
      
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Length', fileSize);
      
            fileStream.pipe(res);
          });
      
    });
};