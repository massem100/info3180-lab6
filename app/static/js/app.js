/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
              <router-link to= "/" class = "navbar-brand"> VueJS App </router-link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                     <router-link to= "/" class = "nav-link"> Home </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to= "/news" class = "nav-link"> News </router-link>
                  </li>
                </ul>
              </div>
            </nav>
        </header>    
    `,
    data: function() {
      return {};
    }
});

Vue.component('app-footer', {
    template: `
        <footer>
            <div class="container">
                <p>Copyright &copy {{ year }} Flask Inc.</p>
            </div>
        </footer>
    `,
    data: function() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

const NewsList = Vue.component('news-list', {

  template:  `
  <div> 
    <div class = "news">
      <h2> News </h2> 
      <ul class = "news__list d-flex flex-row flex-wrap p-3 mb-3 justify-content-center">
        <li v-for='article in articles' class = "box-shadow news_item border btop p-3 mb-4 mr-3 ml-2 col-md-3 d-flex flex-column rounded"> 
         <h6 class = "font-weight-bold" >{{ article.title}} </h6> <img class = "w-100 h-50 ml-0 mr-0 mt-2 mb-2 justify-content-center" src= "/static/images/placeholder.png"/> 
         <span class = " mb-5 font-sm">{{ article.description}}</span></li>
        
      </ul>
    <!-- A placeholder image is added in place of article.urlToImage which was returning null from the api -->
    </div> 

    <div class = "form-group mx-sm-3 mb-2 form-inline d-flex justify-content-center">
            <label class = "sr-only" for= "search"> Search </label> 
            <input type="search" name="search" v-model ="searchTerm" id = "search" class = "form-control mb-2 mr-sm-2" 
            placeholder = "Enter search term here "/> 
            <button class="btn btn-primary mt-2 mb-2" @click=searchNews >Search</button>
    
      </div> 
      
  </div>       
  `, 
  created: function () {

    let self = this;

    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=<api-key>')
    .then(function(response){
      return response.json(); 
    })
    .then(function(data){
      console.log(data);
      self.articles = data.articles;

    });
  }, 

  data: function () {
    return {
      searchTerm: '',
      articles: []
    
      
    }
  },

  methods: {
      
      searchNews: function () {
          let self = this;
          fetch('https://newsapi.org/v2/everything?q=' +
            self.searchTerm + '&language=en&apiKey=<api-key>')
              .then(function (response) {
                  return response.json();
              })
              .then(function (data) {
                  console.log(data);
                  self.articles = data.articles;
              });
      }
  }
});

const Home = Vue.component('home', {
  template: `

  <div> 
    <img src="/static/images/logo.png" alt="VueJS Logo">
    <h1>{{ welcome }}</h1>
  
  </div>
  `, 
  data: function () {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
});

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/news', component: NewsList }
  ]
});

const app = new Vue({
    el: '#app',
    router
});

