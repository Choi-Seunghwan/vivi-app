<template>
  <div class="roomItemContainer">
    <div class="roomList">
      <RoomCard
        v-for="(roomItem, roomListIndex) in roomList"
        :key="roomListIndex"
        @click.native="roomCardClickHandler(roomItem)"
        :title="roomItem.title"
        :memberCount="roomItem.memberCount"
        class="roomList__room"
      />
    </div>
  </div>
</template>
<script>
import RoomCard from './RoomCard';
import { mapActions } from 'vuex';

export default {
  components: {
    RoomCard
  },
  data: () => ({
    loading: true,
    roomList: []
  }),
  methods: {
    ...mapActions('live', ['enterRoom', 'getRoomList']),
    roomCardClickHandler(roomItem) {
      const { roomId } = roomItem;
      this.$router.push(`/live-room/${roomId}`);
    },
    async init() {
      this.roomList = await this.getRoomList();
      this.loading = false;
    }
  },
  async beforeMount() {
    this.init();
  }
};
</script>
<style lang="scss">
.roomItemContainer {
  .roomList {
    display: flex;
    flex-wrap: wrap;

    &__room {
      flex-basis: 25%;

      @media (min-width: 520px) {
        flex-basis: 50%;
      }
      @media (min-width: 992px) {
        flex-basis: 25%;
      }
    }
  }
}
</style>
