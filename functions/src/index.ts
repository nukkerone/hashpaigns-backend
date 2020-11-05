import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// Environment config: https://medium.com/firelayer/deploying-environment-variables-with-firebase-cloud-functions-680779413484
import { config } from './config';

admin.initializeApp();

const db = admin.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase! " + config.sendgrid.api_key);
});

export const documentWriteListener =
  functions.firestore.document('group_users/{group_id}/users/{user_id}')
    .onWrite(async (change, context) => {

      functions.logger.info("Writing: group_users/{group_id}/users/{user_id}", { structuredData: true });

      if (!change.before.exists) {
        // New document Created : add one to count

        await db.doc('groups/' + context.params.group_id).update({number_of_users: admin.firestore.FieldValue.increment(1)});

      } else if (change.before.exists && change.after.exists) {
        // Updating existing document : Do nothing

      } else if (!change.after.exists) {
        // Deleting document : subtract one from count

        await db.doc('groups/' + context.params.group_id).update({number_of_users: admin.firestore.FieldValue.increment(-1)});

      }

      return;
    });