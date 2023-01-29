<template>
  <div class="modal fade" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Details of {{ countryData?.country }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <ChartBars ></ChartBars>

        </div>

        <!--        <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '~/stores/main'
import * as Modal from 'bootstrap/js/dist/modal'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: 'CountryDetailsModal',
  setup (props) {
    const store = useMainStore()
    const modal = ref()
    let modalInstance = null

    const countryData = computed(() => store.activeCountryData)
    const reportData = computed(() => store.activeCountryReportData)

    function initialize () {
      if (modalInstance) {
        return
      }

      modalInstance = new Modal(modal.value, {})

      modal.value.addEventListener('hidden.bs.modal', event => {
        store.updateCountryDetailsModalState(false)
      })
    }

    watch(() => store.showCountryDetails, (state) => {
      if (state) {
        modalInstance.show()
      }
    })

    onMounted(() => {
      initialize()

      if (store.showCountryDetails) {
        modalInstance.show()
      }
    })

    return {
      store,
      modal,
      countryData,
      reportData
    }
  }
})
</script>

<style scoped>

</style>
