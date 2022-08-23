import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coworker from 'App/Models/Coworker';

export default class CoworkersController {
  public async store({ request, response }: HttpContextContract) {
    const coworkerData = request.body();
    const results = await Coworker.create(coworkerData);

    response.status(201);
    return results;
  }

  public async index() {
    const results = await Coworker.all();

    return results;
  }
}
