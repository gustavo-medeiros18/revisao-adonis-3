import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coworker from 'App/Models/Coworker';
import Application from '@ioc:Adonis/Core/Application';
import { v4 as uuidv4 } from 'uuid';

export default class CoworkersController {
  private validationOptions = {
    size: '10mb',
    extnames: ['jpg', 'png', 'jpeg']
  };

  public async store({ request, response }: HttpContextContract) {
    const coworkerData = request.body();
    const image = request.file('image', this.validationOptions);

    if (image) {
      const storedImageName = `${uuidv4()}.${image.extname}`;

      await image.move(Application.tmpPath('uploads'), {
        name: storedImageName,
        overwrite: false
      })

      coworkerData.image = storedImageName;
    }

    const results = await Coworker.create(coworkerData);

    response.status(201);
    return results;
  }

  public async index() {
    const results = await Coworker.all();

    return results;
  }

  public async show({ params }: HttpContextContract) {
    const results = await Coworker.findOrFail(params.id);

    return results;
  }

  public async update({ request, params }: HttpContextContract) {
    const existentCoworker = await Coworker.findOrFail(params.id);
    const newCoworkerData = request.body();

    existentCoworker.name = newCoworkerData.name;
    existentCoworker.age = newCoworkerData.age;
    existentCoworker.originCity = newCoworkerData.originCity;

    const results = await existentCoworker.save();
    return results;
  }

  public async destroy({ params }: HttpContextContract) {
    const existentCoworker = await Coworker.findOrFail(params.id);
    const results = await existentCoworker.delete();

    return results;
  }
}
