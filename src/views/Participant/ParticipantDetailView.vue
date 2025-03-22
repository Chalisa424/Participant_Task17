<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import participantService from '@/services/ParticipantService';
import type { Participant } from '@/types';

const route = useRoute();
const participant = ref<Participant>();

participantService
  .getParticipant(Number(route.params.id))
  .then((response) => {
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
    <p>Events: {{ participant.events.join(', ') }}</p>

    <div v-if="participant.events && participant.events.length > 0" class="event">
      <h2>Event Details:</h2>
      <div v-for="event in participant.events" :key="event.id" class="event">
        <p><strong>Title:</strong> {{ event.title }}</p>
        <p><strong>Date:</strong> {{ event.date }} at {{ event.time }}</p>
        <p><strong>Location:</strong> {{ event.location }}</p>
        <p><strong>Description:</strong> {{ event.description }}</p>
        <p><strong>Pets Allowed:</strong> {{ event.petsAllowed ? 'Yes' : 'No' }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
