<template>
  <div
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="card"
    style="cursor: default"
    :style="{ width: width }"
    :class="{ 'card-animation': animation }"
  >
    <div
      ref="cardContainer"
      :class="{
        rounded: rounded,
        outlined: outlined,
        shadow: shadow,
      }"
    >
      <div :class="{ 'card-content-animation': animation, rounded: rounded }">
        <div
          v-if="hasTitleContent"
          style="border: solid grey; border-width: 0px 0px 1px 0px"
          :style="{
            backgroundColor: bgColorTitle,
            borderRadius: rounded ? '8px 8px 0px 0px' : '0px',
            color: colorTitle
          }"
          class="title"
        >
          <div>
            <slot name="title" ref="title">
              <span style="margin-left: auto; margin-right: auto">{{
                title
              }}</span>
            </slot>
          </div>
        </div>
        <div
          :style="{
            borderRadius: rounded ? '0px 0px 8px 8px' : '0px',
            padding: '10px',
            backgroundColor: bgColor,
            color: color
          }"
        >
          <slot> </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    outlined: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    width: {
      type: String,
      default: "auto",
    },
    color: {
      type: String,
      default: "black",
    },
    colorTitle: {
      type: String,
      default: "black",
    },
    bgColor: {
      type: String,
      default: "white",
    },
    bgColorTitle: {
      type: String,
      default: "white",
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    animation: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    isValuePresent() {
      if (this.type == "text") {
        return (
          this.modelValue !== null &&
          this.modelValue !== undefined &&
          this.modelValue !== ""
        );
      } else {
        return (
          this.modelValue !== null &&
          this.modelValue !== undefined &&
          !isNaN(this.modelValue)
        );
      }
    },
    hasTitleContent() {
      return this.title || this.$slots.title;
    },
  },
  methods: {
    handleMouseMove(mouseEvent) {
      if (this.animation) {
        let card = this.$refs.card;
        let cardContainer = this.$refs.cardContainer;

        let rect = card.getBoundingClientRect();
        let mouseX = mouseEvent.clientX - rect.left;
        let mouseY = mouseEvent.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const percentX = (mouseX - centerX) / (rect.width / 2);
        const percentY = -((mouseY - centerY) / (rect.height / 2));

        cardContainer.style.transform =
          "perspective(400px) rotateY(" +
          percentX * 5 +
          "deg) rotateX(" +
          percentY * 5 +
          "deg)";
      }
    },
    handleMouseEnter() {
      if (this.animation) {
        let card = this.$refs.cardContainer;
        setTimeout(() => {
          card.style.transition = "";
        }, 100);
        card.style.transition = "transform 0.1s";
      }
    },
    handleMouseLeave() {
      if (this.animation) {
        let card = this.$refs.cardContainer;
        card.style.transition = "transform 0.1s";
        setTimeout(() => {
          card.style.transition = "";
        }, 100);

        card.style.transform = "perspective(400px) rotateY(0deg) rotateX(0deg)";
      }
    },
  },
};
</script>
<style scoped>
.shadow {
  -webkit-box-shadow: -3px 3px 7px 1px rgba(0, 0, 0, 0.6);
  box-shadow: -3px 3px 7px 1px rgba(0, 0, 0, 0.6);
}

.rounded {
  border-radius: 8px;
}

.outlined {
  border: solid grey 1px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  padding: 5px;
  display: block;
}

.card-animation {
  transform: perspective(600px) rotateX(0deg) rotateY(0deg);
  will-change: transform;
}
.card-content-animation {
  color: black;
  transform: translateZ(80px);
}
</style>
  