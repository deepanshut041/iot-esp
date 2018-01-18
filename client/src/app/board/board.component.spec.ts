import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BoardComponent } from "./board.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BoardComponent", () => {

  let fixture: ComponentFixture<BoardComponent>;
  let component: BoardComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BoardComponent]
    });

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
