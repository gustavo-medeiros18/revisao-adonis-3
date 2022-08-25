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
}
