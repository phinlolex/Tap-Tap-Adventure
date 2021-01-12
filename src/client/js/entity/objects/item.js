import Entity from '../entity';

export default class Item extends Entity {
  constructor(id, kind, name, count, ability, abilityLevel) {
    super(id, kind, name);

    this.count = count;
    this.ability = ability;
    this.abilityLevel = abilityLevel;

    this.dropped = false;
    this.stackable = false;

    this.type = 'item';
    this.shadow = true;
  }

  idle() {
    this.setAnimation('idle', 150);
  }

  hasShadow() {
    return this.shadow;
  }
}
