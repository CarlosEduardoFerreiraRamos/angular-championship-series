import { Injectable } from '@angular/core';
import { Team, Match, Playoffs, Group, ScoreDTO } from 'src/app/models/marches';

export const TEAMS = [
  {
      id: 1,
      name: 'Sirius',
      group: 'A'
  },
  {
      id: 2,
      name: 'Betelgeuse',
      group: 'A'
  },
  {
      id: 3,
      name: 'Rigel',
      group: 'A'
  },
  {
      id: 4,
      name: 'Vega',
      group: 'A'
  },
  {
      id: 5,
      name: 'Canopos',
      group: 'B'
  },
  {
      id: 6,
      name: 'Altair',
      group: 'B'
  },
  {
      id: 7,
      name: 'Deneb',
      group: 'B'
  },
  {
      id: 8,
      name: 'Arcturo',
      group: 'B'
  }
];


@Injectable()
export class BackEndService {

  teams: Team[] = [];

  matchs: Match[] = [];

  constructor() {
    this.initTeamsAndMatchs();
  }

  public getMatchList(): Match[] {
    return [...this.matchs].reverse();
  }

  public getTeamListByGroup(group: Group): Team[] {
    return this.teams
      .filter( team => team.group === group)
      .sort( ({points: a}, {points: b}) => a >= b ? -1 : 1);
  }

  public getTeamListFirst(): Team[] {
    const [ first, second, thirth] =  this.teams
    .sort( ({points: a}, {points: b}) => a >= b ? -1 : 1);

    return [first, second, thirth];
  }

  public getTeamList(): Team[] {
    return this.teams;
  }

  public getNextMatch(): Match {
    return this.matchs.find( m => !m.played);
  }

  public getPreviousMatch(): Match {
    return this.matchs.find( m => m.played);
  }

  public setMatchScore(score: ScoreDTO) {
    const match = this.getMatch(score.matchId);
    const name = score.first > score.second ? match.teams[0].name : match.teams[1].name;
    match.score = [score.first, score.second];
    const team = this.setWinner(name);
    this.progressWinner(team);
  }

  public getFilteredMatchList(queryParamns: string): Match[] {
    const filters = this.extractQueryParamns(queryParamns);
    return [...this.matchs]
      .filter( (match: Match) => {
        let isSimilar = true;
        if (filters['team']) {
          isSimilar = match.teams
            .map( t => t.name.toLowerCase() )
            .reduce( (has, name) =>
              has ? has : name.toLowerCase().includes(filters['team'].toLowerCase())
            , false);
        }
        if (filters['dateBefore']) {
          isSimilar = isSimilar && match.date >= new Date(filters['dateBefore']);
        }
        if (filters['dateAfter']) {
          const after = new Date(filters['dateAfter']);
          after.setHours(23, 59, 59);
          isSimilar = isSimilar && match.date <= after;
        }
        return isSimilar;
      });
  }

  private progressWinner(team: Team) {
    if (team.type === Playoffs.FINALS) {
      return;
    }

    const types = Object.keys(Playoffs);
    const number = types.indexOf(team.type);
    const newStage = types[number + 1];
    team.type = Playoffs[newStage];
    let match = this.validMatchs
      .reverse()
      .find( ({type, teams}) =>
        teams.length === 1 &&
        (teams[0].group === team.group || type === Playoffs.FINALS) &&
        (type === team.type || type === Playoffs.SEMI_FINALS)
      );

    if (!match) {
      match = new Match();
      match.type = team.type;
      match.teams = [team];
      match.id = this.matchs.length + 1;
      this.matchs.push(match);
    } else {
      match.teams.push(team);
    }

    match.played = false;
    const date = new Date();
    date.setDate(match.id);
    match.date = date;
    return team;
  }

  private setWinner(name: string): Team {
    const match = this.validMatchs
      .reverse()
      .find( ({teams}) => teams.map( ({name: n}) => n).includes(name));
    const winner = this.teams.find( ({name: n}) => n === name);
    winner.points += 100;
    match.winner = winner;
    match.played = true;

    this.setTeamOut(match.teams.find(({name: n}) => winner.name === n));

    return winner;
  }

  private initTeamsAndMatchs(): void {
    this.teams = TEAMS.map( t => this.progressWinner(new Team(t)));
  }

  private setTeamOut(team: Team): void {
    team.out = true;
  }

  private getMatch(matchId: number): Match {
    return this.matchs.find( ({id}) => matchId === id);
  }

  private get validMatchs(): Match[] {
    return this.matchs.filter( ({played}) => !played );
  }

  private extractQueryParamns(aqueryParamns: string): any {
    return aqueryParamns.split('&').reduce( (paramns, keyValue) => {
      const [ key, value] = keyValue.split('=');
      return {...paramns, [key]: value };
    }, {});
  }

}
