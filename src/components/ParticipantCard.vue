<script setup lang="ts">
import type { Participant } from '@/types'
defineProps<{ participant: Participant }>()
function getRandomEvent(events: { title: string; date: string; time: string }[]): { title: string; date: string; time: string } {
  const randomIndex = Math.floor(Math.random() * events.length);
  return events[randomIndex];
}
</script>


<template>
  <RouterLink class="participant-link" :to="{ name: 'participant-detail-view', params: { id: participant.id } }">
    <div class="participant-card">
      <h2>{{ participant.name }}</h2>
      <p>{{ participant.email }}</p>
      <div v-if="participant.events.length > 0" class="event">
        <h3>Events</h3>
        <p><strong>Title:</strong> {{ getRandomEvent(participant.events).title }}</p>
        <p><strong>Date:</strong> {{ getRandomEvent(participant.events).date }} at {{ getRandomEvent(participant.events).time }}</p>
      </div>

    </div>
  </RouterLink>
</template>

<style scoped>
.participant-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.participant-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.participant-link {
  text-decoration: none;
  color: inherit;
}
</style>



