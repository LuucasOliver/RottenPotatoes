<template>
  <main>
    <div class="search">
      <input type="text" v-model="search">
      <button @click="AddMovieModalOpen = true">
        Adicionar Filme
      </button>
    </div>
    <div class="movies">
      <div
        class="movie"
        v-for="movie in filteredMovies"
        :key="movie.id"
        @click.stop="$router.push(`/${movie.id}`)"
      >
      <div class="banner">
        <img :src="movie.imagem">
        <div class="actions">
          <div class="remove" @click.stop="removeMovie(movie.id)">Remover</div>
          <div class="edit" @click.stop="selectedMovie = movie">Editar</div>
        </div>
      </div>
      <div class="title">
        {{ movie.name }}
      </div>
      </div>
    </div>
    <AddMovieModal
      v-model:open="AddMovieModalOpen"
      :reloadMovies="loadMovies"
      v-model:selectedMovie="selectedMovie"
    />
  </main>
</template>
<script>
import { getAllMovies, remove } from '../api/movie'
import AddMovieModal from '../components/AddMovieModal.vue'

export default {
  components: {
    AddMovieModal
  },
  data: () => ({
    movies: [],
    AddMovieModalOpen: false,
    search: '',
    selectedMovie: null
  }),
  computed: {
    filteredMovies() {
      return this.movies.filter(x => Object.keys(x).some(key => String(x[key]).toUpperCase().includes(this.search.toUpperCase())))
    }
  },
  async mounted () {
    this.movies = await getAllMovies()
  },
  methods: {
    async loadMovies() {
      this.movies = await getAllMovies()
    },
    async removeMovie(id) {
      await remove(id)
      await this.loadMovies()
    }
  }
}
</script>
<style lang="scss" scoped>
  button {
    padding: 1rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: #00ff88;
    border: 1px solid #7C8596;
    color: #2b134b;
    background: #00ff88;
    border-radius: 1rem;
    cursor: pointer;
  }
  .movies {
    display: flex;
    align-items: start;
    flex-wrap: wrap;
    max-width: 100%;
    .movie {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      padding: 1rem;
      align-items: center;
      justify-content: center;
      width: 340px;
      transition: 0.3s;
      .banner {
        .actions {
          display: none;
          justify-content: space-between;
          align-items: flex-end;
          position: relative;
          top: -64px;
          margin-bottom: -64px;
          background-color: #00000090;
          border-radius: 0 0 12px 12px;
          .edit {
            color: #00ff88;
            border-radius: 0 0 12px 0;
          }
          .remove { 
            border-radius: 0 0 0 12px;
            color: red;
          }
          .edit, .remove {
            height: 60px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        img {
          width: 340px;
          height: 500px;
          object-fit: cover;
          border-radius: 10px;
        }
      }
      .title {
        word-wrap: break-word;
        white-space: pre-wrap;
        word-break: break-word;
        word-wrap: break-word;
        white-space: pre-wrap;
        font-size: 40px;
        color: white;
        text-align: center;
      }
      &:hover {
        img {
          border: 1px solid #514869;
        }
        .actions { display: flex; }
        transform: scale(1.04);
      }
    }
  }
  main {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 16px;
    .search {
      display: flex;
      gap: 16px;
      flex-grow: 1;
      input {
        flex-grow: 1;
        font-size: 24px;
        border-radius: 10px;
        padding: 0.5rem;
        background-color: #514869;
        border: none;
        color: white;
        outline: none;
      }
      button {
        background-color: #2b134b;
        box-shadow: 0px 10px 40px -12px #2b134b;
        color: #00ff88;
        transition: 0.4s;
        &:hover {
          background-color: #00ff88;
          box-shadow: 0px 10px 40px -12px #00ff88;
          color: #2b134b;

        }
      }
    }
  }
</style>