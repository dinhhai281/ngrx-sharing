import * as cors from 'cors';
import * as express from 'express';
import admin = require('firebase-admin');

import { Collection } from './models';

const collectionApp = express();
collectionApp.use(cors({ origin: true }));

collectionApp.get('/', async (req, res) => {
  const userId = req.query.userId as string;
  if (userId) {
    const userCollectionsSnapshot = await admin
      .firestore()
      .collection('collections')
      .where('userId', '==', userId)
      .get();

    return res.status(200).json({
      result: userCollectionsSnapshot.docs.map(
        doc =>
          ({
            id: doc.id,
            name: doc.get('name'),
            posts: doc.get('posts'),
            userId: doc.get('userId'),
          } as Collection),
      ),
    });
  }
  const snapshot = await admin.firestore().collection('collections').get();

  return res.status(200).json({
    result: snapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          name: doc.get('name'),
          posts: doc.get('posts'),
          userId: doc.get('userId'),
        } as Collection),
    ),
  });
});

collectionApp.post('/', async (req, res) => {
  const collection = req.body as Collection;

  try {
    const writeResult = await admin.firestore().collection('collections').add(collection);
    const snapshot = await writeResult.get();
    return res.status(201).json({
      result: {
        id: snapshot.id,
        name: snapshot.get('name'),
        userId: snapshot.get('userId'),
        posts: snapshot.get('posts'),
      } as Collection,
    });
  } catch (err) {
    return res.status(400).json({ error: 'Something went wrong' });
  }
});

collectionApp.put('/:id', async (req, res) => {
  const collectionId = req.params.id;
  const collection = req.body as Collection;
  try {
    const writeResult = await admin
      .firestore()
      .collection('collections')
      .doc(collectionId)
      .update(collection);

    const snapshot = await admin.firestore().collection('collections').doc(collectionId).get();
    return res.status(200).json({
      result: {
        id: snapshot.id,
        name: snapshot.get('name'),
        userId: snapshot.get('userId'),
        posts: snapshot.get('posts'),
      } as Collection,
      writeTime: writeResult.writeTime,
    });
  } catch (err) {
    return res.status(404).json({ result: null, message: 'Collection not found' });
  }
});

export { collectionApp };
