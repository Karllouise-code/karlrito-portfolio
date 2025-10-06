<template>
  <!-- Contact Section -->
  <section id="contact" class="contact section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Contact</h2>
      <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
    </div>
    <!-- End Section Title -->

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row gy-4">
        <div class="col-lg-5">
          <div class="info-wrap">
            <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
              <i class="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>Address</h3>
                <p>Biñan, Calabarzon, Philippines</p>
              </div>
            </div>
            <!-- End Info Item -->

            <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
              <i class="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Call Me</h3>
                <p>+63 9763 667 638</p>
              </div>
            </div>
            <!-- End Info Item -->

            <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
              <i class="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>Email Me</h3>
                <p>karllouiserito.1@gmail.com</p>
              </div>
            </div>
            <!-- End Info Item -->

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.4758656328393!2d121.04879147479087!3d14.30136078910122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b5cf69aa6da7%3A0xb446426fc7bb209b!2sBi%C3%B1an%2C%20Laguna!5e0!3m2!1sen!2sph!4v1600000000000!5m2!1sen!2sph" frameborder="0" style="border: 0; width: 100%; height: 270px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>

        <div class="col-lg-7">
          <form @submit.prevent="submitForm" class="php-email-form" data-aos="fade-up" data-aos-delay="200">
            <div class="row gy-4">
              <div class="col-md-6">
                <label for="name-field" class="pb-2">Your Name</label>
                <input type="text" name="name" id="name-field" class="form-control" required v-model="form.name" />
              </div>

              <div class="col-md-6">
                <label for="email-field" class="pb-2">Your Email</label>
                <input type="email" class="form-control" name="email" id="email-field" required v-model="form.email" />
              </div>

              <div class="col-md-12">
                <label for="subject-field" class="pb-2">Subject</label>
                <input type="text" class="form-control" name="subject" id="subject-field" required v-model="form.subject" />
              </div>

              <div class="col-md-12">
                <label for="message-field" class="pb-2">Message</label>
                <textarea class="form-control" name="message" rows="10" id="message-field" required v-model="form.message"></textarea>
              </div>

              <div class="col-md-12 text-center">
                <div class="loading" v-if="isLoading">Loading</div>
                <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
                <div class="sent-message" v-if="successMessage">Your message has been sent. Thank you!</div>

                <button type="submit">Send Message</button>
              </div>
            </div>
          </form>
        </div>
        <!-- End Contact Form -->
      </div>
    </div>
  </section>
  <!-- /Contact Section -->
</template>

<script>
import { ref } from "vue";

export default {
  name: "Contact",
  setup() {
    const form = ref({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    const isLoading = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");

    const submitForm = async () => {
      isLoading.value = true;
      errorMessage.value = "";
      successMessage.value = "";

      try {
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Reset form
        form.value = {
          name: "",
          email: "",
          subject: "",
          message: "",
        };

        successMessage.value = "Your message has been sent. Thank you!";
      } catch (error) {
        errorMessage.value = "There was an error sending your message. Please try again.";
      } finally {
        isLoading.value = false;
      }
    };

    return {
      form,
      isLoading,
      errorMessage,
      successMessage,
      submitForm,
    };
  },
};
</script>

<style scoped>
.contact .info-wrap {
  background-color: var(--surface-color);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  /* height: 100%; */
}

.contact .info-item {
  margin-bottom: 40px;
}

.contact .info-item i {
  font-size: 20px;
  color: var(--accent-color);
  background: color-mix(in srgb, var(--accent-color), transparent 92%);
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  transition: all 0.3s ease-in-out;
  margin-right: 15px;
}

.contact .info-item h3 {
  padding: 0;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
}

.contact .info-item p {
  padding: 0;
  margin-bottom: 0;
  font-size: 14px;
}

.contact .info-item:hover i {
  background: var(--accent-color);
  color: var(--contrast-color);
}

.contact .php-email-form {
  background-color: var(--surface-color);
  height: 100%;
  padding: 30px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

.contact .php-email-form input[type="text"],
.contact .php-email-form input[type="email"],
.contact .php-email-form textarea {
  font-size: 14px;
  padding: 10px 15px;
  box-shadow: none;
  border-radius: 0;
  color: var(--default-color);
  background-color: var(--surface-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 80%);
  width: 100%;
}

.contact .php-email-form input[type="text"]:focus,
.contact .php-email-form input[type="email"]:focus,
.contact .php-email-form textarea:focus {
  border-color: var(--accent-color);
  outline: none;
}

.contact .php-email-form input[type="text"]::placeholder,
.contact .php-email-form input[type="email"]::placeholder,
.contact .php-email-form textarea::placeholder {
  color: color-mix(in srgb, var(--default-color), transparent 70%);
}

.contact .php-email-form button[type="submit"] {
  color: var(--contrast-color);
  background: var(--accent-color);
  border: 0;
  padding: 10px 30px;
  transition: 0.4s;
  border-radius: 50px;
  cursor: pointer;
  font-size: 14px;
}

.contact .php-email-form button[type="submit"]:hover {
  background: color-mix(in srgb, var(--accent-color), transparent 25%);
}

.contact .php-email-form .loading,
.contact .php-email-form .error-message,
.contact .php-email-form .sent-message {
  margin-bottom: 15px;
  text-align: center;
}

.contact .php-email-form .loading {
  color: var(--accent-color);
}

.contact .php-email-form .error-message {
  color: #df1529;
  background: #fef0f2;
  padding: 15px;
  border-radius: 4px;
}

.contact .php-email-form .sent-message {
  color: #059652;
  background: #e5f8f0;
  padding: 15px;
  border-radius: 4px;
}

@media (max-width: 575px) {
  .contact .info-wrap,
  .contact .php-email-form {
    padding: 20px;
  }
}
</style>
