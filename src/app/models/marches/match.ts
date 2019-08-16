export enum Group {
  A = 'A',
  B = 'B'
}

export enum Playoffs {
  QUARTER_FINALS = 'QUARTER_FINALS',
  SEMI_FINALS = 'SEMI_FINALS',
  FINALS = 'FINALS'
}

export class Match {
  id: number;
  teams: Team[];
  winner: Team;
  played: boolean;
  type: Playoffs;
  date: Date;
}

export class Team {
  id: number;
  name: string;
  group: Group;
  out: boolean;
  type: Playoffs;
  constructor(data?: any) {
    if (!data) {
      return;
    }
    this.id = data.id;
    this.name = data.name;
    this.group = data.group;
    this.type = data.type;
    this.out = false;
  }
}
