/**
 * Tries to upload an application file to database
 *
 * @param applicationID
 * @param type
 * @param file
 * @returns status and response message
 */
export async function uploadApplicationFile(
    userID,
    type,
    file
  ) {
    let url = await storeApplicationFile(userID, type, file);
    console.log("File upload finished.");
    if (url === null) {
      return [404, { msg: "File storage failed." }];
    } else {
      return [200, url];
    }
  }
  
  /**
   * Tries to retrieve last application associated with specified user
   *
   * @param userID
   * @returns status and res message
   */
  export async function getLastApplication(userID) {
    let application: Application = await retrieveLastApplication(userID);
  
    if (application !== null) {
      return [200, application];
    } else {
      return [404, { msg: "Application not found" }];
    }
  }