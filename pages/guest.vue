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
      loading: false,
      orientation: "square",
      per_page: 30,
      page: 1,
      query: "Ocean",
      isFilter: false,
      isOpen: false,
      start: this.$dateFns.startOfDay(this.$dateFns.addDays(new Date(), -60)),
      end: this.$dateFns.endOfDay(new Date()),
      maxDate: this.$dateFns.endOfDay(new Date()),
      photos: null
    }
  },
  computed: {
    title() {
      // if (this.isFilter) {
      return formatDate(this.start) +
        ' - ' +
        formatDate(this.end)
      // }
      // return "All Time"

    },
    selectedDate: {
      get() {
        // if (this.isFilter) {
        return {
          start: new Date(this.start),
          end: new Date(this.end)
        }
        // }
        // return null
      },
      set(value) {
        return value
      }
    },
    requestQuery() {
      return {
        query: this.query,
        orientation: this.orientation,
        page: this.page,
        per_page: this.per_page,
        // size: "small"
      }
    }
  },
  async mounted() {
    await this.fetchImg()
    this.loadImg()
  },
  methods: {
    loadImg() {
      console.log('sd');

      const loadImage = (entry) => {

        const img = entry.target;
        const src = img.getAttribute("data-src");
        if (!src) {
          return;
        }
        img.src = src;
        img.removeAttribute("data-src");
      }


      const options = {
        root: null, // Use the viewport as the root
        rootMargin: "0px", // No margin around the root
        threshold: 0.1 // 10% of the image should be in view to trigger the callback
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage(entry);
            observer.unobserve(entry.target); // Stop observing the image after it has been loaded
          }
        });
      }, options);

      const images = document.querySelectorAll('.lazy-load');
      console.log(images);

      images.forEach(img => {
        console.log('sdsd');

        observer.observe(img);
      });
    },
    async fetchImg() {
      this.loading = true
      console.log("er");

      await $fetch("https://api.pexels.com/v1/search", { method: "get", query: this.requestQuery, headers: { "Authorization": "ecZgLb86DRmktXueL6SHlzVC6Ew95jvnv2Fd9ogYpi1bX8eiqRfjrtq8" } })
        .then((res) => {
          console.log('sdss');

          this.photos = res.photos
          this.loading = false
        }).catch((err) => {
          console.log(err);
          this.loading = false
        })
    },
    async loadNext() {
      this.page++
      await this.fetchImg()
      this.loadImg()

    },
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
  <div class="row">
    <p v-if="loading" class="col-12">Loading ...</p>
    <template v-else>
      <div v-for="(item, i) in photos" :key="i" class="card col-3">
        <div class="card-body">
          <img loading="lazy" :data-src="item.src.original" width="500" height="auto" class="lazy-load" />
          <!-- <nuxt-img preload loading="lazy" :src="item.src.original" width="500" height="auto" quality="1"
            format="webp" /> -->
        </div>
      </div>
    </template>
    <!-- <div class="d-flex">
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
    </div> -->
    <button class="btn btn-primary" @click="loadNext">Next</button>
  </div>

</template>


<style lang="scss" scoped></style>