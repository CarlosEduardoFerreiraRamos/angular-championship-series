import { Injectable } from '@angular/core';
import { Team, Match, Playoffs } from 'src/app/models/marches';

export const TEAMS = [
  {
      id: 1,
      name: 'Sirius',
  },
  {
      id: 2,
      name: 'Betelgeuse',
  },
  {
      id: 3,
      name: 'Rigel',
  },
  {
      id: 4,
      name: 'Vega',
  },
  {
      id: 5,
      name: 'Canopos',
  },
  {
      id: 6,
      name: 'Altair',
  },
  {
      id: 7,
      name: 'Deneb',
  },
  {
      id: 8,
      name: 'Arcturo',
  }
];


@Injectable()
export class BackEndService {

  teams: Team[] = [];

  matchs: Match[] = [];

  constructor() {
    this.initTeams();
  }

  getMatchList(): Match[] {
    return [...this.matchs].reverse();
  }

  getTeamList(): Team[] {
    return this.teams;
  }

  setMatchWinner(name) {
    const team = this.setWinner(name);
    this.progressWinner(team);
  }

  private progressWinner(team) {
    if (team.type === Playoffs.FINALS) {
      return;
    }

    const types = Object.keys(Playoffs);
    const number = types.indexOf(team.type);
    const newStage = types[number + 1];
    team.type = Playoffs[newStage];
    let match = this.validMatchs
      .reverse()
      .find( ({type, teams}) => teams.length === 1 && (type === team.type || type === Playoffs.SEMI_FINALS));

    if (!match) {
      match = new Match();
      match.type = team.type;
      match.teams = [team];
      this.matchs.push(match);
    } else {
      match.teams.push(team);
    }

    match.id = this.matchs.length + 1;
    match.played = false;
    match.date = new Date();
    return team;
  }

  private setWinner(name: string): Team {
    const match = this.validMatchs
      .reverse()
      .find( ({teams}) => teams.map( ({name: n}) => n).includes(name));
    const winner = this.teams.find( ({name: n}) => n === name);
    match.winner = winner;
    match.played = true;

    this.setTeamOut(match.teams.find(({name: n}) => winner.name === n));

    return winner;
  }

  private initTeams(): void {
    this.teams = TEAMS.map( t => this.progressWinner(new Team(t)));
  }

  private setTeamOut(team: Team): void {
    team.out = true;
  }

  private get validMatchs(): Match[] {
    return this.matchs.filter( ({played}) => !played );
  }

}
