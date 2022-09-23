'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }

  async create(json) {
    try {
      let record = await this.model.create(json);
      return record;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async update(data, id){
    try {
      await this.model.update(data, {where: {id}});
      let record = await this.model.findOne({where: {id}});
      return record;
    } catch (err){
      console.error('you have an error:', err);
      return err;
    }
  }

  async read(id = null){
    try {
      let record;
      if (id){
        record = await this.model.findOne({where: {id}});
      } else {
        record = await this.model.findAll();
      }
      return record;
    } catch(err){
      console.error('you have an error:', err);
      return err;
    }
  }

  async readManyToOne(id, model){
    try {
      let record = await this.model.findOne({where: {id}, include: model});
      return record;
    }catch (err){
      console.error('you have an error:', err);
      return err;
    }
  }

  async readWithRelations(query){
    try {
      let record = await this.model.findOne(query);
      return record;
    } catch(err){
      console.error(err);
      return err;
    }
  }

}



module.exports = Collection;
