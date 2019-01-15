<template>
  <div class="container row mt-3 mx-auto px-0">
    <div class="col-md-12 col-sm-9 mx-auto px-0">
      <div class="slide" @mouseover="stop" @mouseout="stop">
        <div class="slide-list">
          <img class="block-100 w-100" 
            v-for="(src, i) in imgList" :src="src" :key="src"
            :class="{'show': i == active}"
          >
        </div>
        <a class="carousel-control prev" @click.prevent="control(active-1)">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control next" @click.prevent="control(active+1)">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0,
        imgList: [
          'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=800',
          'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          'https://images.unsplash.com/photo-1460881680858-30d872d5b530?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1351&q=80',
          'https://images.unsplash.com/photo-1525312327132-8aefcec25ece?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        ],
        play: true,
        timer: null
      }
    },
    methods: {
      control(index) {
        this.active = (index + this.imgList.length) % this.imgList.length
      },
      autoPlay() {
        this.timer = setInterval(() => {
          this.active = (this.active + 1) % this.imgList.length
        }, 5000)
      },
      stop() {
        this.play = !this.play
      }
    },
    mounted() {
      this.autoPlay();
    },
    watch: {
      play: function(play) {
        if(play) {
          this.autoPlay();
        } else {
          clearInterval(this.timer);
        }
      }
    }
  }
</script>

<style scoped>
  .silde {
    position: relative;
  }
  .slide-list {
    max-width: 980px;
    padding-bottom: 40%;
  }
  .block-100 {
    display: block;
    height: 100%;
    object-fit: cover;
    transition: all .8s;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
  }
  .show {
    opacity: 1;
    visibility: visible;
  }
  .carousel-control {
    position: absolute;
    top: 0;
    bottom:0;
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: center;
    opacity: .8;
  }
  .prev {
    left: 0
  }
  .next {
    right: 0
  }
  .control-icon {
    font-size: 2.5rem;
    opacity: .8;
  }
  .slide-control:hover .control-icon {
    opacity: .5;
  }
</style>
