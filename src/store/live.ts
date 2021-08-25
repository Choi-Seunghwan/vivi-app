import ws from '../services/webSocket.js';
import api from '../services/api.js';
import { TYPE_RADIO, SET_CURRENT_LIVE_ROOM_ID } from '@/constant';
import _get from 'lodash/get';

const state = () => ({
  joinedLiveRoom: {}
});

const mutations = {
  setJoinedLiveRoom: (state, room) => (state.joinedLiveRoom = room)
};

const getters = {
  _joinedLiveRoomId: state => state.joinedLiveRoomId
};

const actions = {
  async createRoom({ dispatch, rootGetters }, { title, type = TYPE_RADIO }) {
    await dispatch('media/createOffer', true, { root: true });
    const localDescriptionOffer = rootGetters['media/getLocalDescriptionOffer'];

    ws.sendMessage('live/createRoom', { title, type, localDescriptionOffer });
  },

  // async startLive({ dispatch, rootGetters }, roomInfo) {
  //   await dispatch('media/createOffer', true, { root: true });

  //   const localDescriptionOffer = rootGetters['media/getLocalDescriptionOffer'];
  //   ws.sendMessage('live/startLive', [{ ...roomInfo, localDescriptionOffer }]);
  // },

  joinRoom({ state }, roomId: string) {
    ws.sendMessage('live/joinRoom', { roomId });
  },

  joinRoomAnswer({ state }, { localDesc }) {
    const { joinedLiveRoom } = state;
    ws.sendMessage('live/joinRoomAnswer', { roomId: joinedLiveRoom.roomId, localDesc });
  },

  joinRoomReceiveAnswer({ state, dispatch }, { remoteDesc }) {
    dispatch('media/setRemoteDesc', { remoteDesc }, { root: true });
  },

  outRoom({ state }) {
    const { roomId } = state.joinedLiveRoom;
    ws.sendMessage('live/outRoom', { roomId });
  },

  async getRoomList() {
    const res = await api.get('live/roomList');
    const roomList = _get(res, 'result.roomList', []);

    return roomList;
  },

  async handleMessage({ state, commit, dispatch }, args) {
    const { method } = args;
    const splittedMethod = method.split('/');

    switch (splittedMethod[1]) {
      case 'joinRoom': {
        const { room } = args.result;
        const { creatorDescriptionOffer } = room;
        commit('setJoinedLiveRoom', room);
        const localDesc = await dispatch(
          'media/setRemoteDescAndGetLocalDesc',
          { descriptionOffer: creatorDescriptionOffer },
          { root: true }
        );
        dispatch('joinRoomAnswer', { localDesc });
        break;
      }

      case 'outRoom': {
        break;
      }
      case 'joinRoomReceiveAnswer': {
        dispatch('joinRoomReceiveAnswer');
        break;
      }
      default:
        break;
    }
  }
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
};
