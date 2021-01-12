import _ from 'underscore';
import Messages from '../../../../network/messages';
import Packets from '../../../../network/packets';
import Npcs from '../../../../util/npcs';

export default class Handler {
  constructor(player) {
    this.player = player;
    this.world = player.world;
    this.load();
  }

  load() {
    this.player.onMovement((x, y) => {
      this.player.checkGroups();
      this.detectAggro();
      this.detectPVP(x, y);
      this.detectMusic(x, y);
    });

    this.player.onDeath(() => {});
    this.player.onHit((attacker) => {
      /**
       * Handles actions whenever the player
       * instance is hit by 'damage' amount
       */

      if (this.player.combat.isRetaliating()) {
        this.player.combat.begin(attacker);
      }
    });

    this.player.onKill((character) => {
      if (this.player.quests.isAchievementMob(character)) {
        const achievement = this.player.quests.getAchievementByMob(character);

        if (achievement && achievement.isStarted()) {
          this.player.quests.getAchievementByMob(character).step();
        }
      }
    });

    this.player.onGroup(() => {
      this.world.handleEntityGroup(this.player);
      this.world.pushEntities(this.player);
    });

    this.player.connection.onClose(() => {
      this.player.stopHealing();

      this.world.removePlayer(this.player);
    });

    this.player.onTalkToNPC((npc) => {
      if (this.player.quests.isQuestNPC(npc)) {
        this.player.quests.getQuestByNPC(npc).triggerTalk(npc);

        return;
      }

      if (this.player.quests.isAchievementNPC(npc)) {
        this.player.quests.getAchievementByNPC(npc).converse(npc);

        return;
      }

      switch (Npcs.getType(npc.id)) {
        default:
          break;
        case 'banker':
          this.player.send(new Messages.NPC(Packets.NPCOpcode.Bank, {}));
          return;

        case 'echanter':
          this.player.send(new Messages.NPC(Packets.NPCOpcode.Enchant, {}));
          break;
      }

      const text = Npcs.getText(npc.id);

      if (!text) {
        return;
      }

      npc.talk(text);

      this.player.send(
        new Messages.NPC(Packets.NPCOpcode.Talk, {
          id: npc.instance,
          text,
        }),
      );
    });
  }

  detectAggro() {
    const group = this.world.groups[this.player.group];

    if (!group) {
      return;
    }

    _.each(group.entities, (entity) => {
      if (entity && entity.type === 'mob') {
        const aggro = entity.canAggro(this.player);

        if (aggro) {
          entity.combat.begin(this.player);
        }
      }
    });
  }

  detectMusic(x, y) {
    const musicArea = _.find(this.world.getMusicAreas(), area => area.contains(x, y));
    if (musicArea && this.player.currentSong !== musicArea.id) {
      this.player.updateMusic(musicArea.id);
    }
  }

  detectPVP(x, y) {
    const pvpArea = _.find(this.world.getPVPAreas(), area => area.contains(x, y));

    this.player.updatePVP(!!pvpArea);
  }
}
