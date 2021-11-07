<template>
  <div class="field">
    <div class="row" v-for="(row, y) in state.field" :key="y">
      <div
        class="cell"
        v-for="(cell, x) in row"
        :key="x"
        :data-dd="backgroundStyle(cell)"
        :style="{
          background: backgroundStyle(cell),
          ...gridPosition([x, y]),
          ...borderStyle(cell),
        }"
      >
        {{ cell.color < 0 ? '' : cell.color }}
      </div>
    </div>
    <div
      class="center"
      v-for="(center, i) in state.centers"
      :key="i"
      :style="gridPosition(center)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { useGameState } from '../hooks/state';
import { data } from '../data/puzzles';
import { useStyleHelper } from '../hooks/styleHelper';
const { gridPosition, backgroundStyle, borderStyle } = useStyleHelper();
const { state, initTrivial, loadData, initBorders, allPossibleMoves } =
  useGameState();

const puzzle = data.puzzle_1;

loadData(puzzle);
initTrivial();
initBorders();
allPossibleMoves();
</script>

<style>
.field {
  display: grid;
  grid-template-columns: repeat(v-bind('puzzle.cols'), 40px);
  grid-template-rows: repeat(v-bind('puzzle.rows'), 40px);
  grid-gap: 4px;
  animation: woo 6s infinite;
}
.row {
  display: contents;
}

.cell {
  background: lightyellow;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  border-radius: 2px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.center {
  display: flex;
  background: white;
  margin: auto;
  border: solid black 2px;
  width: 10px;
  height: 10px;
  border-radius: 14px;
}

@keyframes woo {
  0% {
    grid-gap: 30px;
  }
  50% {
    grid-gap: 4px;
  }
  100% {
    grid-gap: 30px;
  }
}
</style>
