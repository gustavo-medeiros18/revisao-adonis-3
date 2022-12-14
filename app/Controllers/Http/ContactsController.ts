import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contact from 'App/Models/Contact';
import Coworker from 'App/Models/Coworker';

export default class ContactsController {
  public async store({ request, response, params }: HttpContextContract) {
    const coworkerId = params.id;
    await Coworker.findOrFail(coworkerId);

    const contactData = request.body();
    contactData.coworkerId = coworkerId;

    const results = Contact.create(contactData);
    response.status(201);

    return results;
  }

  public async index({ params }: HttpContextContract) {
    const coworkerId = params.id;
    await Coworker.findOrFail(coworkerId);

    const results = await Contact.query().where('coworker_id', coworkerId);

    return results;
  }

  public async show({ params }: HttpContextContract) {
    const coworkerId = params.id;
    await Coworker.findOrFail(coworkerId);

    const contactId = params.contactId;
    const results = await Contact.findOrFail(contactId);

    return results;
  }

  public async update({ request, params }) {
    const coworkerId = params.id;
    await Coworker.findOrFail(coworkerId);

    const contactId = params.contactId;
    const existentContact = await Contact.findOrFail(contactId);
    const newContactData = request.body();

    existentContact.phoneNumber = newContactData.phoneNumber;

    const results = await existentContact.save();

    return results;
  }

  public async delete({ params }) {
    const coworkerId = params.id;
    await Coworker.findOrFail(coworkerId);

    const contactId = params.contactId;
    const existentContact = await Contact.findOrFail(contactId);

    const results = await existentContact.delete();

    return results;
  }
}
