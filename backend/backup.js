const { exec } = require("child_process");
const mongoose = require("mongoose");

function performBackup(user) {
    if (user) {
        // console.log("User Information:", user);

        if (user.isBackupEnabled) {
            const backupFolder = "C:\\Users\\moham\\OneDrive\\Desktop\\backups";
            const timestamp = new Date().toISOString().replace(/[-:]/g, "");
            const mongoURI = "mongodb://127.0.0.1:27017/SE-Project";

            const mongodumpCommand = `"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongodump" --uri=${mongoURI} --out=${backupFolder}/${timestamp} --db=SE-Project`;

            exec(mongodumpCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error during backup: ${error.message}`);
                    // You might want to handle this error appropriately
                } else {
                    console.log(`Backup successful: ${stdout}`);
                    // You can log or handle success here
                }
            });
        } else {
            console.log("Backup not initiated. User backup is not enabled.");
        }
    } else {
        console.log("Backup not initiated. User not logged in.");
    }
}

module.exports = performBackup;
