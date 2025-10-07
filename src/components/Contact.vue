<template>
  <!-- Contact Section -->
  <section id="contact" class="contact section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Contact</h2>
      <p>Let's work together on your next project</p>
    </div>
    <!-- End Section Title -->

    <div class="container">
      <div class="row gy-4" data-aos="fade-up" data-aos-delay="100">
        <div class="col-lg-5" data-aos="fade-up" data-aos-delay="200">
          <div class="info-wrap">
            <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
              <i class="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>Address</h3>
                <p>Biñan, Calabarzon, Philippines</p>
              </div>
            </div>
            <!-- End Info Item -->

            <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
              <i class="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Call Me</h3>
                <p>+63 9763 667 638</p>
              </div>
            </div>
            <!-- End Info Item -->

            <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
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

        <div class="col-lg-7" data-aos="fade-up" data-aos-delay="300">
          <form @submit.prevent="submitForm" class="php-email-form">
            <div class="row gy-4">
              <div class="col-md-6">
                <label for="name-field" class="pb-2">Your Name</label>
                <input type="text" name="name" id="name-field" class="form-control" :class="{ 'is-invalid': validationErrors.name }" v-model="form.name" />
                <div class="invalid-feedback" v-if="validationErrors.name">{{ validationErrors.name }}</div>
              </div>

              <div class="col-md-6">
                <label for="email-field" class="pb-2">Your Email</label>
                <input type="email" class="form-control" name="email" id="email-field" :class="{ 'is-invalid': validationErrors.email }" v-model="form.email" />
                <div class="invalid-feedback" v-if="validationErrors.email">{{ validationErrors.email }}</div>
              </div>

              <div class="col-md-12">
                <label for="subject-field" class="pb-2">Subject</label>
                <input type="text" class="form-control" name="subject" id="subject-field" :class="{ 'is-invalid': validationErrors.subject }" v-model="form.subject" />
                <div class="invalid-feedback" v-if="validationErrors.subject">{{ validationErrors.subject }}</div>
              </div>

              <div class="col-md-12">
                <label for="message-field" class="pb-2">Message</label>
                <textarea class="form-control" name="message" rows="10" id="message-field" :class="{ 'is-invalid': validationErrors.message }" v-model="form.message"></textarea>
                <div class="invalid-feedback" v-if="validationErrors.message">{{ validationErrors.message }}</div>
              </div>

              <div class="col-md-12 text-center">
                <div class="error-message" v-if="errorMessage && !isLoading">
                  <i class="bi bi-exclamation-circle"></i>
                  {{ errorMessage }}
                </div>
                <div class="sent-message" v-if="successMessage && !isLoading">
                  <i class="bi bi-check-circle"></i>
                  {{ successMessage }}
                </div>

                <button type="submit" :disabled="isLoading">
                  <span v-if="isLoading" class="button-loading">
                    <span class="spinner"></span>
                    Sending...
                  </span>
                  <span v-else>Send Message</span>
                </button>
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
import emailjs from "@emailjs/browser";

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
    const validationErrors = ref({});

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateForm = () => {
      const errors = {};

      // Name validation
      if (!form.value.name.trim()) {
        errors.name = "Name is required";
      } else if (form.value.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters";
      }

      // Email validation
      if (!form.value.email.trim()) {
        errors.email = "Email is required";
      } else if (!emailRegex.test(form.value.email)) {
        errors.email = "Please enter a valid email address";
      }

      // Subject validation
      if (!form.value.subject.trim()) {
        errors.subject = "Subject is required";
      } else if (form.value.subject.trim().length < 3) {
        errors.subject = "Subject must be at least 3 characters";
      }

      // Message validation
      if (!form.value.message.trim()) {
        errors.message = "Message is required";
      } else if (form.value.message.trim().length < 10) {
        errors.message = "Message must be at least 10 characters";
      }

      validationErrors.value = errors;
      return Object.keys(errors).length === 0;
    };

    const submitForm = async () => {
      errorMessage.value = "";
      successMessage.value = "";

      // Validate form
      if (!validateForm()) {
        return;
      }

      isLoading.value = true;

      try {
        // EmailJS configuration
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const contactTemplateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const autoReplyTemplateID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        const templateParams = {
          from_name: form.value.name,
          from_email: form.value.email,
          subject: form.value.subject,
          message: form.value.message,
          to_email: "karllouiserito.1@gmail.com",
        };

        // Send email to yourself (main contact form)
        await emailjs.send(serviceID, contactTemplateID, templateParams, publicKey);

        // Send auto-reply to the sender (only if auto-reply template is configured)
        if (autoReplyTemplateID) {
          await emailjs.send(serviceID, autoReplyTemplateID, templateParams, publicKey);
        }

        // Reset form
        form.value = {
          name: "",
          email: "",
          subject: "",
          message: "",
        };
        validationErrors.value = {};

        successMessage.value = "Your message has been sent successfully. Thank you!";

        // Clear success message after 5 seconds
        setTimeout(() => {
          successMessage.value = "";
        }, 5000);

      } catch (error) {
        console.error("EmailJS Error:", error);
        errorMessage.value = "There was an error sending your message. Please try again or email me directly at karllouiserito.1@gmail.com";
      } finally {
        isLoading.value = false;
      }
    };

    return {
      form,
      isLoading,
      errorMessage,
      successMessage,
      validationErrors,
      submitForm,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/contact';
</style>
