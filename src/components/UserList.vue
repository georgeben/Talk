<template>
  <div class="user-list">
    <h4>Members</h4>
    <hr>
    <b-list-group>
      <b-list-group-item v-for="user in users" :key="user.username">
        {{ user.name }}
        <b-badge v-if="user.presence"
        :variant="statusColour(user.presence)"
        pill>
        {{ user.presence }}</b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'message-list',
    computed: {
        ...mapState(['users'])
    },
    methods: {
        statusColour(presence){
            return presence == 'online' ? 'success' : 'warning'
        }
    }
}
</script>
