<template>
  <div class="container">
    <h1>find-my-el Demo</h1>
    <select v-model="coords">
      <option value="LEFT_TOP">Left Top</option>
      <option value="RIGHT_TOP">Right Top</option>
      <option value="CENTER_TOP">Center Top</option>
      <option value="LEFT_CENTER">Left Center</option>
      <option value="LEFT_BOTTOM">Left Bottom</option>
      <option value="RIGHT_BOTTOM">Right Bottom</option>
      <option value="CENTER_BOTTOM">Center Bottom</option>
      <option value="RIGHT_CENTER">Right Center</option>
      <option value="CENTER">Center</option>
    </select>
    <vue-draggable-resizable
      :w="100"
      :h="100"
      :x="20"
      :y="20"
      :resizable="false"
      v-on:dragging="onDrag"
    >
      <div class="box">Drag Me!</div>
    </vue-draggable-resizable>
    <vue-draggable-resizable
      :w="100"
      :h="100"
      :x="800"
      :y="20"
      :resizable="false"
      v-on:dragging="onDrag"
    >
      <div class="box">Drag Me!</div>
    </vue-draggable-resizable>
    <vue-draggable-resizable
      :w="100"
      :h="100"
      :x="20"
      :y="800"
      :resizable="false"
      v-on:dragging="onDrag"
    >
      <div class="box">Drag Me!</div>
    </vue-draggable-resizable>
    <vue-draggable-resizable
      :w="100"
      :h="100"
      :x="800"
      :y="800"
      :resizable="false"
      v-on:dragging="onDrag"
    >
      <div class="box">Drag Me!</div>
    </vue-draggable-resizable>
  </div>
</template>
<script>
import findMyEl from "../dist";
import VueDraggableResizable from "vue-draggable-resizable";
export default {
  data() {
    return {
      coords: "LEFT_TOP"
    };
  },
  components: {
    VueDraggableResizable
  },
  watch: {
    coords: function() {
      this.highlightClosest();
    }
  },
  methods: {
    onDrag() {
      this.highlightClosest();
    },
    highlightClosest() {
      const $els = document.querySelectorAll(".box");
      $els.forEach(node => node.classList.remove("active"));
      const $closest = findMyEl(this.coords, document.querySelectorAll(".box"));
      $closest.classList.add("active");
    }
  },
  mounted() {
    this.highlightClosest();
  }
};
</script>
<style>
* {
  box-sizing: border-box;
}
html,
body {
  height: 100vh;
  width: 100vw;
}
body {
  background: linear-gradient(to right, #ff9966, #ff5e62);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: "Helvetica Neue", "Arial", sans-serif;
}
.container {
  max-width: 500px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
}
.box {
  background: rgba(255, 255, 255, 0.5);
  width: 100px;
  height: 100px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #333;
  user-select: none;
}
.box.active {
  background: #49ab79;
  color: #fff;
}
</style>
