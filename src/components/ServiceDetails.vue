<template>
  <div>
    <Header />

    <main id="main">
      <!-- Service Details Section -->
      <section id="service-details" class="service-details">
        <div class="container">
          <div class="row gy-4">
            <div class="col-lg-4">
              <div class="services-list">
                <a href="#" class="active">Web Design</a>
                <a href="#">Web Development</a>
                <a href="#">Product Management</a>
                <a href="#">Graphic Design</a>
                <a href="#">Marketing</a>
              </div>

              <h4>Enim qui eos rerum in delectus</h4>
              <p>Nam voluptatem quasi numquam quas fugiat ex temporibus quo est. Quia aut quam quod facere ut non occaecati ut aut. Nesciunt mollitia illum tempore corrupti sed eum reiciendis. Maxime modi rerum.</p>
            </div>

            <div class="col-lg-8">
              <img :src="serviceImage" alt="Service" class="img-fluid services-img" />
              <h3>{{ serviceDetails.title }}</h3>
              <p>{{ serviceDetails.description }}</p>

              <ul>
                <li v-for="feature in serviceDetails.features" :key="feature"><i class="bi bi-check-circle"></i> {{ feature }}</li>
              </ul>

              <p>{{ serviceDetails.additionalInfo }}</p>
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
  name: "ServiceDetails",
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
    const serviceImage = ref("");
    const serviceDetails = ref({});

    // Mock service data
    const servicesData = {
      1: {
        title: "Web Design Service",
        description: "Ullam nobis libero sapiente ad optio sint suscipit perspiciatis asperiores illum tempore impedit recusandae possimus, corrupti totam incidunt error omnis praesentium aut, ambitione ea consectetur deleniti. Facilis minima at quo tempora eius deserunt molestiae laborum fuga.",
        features: ["Aut eum totam accusantium voluptatem.", "Assumenda et porro nisi nihil nesciunt voluptatibus.", "Ullamco laboris nisi ut aliquip ex ea"],
        additionalInfo: "Est reprehenderit voluptatem necessitatibus asperiores neque sed ea undeuae non perfereendis ea eos. Repudiandae esse et aperiam korol maka maka.",
      },
    };

    onMounted(() => {
      const serviceId = props.id || route.params.id || "1";
      serviceDetails.value = servicesData[serviceId] || servicesData[1];
      serviceImage.value = new URL("@/assets/img/services.jpg", import.meta.url).href;
    });

    return {
      serviceImage,
      serviceDetails,
    };
  },
};
</script>
