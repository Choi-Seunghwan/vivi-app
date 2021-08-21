<template>
  <div class="startLive">
    <RoomCreatorContainer />
  </div>
</template>

<script>
import RoomCreatorContainer from '@/components/roomCreator/RoomCreatorContainer.vue';
export default {
  components: {
    RoomCreatorContainer
  }
};
</script>

<style lang="scss">
.startLive {
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // min-width: 320px;
}
</style>
