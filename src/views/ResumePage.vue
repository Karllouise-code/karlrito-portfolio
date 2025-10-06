<template>
  <div>
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="main">
      <div class="resume-page">
        <div class="resume-container">
          <div class="resume-header">
            <h1>My Resume</h1>
            <div class="resume-actions">
              <router-link to="/" class="btn-back">
                <i class="bi bi-arrow-left"></i> Back to Home
              </router-link>
              <button @click="downloadPDF" class="btn-download-pdf">
                <i class="bi bi-download"></i> Download PDF
              </button>
            </div>
          </div>
          <div class="pdf-viewer">
            <div v-if="pdfError" class="pdf-error">
              <i class="bi bi-exclamation-triangle"></i>
              <p>Unable to load PDF. <button @click="downloadPDF" class="btn-link">Click here to download</button></p>
              <a href="/public/Karl_Louise_Rito_Resume.pdf" target="_blank">Open Resume PDF</a>

            </div>
            <div v-else-if="isLoading" class="pdf-loading">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p>Loading PDF...</p>
            </div>
            <VuePdfEmbed
              v-else
              :source="pdfSource"
              @loaded="onPdfLoaded"
              @loading-failed="onPdfError"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Header from '@/components/Header.vue';
import VuePdfEmbed from 'vue-pdf-embed';
// Import PDF directly from public folder
import pdfFile from '/Karl_Louise_Rito_Resume.pdf?url';

export default {
  name: 'ResumePage',
  components: {
    Header,
    VuePdfEmbed,
  },
  setup() {
    const pdfUrl = ref(pdfFile);
    const pdfError = ref(false);
    const pdfSource = ref(null);
    const isLoading = ref(true);

    // Load PDF - just use the URL directly
    const loadPDF = () => {
      try {
        console.log('Loading PDF from:', pdfUrl.value);
        // For vue-pdf-embed, we can pass the URL directly
        pdfSource.value = pdfUrl.value;
        isLoading.value = false;
        console.log('PDF source set');
      } catch (error) {
        console.error('Failed to set PDF source:', error);
        pdfError.value = true;
        isLoading.value = false;
      }
    };

    onMounted(() => {
      loadPDF();
    });

    const onPdfLoaded = () => {
      console.log('PDF rendered successfully');
      pdfError.value = false;
    };

    const onPdfError = (error) => {
      console.error('PDF rendering error:', error);
      pdfError.value = true;
    };

    const downloadPDF = () => {
      // Simple direct download
      const link = document.createElement('a');
      link.href = pdfUrl.value;
      link.download = 'Karl_Louise_Rito_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return {
      pdfUrl,
      pdfSource,
      pdfError,
      isLoading,
      onPdfLoaded,
      onPdfError,
      downloadPDF,
    };
  },
};
</script>

<style scoped>
.resume-page {
  min-height: 100vh;
  background: var(--background-color);
  padding: 40px 20px;
}

.resume-container {
  max-width: 1200px;
  margin: 0 auto;
  background: var(--surface-color);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.resume-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
}

.resume-header h1 {
  margin: 0;
  font-size: 24px;
  color: var(--heading-color);
}

.resume-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-back,
.btn-download-pdf {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn-back {
  background: transparent;
  color: var(--default-color);
  border: 2px solid color-mix(in srgb, var(--default-color), transparent 70%);
}

.btn-back:hover {
  background: color-mix(in srgb, var(--default-color), transparent 95%);
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.btn-download-pdf {
  background: var(--accent-color);
  color: var(--contrast-color);
  border: 2px solid var(--accent-color);
  cursor: pointer;
}

.btn-download-pdf:hover {
  background: color-mix(in srgb, var(--accent-color), transparent 20%);
  transform: translateY(-2px);
}

.pdf-viewer {
  width: 100%;
  height: auto;
  min-height: 800px;
  overflow: auto;
}

.pdf-viewer :deep(.vue-pdf-embed) {
  width: 100%;
}

.pdf-viewer :deep(.vue-pdf-embed > div) {
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pdf-viewer iframe {
  border: none;
}

.pdf-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
  color: var(--default-color);
}

.pdf-error i {
  font-size: 48px;
  color: var(--accent-color);
}

.pdf-error p {
  font-size: 16px;
  margin: 0;
}

.pdf-error a {
  color: var(--accent-color);
  text-decoration: underline;
}

.pdf-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
  color: var(--default-color);
}

.pdf-loading p {
  font-size: 16px;
  margin: 0;
}

.btn-link {
  background: none;
  border: none;
  color: var(--accent-color);
  text-decoration: underline;
  cursor: pointer;
  font-size: inherit;
  padding: 0;
}

.btn-link:hover {
  color: color-mix(in srgb, var(--accent-color), transparent 25%);
}

@media (max-width: 768px) {
  .resume-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .resume-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn-back,
  .btn-download-pdf {
    width: 100%;
    justify-content: center;
  }

  .pdf-viewer {
    height: calc(100vh - 260px);
  }
}
</style>
