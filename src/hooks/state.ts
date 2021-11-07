import { reactive } from 'vue';
import { defineStore } from 'pinia';

const { floor, ceil } = Math;

export type Top = boolean;
export type Right = boolean;
export type Bottom = boolean;
export type Left = boolean;
export type Color = number;
export type Center = [number, number];
export type Coords = [number, number];
export type Borders = [Top, Right, Bottom, Left];
export type Move = { p1: Coords; p2: Coords; color: Color };

export type Cell = {
  color: Color;
  borders: Borders;
};

export type State = {
  field: Cell[][];
  // borders: Borders[][];
  centers: Center[];
  trivialFields: number[][];
  possibleMoves: Move[];
};

const NOT_SET = -1;
const OUTSIDE = undefined;

export const useGameState = defineStore('game-state', () => {
  const state: State = reactive({
    field: [],
    centers: [],
    trivialFields: [], // can't be removed
    possibleMoves: [],
  });

  function forEachField(fn: (x: number, y: number, cell: Cell) => void) {
    state.field.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (fn) fn(x, y, cell);
      });
    });
  }

  function loadData({ rows, cols, centers }) {
    resetField(rows, cols);
    setCenters(centers);
  }

  function resetField(cols = 12, rows = 12) {
    for (let row = 0; row < rows; row++) {
      state.field.push(
        new Array(cols).fill(true).map(() => ({
          color: NOT_SET,
          borders: [false, false, false, false],
        }))
      );
    }
  }

  function setCenters(centers) {
    state.centers = centers;
  }

  function initTrivial() {
    state.centers.forEach(([x, y], index) => {
      console.log({ index });
      state.field[floor(y)][floor(x)].color = index;
      state.field[floor(y)][ceil(x)].color = index;
      state.field[ceil(y)][floor(x)].color = index;
      state.field[ceil(y)][ceil(x)].color = index;
    });
    state.trivialFields = [];
    forEachField((x, y, cell) => {
      if (cell.color > 0) state.trivialFields.push([x, y]);
    });
  }

  function getNeighbors(x, y): [Cell, Cell, Cell, Cell] {
    const t = state.field[y - 1]?.[x];
    const r = state.field[y]?.[x + 1];
    const b = state.field[y + 1]?.[x];
    const l = state.field[y]?.[x - 1];
    return [t, r, b, l];
  }

  function getCell(x, y): Cell {
    return state.field[y]?.[x];
  }

  function getColor(x, y): Color {
    return state.field[y]?.[x].color;
  }

  const isColored = ({ color }) => color >= 0;

  function calcBorders(x: number, y: number, cell?: Cell): void {
    const currentCell = cell || getCell(x, y);
    const borders = getNeighbors(x, y).map((neighborCell): boolean => {
      if (!neighborCell && isColored(currentCell)) return true;
      if (!isColored(currentCell)) return false;

      if (isColored(neighborCell) != isColored(currentCell)) {
        return true;
      } else if (!isColored(neighborCell)) {
        // both not set
        return false;
      } else {
        // both set
        return neighborCell.color != currentCell.color;
      }
    }) as Borders; //?? why necessary tupels.map loose tupel info.
    currentCell.borders = borders;
  }

  function initBorders() {
    forEachField(calcBorders);
  }

  function mirrorCell(x: number, y: number, color: Color) {
    const [c_x, c_y] = state.centers[color];
    const m_x = 2 * c_x - x;
    const m_y = 2 * c_y - y;
    return {
      x: m_x,
      y: m_y,
    };
  }

  function allPossibleMoves() {
    //
    function checkMove(x, y, color) {
      const { x: m_x, y: m_y } = mirrorCell(x, y, color);
      const mCell = getCell(m_x, m_y);
      if (mCell && mCell.color === NOT_SET) {
        possibleMoves.push({
          p1: [x, y],
          p2: [m_x, m_y],
          color,
        });
      }
    }

    // for every marked field only check top and right,
    // because down and left will follow as mirrored
    const possibleMoves: Move[] = [];
    forEachField((x, y, cell) => {
      if (!isColored(cell)) return;
      const [top, right] = getNeighbors(x, y);
      //top
      if (top && top.color === NOT_SET) {
        checkMove(x, y - 1, cell.color);
      }
      if (right && right.color === NOT_SET) {
        checkMove(x + 1, y, cell.color);
      }
    });

    state.possibleMoves = possibleMoves;
  }

  function applyMove() {}

  return {
    state,
    resetField,
    allPossibleMoves,
    setCenters,
    initTrivial,
    loadData,
    initBorders,
  };
});
