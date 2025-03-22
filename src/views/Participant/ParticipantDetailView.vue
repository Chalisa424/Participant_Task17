<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import participantService from '@/services/ParticipantService';
import type { Participant } from '@/types';



const route = useRoute();
// const participant = ref<Participant>();
const participant = ref<Participant | null>(null);


participantService
  .getParticipant(Number(route.params.id))
  .then((response) => {
    console.log('Participant data:', response.data);
    participant.value = response.data;
  })
  .catch((error) => {
    console.error('There was an error!', error);
  });
</script>

<template>
  <div v-if="participant">
    <h1>{{ participant.name }}</h1>
    <p>Email: {{ participant.email }}</p>
  </div>
  <div v-else>
    <p>No events found for this participant.</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
