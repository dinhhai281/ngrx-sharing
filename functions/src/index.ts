import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { registerApp } from './register';
import { collectionApp } from './collection';

admin.initializeApp();

export const register = functions.https.onRequest(registerApp);
export const collections = functions.https.onRequest(collectionApp);

export const addMessage = functions.https.onRequest(async (req, res) => {
  const original = req.query.text;
  const writeResult = await admin.firestore().collection('messages').add({ original: original });
  res.json({ result: `Message with ID: ${writeResult.id}` });
});

export const makeUppercase = functions.firestore
  .document('/messages/{documentId}')
  .onCreate((snap, context) => {
    const original = snap.data().original;

    functions.logger.log('Uppercasing', context.params.documentId, original);

    const uppercase = original.toUpperCase();

    return snap.ref.set({ uppercase }, { merge: true });
  });
