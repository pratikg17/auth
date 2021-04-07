import request from 'supertest';
import { app } from '../../app';

it('it fails when a email that doesnt not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('it fails when a incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'elon@tesla.com',
      password: 'passwor',
    })
    .expect(400);
});

it('it passes when a  proper credentials is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'elon@tesla.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'elon@tesla.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
