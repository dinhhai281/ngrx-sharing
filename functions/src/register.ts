import * as cors from 'cors';
import * as express from 'express';
import admin = require('firebase-admin');

import { RegisterDTO, User } from './models';

const registerApp = express();
registerApp.use(cors({ origin: true }));

registerApp.post('/', async (req, res) => {
  const registerDto = req.body as RegisterDTO;
  try {
    const writeResult = await admin.firestore().collection('users').add(registerDto);
    const snapshot = await writeResult.get();
    return res.status(201).json({
      result: {
        email: snapshot.get('email'),
        token: snapshot.id,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: 'Something went wrong' });
  }
});

registerApp.post('/login', async (req, res) => {
  const user = req.body as User;
  try {
    const snapshot = await admin
      .firestore()
      .collection('users')
      .where('email', '==', user.email)
      .limit(1)
      .get();
    if (snapshot.empty) {
      return res.status(400).json({ result: null, message: 'user not found' });
    }

    const doc = snapshot.docs[0];

    return doc.get('password') === user.password
      ? res.status(200).json({
          result: {
            email: doc.get('email'),
            token: doc.id,
          },
        })
      : res.status(401).json({
          result: null,
          message: 'Unauthenticated',
        });
  } catch (err) {
    return res.status(400).json({ error: 'Something went wrong' });
  }
});

export { registerApp };
