<template>
  <div class="liveRoom">
    <LiveViewerContainer />
  </div>
</template>
<script>
import LiveViewerContainer from '@/components/liveViewer/LiveViewerContainer.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    LiveViewerContainer
  },
  props: {},
  methods: {
    ...mapActions('live', ['joinRoom']),
    init() {
      const roomId = String(this.$route.params.roomId);
      this.joinRoom(roomId);
    }
  },
  beforeMount() {
    this.init();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.liveRoom {
}
</style>
