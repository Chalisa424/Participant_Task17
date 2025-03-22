<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import participantService from '@/services/ParticipantService';
import type { Participant } from '@/types';
import ParticipantCard from '@/components/ParticipantCard.vue';

const router = useRouter();
const participants = ref<Participant[]>([]);
const totalParticipants = ref(0);

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalParticipants.value / 3);
  return page.value < totalPages;
});

interface Props {
  page: number;
}
const props = defineProps<Props>();
const page = computed(() => props.page);

watchEffect(() => {
  participantService
    .getParticipants(page.value, 3)
    .then((response) => {
      nProgress.start();
      participants.value = response.data;
      totalParticipants.value = response.headers['x-total-count'];
    })
    .catch(() => {
      router.push({ name: 'network-error-view' });
    })
    .finally(() => {
      nProgress.done();
    });
});
</script>

<template>
  <h1>List of Participants</h1>
  <div class="participants">
    <div v-for="participant in participants" :key="participant.id">
    <ParticipantCard v-for="participant in participants" :key="participant.id":participant="participant"/>
    </div>
    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'participant-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >Prev Page</RouterLink
      >
      <RouterLink
        id="page-next"
        :to="{ name: 'participant-list-view', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.participants {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
