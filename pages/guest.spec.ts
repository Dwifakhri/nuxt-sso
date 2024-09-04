import { it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import guest from "./guest.vue"
// console.log(guest)

it("guest page test", (params: any) => {
  const component = mount(guest, { route: "/guest" })
  expect(component.html()).toMatchFileSnapshot(`"<div>
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
                :modelValue="selectedDate" expanded :focused-day="end">
              </VDatePicker>
            </ClientOnly>
          </div>
        </div>
      </div>
      <button class="ms-2 btn btn-primary" @click.prevent="deleteFilter" :disabled="!isFilter">Clear</button>
    </div>
  </div>"`)
})
