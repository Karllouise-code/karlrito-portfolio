<template>
  <div>
    <Header />

    <main id="main">
      <!-- Portfolio Details Section -->
      <section id="portfolio-details" class="portfolio-details">
        <div class="container">
          <div class="row gy-4">
            <div class="col-lg-8">
              <div class="portfolio-details-slider swiper">
                <div class="swiper-wrapper align-items-center">
                  <div v-for="image in portfolioItem.images" :key="image" class="swiper-slide">
                    <img :src="image" alt="Portfolio Image" />
                  </div>
                </div>
                <div class="swiper-pagination"></div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="portfolio-info">
                <h3>{{ portfolioItem.title }}</h3>
                <ul>
                  <li><strong>Category</strong>: {{ portfolioItem.category }}</li>
                  <li><strong>Client</strong>: {{ portfolioItem.client }}</li>
                  <li><strong>Project date</strong>: {{ portfolioItem.date }}</li>
                  <li>
                    <strong>Project URL</strong>: <a :href="portfolioItem.url">{{ portfolioItem.url }}</a>
                  </li>
                </ul>
              </div>
              <div class="portfolio-description">
                <h2>{{ portfolioItem.descriptionTitle }}</h2>
                <p>{{ portfolioItem.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  name: "PortfolioDetails",
  components: {
    Header,
    Footer,
  },
  props: {
    id: {
      type: String,
      default: "1",
    },
  },
  setup(props) {
    const route = useRoute();
    const portfolioItem = ref({});

    // Mock data with placeholder images
    const portfolioData = {
      1: {
        title: "App 1",
        category: "App",
        client: "ASU Company",
        date: "01 March, 2020",
        url: "www.example.com",
        descriptionTitle: "This is an example of portfolio detail",
        description: `Autem ipsum nam porro corporis rerum. Quis eos dolorem eos itaque inventore commodi labore quia quia. 
   Exercitationem repudiandae officiis neque suscipit non officia eaque itaque enim. Voluptatem officia accusantium nesciunt est omnis    
   tempora consectetur dignissimos. Sequi nulla at esse enim cum deserunt eius.`,
        images: ["https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&h=600&fit=crop&auto=format"],
      },
      // Add more portfolio items as needed
    };

    onMounted(() => {
      const itemId = props.id || route.params.id || "1";
      portfolioItem.value = portfolioData[itemId] || portfolioData[1];

      // Initialize Swiper
      if (window.Swiper) {
        new window.Swiper(".portfolio-details-slider", {
          speed: 400,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
          },
        });
      }
    });

    return {
      portfolioItem,
    };
  },
};
</script>
