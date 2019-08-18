# Angular Star Championship Series

This project is a team management application that allows the user to set the score of upcoming matches in a fictional football tournament.

## Build & run

Download the project from this it's git repository.
Install its dependencies with `npm i` at the project root folder.
Run `ng serve` for a dev server, or npm start, them navigate to `http://localhost:4200/`.

## Structure

The application is divided in three main pages:
* matches, where is displayed all the currently matches and can be set matche score;
* standings, where is displayed all the currently teams and points;
* and home, that serves as an intro page and tournament summary.

## Data e storage

The application only user in memory data. If the browser refresh all data is lost but it's persists through page navigation.

## Tests

The application posses a number of unit tests applied in main components and pages, displayed bellow:
* pages: [matches](https://github.com/CarlosEduardoFerreiraRamos/angular-championship-series/blob/master/src/app/pages/matches/matches.component.spec.ts) and [standings](https://github.com/CarlosEduardoFerreiraRamos/angular-championship-series/blob/master/src/app/pages/standings/standings.component.spec.ts);
* components: [list](https://github.com/CarlosEduardoFerreiraRamos/angular-championship-series/blob/master/src/app/components/list/list.component.ts) and [modal](https://github.com/CarlosEduardoFerreiraRamos/angular-championship-series/blob/master/src/app/components/modal/modal.component.spec.ts);
* services: [match service](https://github.com/CarlosEduardoFerreiraRamos/angular-championship-series/blob/master/src/app/services/match-service/match.service.spec.ts);
* and navigation tests in the [app component](https://github.com/CarlosEduardoFerreiraRamos/angular-championship-series/blob/master/src/app/app.component.spec.ts). 


## Mock back end

There is a number of classes that are used to create a mock back end. The first is HttpIntercetor service, and the other is just a service the simulates a back end web layer.