<template>
  <div class="container">
    <div>
      <ContentCard />
    </div>
    <div class="row m-3">
      <div class="col-md-4">
        <AccountForm />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import ContentCard from '../components/ContentCard.vue';
export default {
  name: "Account",
  setup() {
    return {
      account: computed(() => AppState.account)
    };
  },
  components: { ContentCard }
}
</script>

<style lang="scss" scoped>
</style>