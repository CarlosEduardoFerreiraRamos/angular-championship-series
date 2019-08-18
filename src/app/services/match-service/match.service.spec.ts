import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { MatchService } from './match.service';
import { Match } from 'src/app/models/marches';
import { environment } from 'src/environments/environment.prod';

fdescribe('MatchService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [MatchService]
  }));


  it('should be created service', inject([MatchService], (service: MatchService) => {
    expect(service).toBeTruthy();
  }));

  it('should request', async(inject([MatchService], (service: MatchService) => {
    const http: HttpTestingController = TestBed.get(HttpTestingController);

    const mat = new Match();
    mat.id = 2;
    const valExpected = [mat];
    service.getAll().subscribe( ([{id}]) => {
      expect(valExpected[0].id).toEqual(id);
    });

    http.expectOne(`${environment.api}/match`).flush(valExpected);
  })));
});
