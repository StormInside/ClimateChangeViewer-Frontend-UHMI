<template>
  <div
    class="data-spoiler-wrapper"
    ref="wrapper"
    :style="{
      height: getSlotSpaceHeight,
    }"
  >
    <div class="data-spoiler" ref="dataSpoiler" @click="openDataSpoiler">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="10"
        role="presentation"
        class="data-spoiler__arrow"
        :class="{ 'data-spoiler__arrow-open': isOpen }"
      >
        <path
          d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"
        ></path>
      </svg>
      <slot name="title"></slot>
    </div>
    <div class="slot-space-wrapper">
      <transition name="scale-content">
        <div class="slot-space" v-show="isOpen" ref="slotSpace">
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataSpoiler",
  props: {
    defaultOpened: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: this.defaultOpened,
      slotSpaceHeight: 0,
      dataSpoilerMinHeight: 0,
    };
  },
  methods: {
    changeMinHeight() {
      /* Узнаем минимальную высоту,
        необходимую для отображения нашего dataSpoiler и отнимаем border */
      this.dataSpoilerMinHeight = this.$refs.dataSpoiler.scrollHeight - 1;
      /* Узнаем минимальную высоту,
        которая будет использоваться при анимации сворачивания и разворачивания */
      this.slotSpaceHeight =
        this.$refs.slotSpace.scrollHeight + this.dataSpoilerMinHeight;
    },
    openDataSpoiler() {
      this.isOpen = !this.isOpen;
      this.$nextTick(() => {
        this.changeMinHeight();
      });
    },
  },
  computed: {
    getSlotSpaceHeight() {
      if (this.slotSpaceHeight < 1 || this.dataSpoilerMinHeight < 1) {
        return "fit-content";
      }
      return this.isOpen
        ? `${this.slotSpaceHeight}px`
        : `${this.dataSpoilerMinHeight}px`;
    },
  },
  mounted() {
    const wrapperBorderWidth = this.$refs.wrapper.style.borderWidth;
    this.$refs.wrapper.style.borderWidth = "0px";
    this.$refs.slotSpace.style.visibility = this.isOpen ? "visible" : "hidden";
    this.$refs.slotSpace.style.display = "block";
    this.$nextTick(() =>
      setTimeout(() => {
        this.$refs.dataSpoiler.style.transition = "width 0.3s ease-in-out 0s";
        this.$refs.slotSpace.style.display = this.isOpen ? "block" : "none";
        this.$refs.slotSpace.style.visibility = "visible";
        this.$refs.wrapper.style.borderWidth = wrapperBorderWidth;
        setTimeout(() => {
          this.changeMinHeight();
        }, 1000);
        window.addEventListener("resize", this.changeMinHeight);
      }, 0)
    );
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.changeMinHeight);
  },
};
</script>

<style lang="scss" scoped>
.data-spoiler-wrapper {
  border: 1px solid $main-darkbrown;
  border-width: 0 1.5px 1.5px;
  width: fit-content;
  min-height: fit-content;
  min-width: fit-content;
  border-radius: 26px 26px;
  transition: height 0.3s ease-in-out 0s;
}
.data-spoiler {
  cursor: pointer;
  width: 100%;
  white-space: nowrap;
  min-width: fit-content;
  padding: 9px 18px;
  margin: -1.5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: $accordion-item-border-radius;
  background-color: $accordion-active-item-color;
  color: $main-white;
  font-family: inherit;
  font-size: inherit;
  @include unselected-text();
}
.data-spoiler__arrow-open {
  transform: rotate(0deg) scale(0.8) !important;
}
.data-spoiler__arrow {
  fill: $main-white;
  transform: rotate(-90deg) scale(0.8);
  margin-right: 19px;
  transition: all 0.3s ease-in-out 0s;
  overflow: initial;
}
.scale-content-leave-active {
  animation: scaling-down 0.25s ease-in-out 0s;
}
@keyframes scaling-down {
  0% {
    min-height: fit-content;
  }
  100% {
    min-height: max-content;
  }
}
.slot-space {
  min-width: fit-content;
  min-height: fit-content;
  padding: 15px 0;
}
.slot-space-wrapper {
  overflow: hidden;
}
</style>
