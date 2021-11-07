<template>
  <div class="field">
      <div class="row" v-for="(row, y) in state.field" :key="y">
          <div class="cell" v-for="(cell, x) in row" :key="x" :data-dd=" style(cell)" :style="{ background: style(cell), ... grid_position([x,y])}">
               
          </div>
      </div>
      <div 
        class="center" 
        v-for="(center, i) in state.centers" 
        :key="i" 
            :style="grid_position(center)">

      </div>
  </div>
</template>

<script setup>
import {state}  from "../hooks/state";

const colors = [];
let n =44;
while(n--){
    colors.push(Math.floor(Math.random()*16777215).toString(16).padStart(6,'0'));
}
const style = (i)=>{
    //return `linear-gradient(33deg, #${colors[i]} 0%, #${colors[(i+10)%43]} 100%)`
    return `#${colors[i]}`
}
console.log(colors);
console.log("asdf"+style(0));

const grid_position = ([x,y])=>{
    return {
        gridColumn: `${Math.floor(x+1)}${(Number.isInteger(x))?'':'/ span 2'}`,
        gridRow: `${Math.floor(y+1)}${(Number.isInteger(y))?'':'/ span 2'}`
    }
}

</script>

<style>
.field {
    display: grid;
    grid-template-columns: repeat(12, 40px);
    grid-template-rows: repeat(12, 40px);
    grid-gap: 4px;
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
    border-radius:10px;
}

.center {
    display: flex;
    background: white;
    margin: auto;
    border: solid black 4px;
    width: 15px;
    height: 15px;
    border-radius: 14px;
}

</style>