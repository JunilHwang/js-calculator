/// <reference types="cypress" />

import { Operation } from "../../src/js/domain";

describe("심플 계산기", () => {
  beforeEach(() => {
    cy.visit("./index.html");
  });

  const handleClickNumbers = (...numbers) =>
    numbers.forEach((number) => cy.get(".digit").contains(number).click());

  const handleClickPlus = () => cy.contains(Operation.PLUS.valueOf()).click();
  const handleClickSubtract = () =>
    cy.contains(Operation.SUBTRACT.valueOf()).click();
  const handleClickMultiply = () =>
    cy.contains(Operation.MULTIPLY.valueOf()).click();
  const handleClickDivision = () =>
    cy.contains(Operation.DIVISION.valueOf()).click();

  const handleClickEquals = () =>
    cy.contains(Operation.EQUALS.valueOf()).click();

  const expected = (number) => cy.get("#total").should("contain.html", number);

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    handleClickNumbers(1, 2);
    expected(12);
    handleClickPlus();
    handleClickNumbers(1);
    handleClickEquals();
    expected(13);
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    handleClickNumbers(1, 2);
    expected(12);
    handleClickSubtract();
    handleClickNumbers(1);
    handleClickEquals();
    expected(11);
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    handleClickNumbers(1, 2);
    expected(12);
    handleClickMultiply();
    handleClickNumbers(2);
    handleClickEquals();
    expected(24);
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    handleClickNumbers(1, 3);
    expected(13);
    handleClickDivision();
    handleClickNumbers(4);
    handleClickEquals();
    expected(3);
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    handleClickNumbers(1, 3);
    expected(13);
    cy.contains("AC").click();
    expected(0);
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    handleClickNumbers(1, 3, 3, 3);
    expected(133);
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    handleClickNumbers(1, 3);
    expected(13);

    handleClickDivision();
    handleClickNumbers(4);
    handleClickEquals();
    expected(3);

    handleClickDivision();
    handleClickNumbers(2);
    handleClickEquals();
    expected(1);
  });
});
