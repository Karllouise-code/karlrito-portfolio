<template>
  <section id="contact" class="contact section dark-background">
    <div class="container section-title text-center mb-5" data-aos="fade-up">
      <h2 class="display-4 fw-bold">Let's Connect</h2>
      <p class="lead-text mx-auto">Have a project in mind? I'd love to hear about it.</p>
    </div>

    <div class="container">
      <div class="row g-5">
        <div class="col-lg-5" data-aos="fade-up" data-aos-delay="100">
          <div class="contact-info">
            <div class="info-card" data-aos="fade-up" data-aos-delay="200">
              <div class="info-icon">
                <i class="bi bi-geo-alt"></i>
              </div>
              <div>
                <h3>Location</h3>
                <p>Biñan, Calabarzon, Philippines</p>
              </div>
            </div>

            <div class="info-card" data-aos="fade-up" data-aos-delay="300">
              <div class="info-icon">
                <i class="bi bi-telephone"></i>
              </div>
              <div>
                <h3>Phone</h3>
                <p>+63 976 366 7638</p>
              </div>
            </div>

            <div class="info-card" data-aos="fade-up" data-aos-delay="400">
              <div class="info-icon">
                <i class="bi bi-envelope"></i>
              </div>
              <div>
                <h3>Email</h3>
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
                  <input type="text" name="name" id="name-field" class="form-control" :class="{ 'has-error': validationErrors.name }" v-model="form.name" placeholder="John Doe" />
                  <div class="field-error" v-if="validationErrors.name">{{ validationErrors.name }}</div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="email-field">Your Email</label>
                  <input type="email" class="form-control" name="email" id="email-field" :class="{ 'has-error': validationErrors.email }" v-model="form.email" placeholder="john@example.com" />
                  <div class="field-error" v-if="validationErrors.email">{{ validationErrors.email }}</div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label for="subject-field">Subject</label>
                  <input type="text" class="form-control" name="subject" id="subject-field" :class="{ 'has-error': validationErrors.subject }" v-model="form.subject" placeholder="Project Inquiry" />
                  <div class="field-error" v-if="validationErrors.subject">{{ validationErrors.subject }}</div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label for="message-field">Message</label>
                  <textarea class="form-control" name="message" rows="6" id="message-field" :class="{ 'has-error': validationErrors.message }" v-model="form.message" placeholder="Tell me about your project..."></textarea>
                  <div class="field-error" v-if="validationErrors.message">{{ validationErrors.message }}</div>
                </div>
              </div>

              <div class="col-12 text-center">
                <div class="status-bar mb-4" v-if="errorMessage || successMessage">
                  <div class="status-message error" v-if="errorMessage && !isLoading">
                    <i class="bi bi-exclamation-circle"></i>
                    <span>{{ errorMessage }}</span>
                  </div>
                  <div class="status-message success" v-if="successMessage && !isLoading">
                    <i class="bi bi-check-circle-fill"></i>
                    <span>{{ successMessage }}</span>
                  </div>
                </div>

                <button type="submit" class="btn-submit" :disabled="isLoading">
                  <span v-if="isLoading" class="btn-loading">
                    <span class="spinner"></span>
                    Sending...
                  </span>
                  <span v-else class="btn-text">
                    Send Message
                    <i class="bi bi-arrow-right"></i>
                  </span>
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
  background-color: var(--background-color);
  color: var(--default-color);
}

.section-title {
  margin-bottom: 3rem !important;

  h2 {
    font-family: "Raleway", sans-serif;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.75rem;
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.1rem;
    max-width: 500px;
  }
}

.contact-info {
  background: rgba(255, 255, 255, 0.02);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.info-card {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 0;
    background: var(--accent-color);
    border-radius: 0 3px 3px 0;
    transition: height 0.3s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.03);

    &::before {
      height: 40px;
    }

    .info-icon {
      background: var(--accent-color);
      i { color: #fff; }
    }
  }

  + .info-card {
    margin-top: 0.5rem;
  }

  h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 4px;
    font-family: "Raleway", sans-serif;
    color: #e8ecf1;
  }

  p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0;
  }
}

.info-icon {
  width: 44px;
  height: 44px;
  background: rgba(var(--accent-color-rgb), 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;

  i {
    font-size: 1.25rem;
    color: var(--accent-color);
    transition: color 0.3s ease;
  }
}

.map-container {
  border-radius: 12px;
  overflow: hidden;
  height: 200px;
  border: 1px solid rgba(255, 255, 255, 0.06);

  iframe {
    width: 100%;
    height: 100%;
    filter: invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%);
  }
}

.contact-form {
  background: rgba(255, 255, 255, 0.02);
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);

  .form-group {
    position: relative;
  }

  label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 6px;
    color: #8b949e;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .form-control {
    width: 100%;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 12px 16px;
    color: #e8ecf1;
    font-size: 0.95rem;
    transition: all 0.25s ease;
    outline: none;

    &::placeholder {
      color: rgba(255, 255, 255, 0.15);
    }

    &:focus {
      background: rgba(255, 255, 255, 0.05);
      border-color: var(--accent-color);
      box-shadow: 0 0 0 3px rgba(var(--accent-color-rgb), 0.15);
    }

    &.has-error {
      border-color: #dc3545;
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
  }

  textarea.form-control {
    resize: vertical;
    min-height: 140px;
  }

  .field-error {
    font-size: 0.8rem;
    color: #dc3545;
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 4px;

    &::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 4px;
      background: #dc3545;
      border-radius: 50%;
    }
  }
}

.status-bar {
  .status-message {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.6rem 1.25rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;

    i { font-size: 1.1rem; }
  }

  .status-message.error {
    color: #dc3545;
    background: rgba(220, 53, 69, 0.1);
    border: 1px solid rgba(220, 53, 69, 0.2);
  }

  .status-message.success {
    color: #3fb950;
    background: rgba(63, 185, 80, 0.1);
    border: 1px solid rgba(63, 185, 80, 0.2);
  }
}

.btn-submit {
  position: relative;
  background: linear-gradient(135deg, var(--accent-color) 0%, #149ddd 100%);
  color: #fff;
  border: none;
  padding: 14px 40px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 220px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #149ddd 0%, var(--accent-color) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: inherit;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(var(--accent-color-rgb), 0.35);

    &::before { opacity: 1; }

    .btn-text i {
      transform: translateX(4px);
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .btn-text, .btn-loading {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .btn-text i {
    transition: transform 0.3s ease;
    font-size: 0.9rem;
  }
}

.btn-loading {
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: btn-spin 0.7s linear infinite;
  }
}

@keyframes btn-spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 576px) {
  .contact {
    padding: 60px 0;
  }

  .contact-info, .contact-form {
    padding: 1.5rem;
  }
}
</style>
