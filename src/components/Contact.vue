<template>
  <section id="contact" class="contact section dark-background">
    <div class="container section-title text-center mb-5" data-aos="fade-up">
      <h2 class="display-4 fw-bold">Contact</h2>
      <p class="lead-text mx-auto">Let's work together on your next project</p>
    </div>

    <div class="container">
      <div class="row g-5">
        <div class="col-lg-5" data-aos="fade-up" data-aos-delay="100">
          <div class="contact-info">
            <div class="info-card mb-4" data-aos="fade-up" data-aos-delay="200">
              <div class="info-icon">
                <i class="bi bi-geo-alt"></i>
              </div>
              <div>
                <h3>Address</h3>
                <p>Biñan, Calabarzon, Philippines</p>
              </div>
            </div>

            <div class="info-card mb-4" data-aos="fade-up" data-aos-delay="300">
              <div class="info-icon">
                <i class="bi bi-telephone"></i>
              </div>
              <div>
                <h3>Call Me</h3>
                <p>+63 9763 667 638</p>
              </div>
            </div>

            <div class="info-card mb-4" data-aos="fade-up" data-aos-delay="400">
              <div class="info-icon">
                <i class="bi bi-envelope"></i>
              </div>
              <div>
                <h3>Email Me</h3>
                <p>karllouiserito.1@gmail.com</p>
              </div>
            </div>

            <div class="map-container mt-4" data-aos="fade-up" data-aos-delay="500">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.4758656328393!2d121.04879147479087!3d14.30136078910122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b5cf69aa6da7%3A0xb446426fc7bb209b!2sBi%C3%B1an%2C%20Laguna!5e0!3m2!1sen!2sph!4v1600000000000!5m2!1sen!2sph" frameborder="0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>

        <div class="col-lg-7" data-aos="fade-up" data-aos-delay="200">
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="row g-4">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="name-field">Your Name</label>
                  <input type="text" name="name" id="name-field" class="form-control" :class="{ 'is-invalid': validationErrors.name }" v-model="form.name" placeholder="John Doe" />
                  <div class="invalid-feedback" v-if="validationErrors.name">{{ validationErrors.name }}</div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="email-field">Your Email</label>
                  <input type="email" class="form-control" name="email" id="email-field" :class="{ 'is-invalid': validationErrors.email }" v-model="form.email" placeholder="john@example.com" />
                  <div class="invalid-feedback" v-if="validationErrors.email">{{ validationErrors.email }}</div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label for="subject-field">Subject</label>
                  <input type="text" class="form-control" name="subject" id="subject-field" :class="{ 'is-invalid': validationErrors.subject }" v-model="form.subject" placeholder="Project Inquiry" />
                  <div class="invalid-feedback" v-if="validationErrors.subject">{{ validationErrors.subject }}</div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label for="message-field">Message</label>
                  <textarea class="form-control" name="message" rows="8" id="message-field" :class="{ 'is-invalid': validationErrors.message }" v-model="form.message" placeholder="Tell me about your project..."></textarea>
                  <div class="invalid-feedback" v-if="validationErrors.message">{{ validationErrors.message }}</div>
                </div>
              </div>

              <div class="col-12 text-center">
                <div class="status-messages mb-4">
                  <div class="error-message" v-if="errorMessage && !isLoading">
                    <i class="bi bi-exclamation-circle me-2"></i>
                    {{ errorMessage }}
                  </div>
                  <div class="sent-message" v-if="successMessage && !isLoading">
                    <i class="bi bi-check-circle me-2"></i>
                    {{ successMessage }}
                  </div>
                </div>

                <button type="submit" class="btn-submit" :disabled="isLoading">
                  <span v-if="isLoading">
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Sending...
                  </span>
                  <span v-else>Send Message</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import emailjs from "@emailjs/browser";

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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateForm = () => {
  const errors = {};
  if (!form.value.name.trim()) errors.name = "Name is required";
  if (!form.value.email.trim()) errors.email = "Email is required";
  else if (!emailRegex.test(form.value.email)) errors.email = "Invalid email address";
  if (!form.value.subject.trim()) errors.subject = "Subject is required";
  if (!form.value.message.trim()) errors.message = "Message is required";
  
  validationErrors.value = errors;
  return Object.keys(errors).length === 0;
};

const submitForm = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (!validateForm()) return;

  isLoading.value = true;

  try {
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    await emailjs.send(serviceID, templateID, {
      from_name: form.value.name,
      from_email: form.value.email,
      subject: form.value.subject,
      message: form.value.message,
    }, publicKey);

    form.value = { name: "", email: "", subject: "", message: "" };
    successMessage.value = "Your message has been sent successfully!";
    setTimeout(() => { successMessage.value = ""; }, 5000);
  } catch (error) {
    errorMessage.value = "Error sending message. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
.contact {
  padding: 100px 0;
  background-color: #040b14;
  color: #fff;
}

.section-title {
  h2 {
    font-family: "Raleway", sans-serif;
    letter-spacing: -1px;
    background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
  }
  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.1rem;
  }
}

.contact-info {
  background: rgba(255, 255, 255, 0.02);
  padding: 40px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.info-card {
  display: flex;
  gap: 20px;
  align-items: flex-start;

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 5px;
    font-family: "Raleway", sans-serif;
  }

  p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 0;
  }
}

.info-icon {
  width: 50px;
  height: 50px;
  background: rgba(5, 99, 187, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i {
    font-size: 1.5rem;
    color: #0563bb;
  }
}

.map-container {
  border-radius: 16px;
  overflow: hidden;
  height: 250px;
  
  iframe {
    width: 100%;
    height: 100%;
    filter: invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%);
  }
}

.contact-form {
  background: rgba(255, 255, 255, 0.02);
  padding: 40px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  .form-group {
    margin-bottom: 5px;
  }

  label {
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.6);
  }

  .form-control {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 12px 20px;
    color: #fff;
    transition: all 0.3s ease;

    &:focus {
      background: rgba(255, 255, 255, 0.05);
      border-color: #0563bb;
      box-shadow: 0 0 0 0.25rem rgba(5, 99, 187, 0.1);
      outline: none;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.2);
    }
  }
}

.btn-submit {
  background: #0563bb;
  color: #fff;
  border: none;
  padding: 15px 40px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 250px;

  &:hover {
    background: #0672d8;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(5, 99, 187, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.sent-message {
  color: #198754;
  font-weight: 500;
}

.error-message {
  color: #dc3545;
  font-weight: 500;
}

@media (max-width: 576px) {
  .contact-info, .contact-form {
    padding: 30px 20px;
  }
}
</style>

