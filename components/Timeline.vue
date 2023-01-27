<template>
  <div class="timeline-overlay overflow-auto">
    <ul class="list-unstyled d-flex text-light justify-content-center align-items-center">
      <template v-for="(year, i) in years" :key="year">
        <template v-if="i">
          <li v-for="i in 6" class="list-month"></li>
        </template>

        <li class="list-year" :class="{'active': +year.value === +mainStore.activeYear}"
            @click="mainStore.activeYear = year.value">
          <span class="year">
          {{ year.value }}
          </span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '~/stores/main'

export default defineComponent({
  name: 'Timeline',
  setup (props) {
    const mainStore = useMainStore()
    const timelineDiv = ref()
    const timeline = ref()
    let availableReports = ref([])

    const years = computed(() => {
      return availableReports.value.reduce((acc, report) => {
        const year = report._path.match(/[0-9].+/)[0]

        if (!acc.find((d) => d.value === year)) {
          acc.push({ value: year })
        }

        return acc
      }, [])
    })

    onMounted(async () => {
      availableReports.value = await queryContent().where({ _file: /^report_.*/ })
          .without('body').find()
    })

    return {
      timelineDiv,
      years,
      mainStore
    }
  }
})
</script>

<style scoped lang="scss">
.timeline-overlay {
  --el-color: #fff;
  --el-color-secondary: #757575;
  --el-height: 50px;
  --el-small-line-height: 10px;
  --el-normal-line-height: 15px;
  --el-big-line-height: 20px;

  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: linear-gradient(0deg, black, transparent);
  padding-top: 20px;
  opacity: .5;
  transition: opacity .3s ease;

  .list-unstyled {
    border-top: var(--bs-light) 1px solid;
    gap: 1rem;

  }

  :deep(.list-year) {
    cursor: pointer;
    position: relative;
    height: var(--el-height);
    opacity: .5;

    .year {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    &.active {
      font-size: 1.3rem;
      font-weight: 700;
      opacity: 1;
    }

    &:before {
      content: "";
      position: absolute;
      border-left: var(--el-color) 1px solid;
      width: 1px;
      height: var(--el-big-line-height);
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  :deep(.list-month) {
    position: relative;
    height: var(--el-height);

    &:before {
      content: "";
      position: absolute;
      border-left: var(--el-color-secondary) 1px solid;
      width: 1px;
      height: var(--el-small-line-height);
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover {
    opacity: 1;
  }
}
</style>
