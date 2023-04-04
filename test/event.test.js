process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = require('chai');
const faker = require('faker');
const { createEvent, deleteEvents } = require('../src/events/events.service');
const server = require('../src/app');
const _p = require('../src/helpers/asyncWrapper');

chai.use(chaiHttp);

const createEventForTest = async (eventData) => {
  const [err, newEvent] = await _p(createEvent(eventData));
  if (err) console.error('Create event err', err);
  return newEvent;
};

describe('Event test suite', () => {
  beforeEach(async () => {
    await Promise.all([deleteEvents()]);
  });

  it('should create an event', async () => {
    const eventData = {
      name: faker.lorem.words(),
      location: faker.address.city(),
      date: faker.date.future(),
    };

    const [err, res] = await _p(chai.request(server).post('/v1/events').send(eventData));
    const event = res.body.data;
    if (err) console.error('Create test err', err);

    assert.equal(res.status, 201, 'status  code should be 201');
    assert.equal(event.name, eventData.name, 'event name should match');
    assert.equal(event.location, eventData.location, 'event location should match');
    assert.exists(event.date, 'event date should exist');
  });

  it('should get all events with pagination', async () => {
    const eventData = {
      name: faker.lorem.words(),
      location: faker.address.city(),
      date: faker.date.future(),
    };
    for (let i = 0; i < 10; i++) {
      await createEventForTest(eventData);
    }

    const [err, res] = await _p(chai.request(server).get('/v1/events?pageNumber=1&pageSize=5'));
    if (err) console.error('Get all test err', err);
    const events = res.body.data;

    assert.equal(res.status, 200, 'status code should be 200');
    assert.equal(events.length, 5, 'events length should be 5');
    assert.exists(events[0].name, 'event name should exist');
    assert.exists(events[0].location, 'event location should exist');
    assert.exists(events[0].date, 'event date should exist');
  });

  it('should get an event with id', async () => {
    const eventData = {
      name: faker.lorem.words(),
      location: faker.address.city(),
      date: faker.date.future(),
    };

    const newEvent = await createEventForTest(eventData);
    const [err, res] = await _p(chai.request(server).get(`/v1/events/${newEvent.id}`));
    if (err) console.error('Get test err', err);
    const event = res.body.data;

    assert.equal(res.status, 200);
    assert.isObject(event, 'event should be an object');
    assert.equal(event.name, eventData.name, 'event name should match');
    assert.equal(event.location, eventData.location, 'event location should match');
    assert.exists(event.date, 'event date should exist');
  });

  it('should update an event with id', async () => {
    const eventData = {
      name: faker.lorem.words(),
      location: faker.address.city(),
      date: faker.date.future(),
    };

    const newEvent = await createEventForTest(eventData);
    const [err, res] = await _p(chai.request(server).get(`/v1/events/${newEvent.id}`));
    if (err) console.error('Update test err', err);
    const event = res.body.data;

    assert.equal(res.status, 200, 'status code should be 200');
    assert.isObject(event, 'event should be an object');
    assert.equal(event.name, eventData.name, 'event name should match');
    assert.equal(event.location, eventData.location, 'event location should match');
    assert.exists(event.date, 'event date should exist');
  });

  it('should delete an event with id', async () => {
    const eventData = {
      name: faker.lorem.words(),
      location: faker.address.city(),
      date: faker.date.future(),
    };
    const newEvent = await createEventForTest(eventData);
    const [err, res] = await _p(chai.request(server).delete(`/v1/events/${newEvent.id}`));
    if (err) console.error('Delete test err', err);
    const event = res.body.data;

    assert.equal(res.status, 200, 'status code should be 200');
    assert.equal(event, true, 'event should be deleted');
  });

  afterEach(async () => {
    await Promise.all([deleteEvents()]);
  });
});
