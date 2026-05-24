<template>
  <div class="resume-page dark-background">
    <Header />
    
    <main class="main">
      <div class="container py-5 mt-5">
        <div class="resume-card" data-aos="fade-up">
          <div class="resume-header">
            <h1 class="display-6 fw-bold">Professional Resume</h1>
            <div class="resume-actions">
              <button @click="downloadPDF" class="btn-minimal">
                <i class="bi bi-download"></i>
                <span>Download PDF</span>
              </button>
            </div>
          </div>
          
          <div class="pdf-viewer-container">
            <div v-if="pdfError" class="pdf-error">
              <i class="bi bi-exclamation-triangle"></i>
              <p>Unable to load PDF preview.</p>
              <a :href="pdfUrl" target="_blank" class="btn-minimal mt-3">Open PDF in New Tab</a>
            </div>
            
            <div v-else-if="isLoading" class="pdf-loading">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3">Loading PDF...</p>
            </div>
            
            <VuePdfEmbed
              v-show="!isLoading && !pdfError"
              :source="pdfSource"
              @loaded="onPdfLoaded"
              @loading-failed="onPdfError"
              class="vue-pdf-embed"
            />
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import AOS from "aos";
import pdfFile from '/KarlRitoResume.pdf?url';

const pdfUrl = ref(pdfFile);
const pdfError = ref(false);
const pdfSource = ref(null);
const isLoading = ref(true);

const loadPDF = () => {
  try {
    pdfSource.value = pdfUrl.value;
    // isLoading is set to false in onPdfLoaded or onPdfError
  } catch (error) {
    pdfError.value = true;
    isLoading.value = false;
  }
};

const onPdfLoaded = () => {
  isLoading.value = false;
  pdfError.value = false;
};

const onPdfError = () => {
  isLoading.value = false;
  pdfError.value = true;
};

const downloadPDF = () => {
  const link = document.createElement('a');
  link.href = pdfUrl.value;
  link.download = 'KarlLouiseRito_Resume.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

onMounted(() => {
  loadPDF();
  AOS.init({
    duration: 600,
    easing: "ease-in-out",
    once: true,
  });
});
</script>

<style scoped lang="scss">
.resume-page {
  background-color: #040b14;
  color: #fff;
  min-height: 100vh;
}

.main {
  padding-top: 80px;
}

.resume-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.resume-header {
  padding: 30px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  h1 {
    font-family: "Raleway", sans-serif;
    letter-spacing: -1px;
    margin: 0;
    background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.resume-actions {
  display: flex;
  gap: 15px;
}

.btn-minimal {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 25px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #0563bb;
    border-color: #0563bb;
    box-shadow: 0 10px 20px rgba(5, 99, 187, 0.2);
    transform: translateY(-2px);
  }
}

.pdf-viewer-container {
  padding: 40px;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
}

.vue-pdf-embed {
  width: 100%;
  max-width: 900px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}

.pdf-loading, .pdf-error {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  
  i {
    font-size: 3rem;
    color: #0563bb;
    margin-bottom: 15px;
    display: block;
  }
}

@media (max-width: 768px) {
  .resume-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
    padding: 30px 20px;
  }
  
  .pdf-viewer-container {
    padding: 20px;
  }
}
</style>
