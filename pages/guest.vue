<script>
import "../../node_modules/v-calendar/dist/style.css"
import { formatDate } from '~/utils/formatDate'
export default {
  setup() {
    definePageMeta({
      middleware: "guest",
    })
  },
  data() {
    return {
      isFilter: false,
      isOpen: false,
      start: null,
      end: null,
      maxDate: this.$dateFns.endOfDay(new Date())
    }
  },
  computed: {
    title() {
      if (this.isFilter) {
        return formatDate(this.start) +
          ' - ' +
          formatDate(this.end)
      } else {
        return "All Time"
      }
    },
    selectedDate: {
      get() {
        if (this.isFilter) {
          return {
            start: new Date(this.start),
            end: new Date(this.end)
          }
        }
        return null
      },
      set(value) {
        return value
      }
    },
  },
  methods: {
    closeDropDown() {
      this.isOpen = false
    },
    selectRange(value) {
      if (value) {
        this.start = this.$dateFns.startOfDay(new Date(value.start)).valueOf()
        this.end = this.$dateFns.endOfDay(new Date(value.end)).valueOf()
        this.isFilter = true
      }
      this.isOpen = false
    },
    deleteFilter() {
      this.isFilter = false
    }
  },
}
</script>

<template>
  <div>
    <div class="d-flex">
      <div v-click-outside="closeDropDown" class="dropdown" :class="{ show: isOpen }" aria-haspopup="true"
        :aria-expanded="isOpen" style="min-width: 210px">
        <slot name="title" :is-open="isOpen">
          <ClientOnly>
            <div class="form-group mb-0">
              <div class="input-group">
                <span class="input-group-text">
                  <i class="fas fa-calendar"></i>
                </span>
                <button type="button" class="form-control text-left" id="datePickerText" @click="isOpen = !isOpen">
                  {{ title }}
                </button>
              </div>
            </div>
          </ClientOnly>
        </slot>
        <div :class="[
          'dropdown-menu datepicker-container dropdown-menu-right',
          { show: isOpen },
        ]">
          <div class="datepicker-left">
            <ClientOnly>
              <VDatePicker id="datePickerSelector" ref="picker" mode="range" range :max-date="maxDate" :columns="2"
                :rows="1" :step="1" @update:modelValue="selectRange" v-model.range="selectedDate"
                :modelValue="selectedDate" is-expanded>
              </VDatePicker>
            </ClientOnly>
          </div>
        </div>
      </div>
      <button class="ms-2 btn btn-primary" @click.prevent="deleteFilter" :disabled="!isFilter">Clear</button>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>