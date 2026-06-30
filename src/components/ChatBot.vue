<template>
  <div class="chatbot" :class="{ elevated: elevated }">
    <button class="chatbot-toggle" :class="{ active: open }" @click="open = !open" aria-label="Toggle chat">
      <i v-if="!open" class="bi bi-chat-dots"></i>
      <i v-else class="bi bi-x-lg"></i>
    </button>

    <Transition name="chat-panel">
      <div v-if="open" class="chatbot-panel">
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <div class="chatbot-avatar">
              <i class="bi bi-robot"></i>
            </div>
            <div>
              <h5>Portfolio Assistant</h5>
              <span class="chatbot-status">Online</span>
            </div>
          </div>
          <button class="chatbot-close" @click="open = false" aria-label="Close">
            <i class="bi bi-x"></i>
          </button>
        </div>

        <div class="chatbot-messages" ref="messagesRef">
          <div v-for="(msg, i) in messages" :key="i" class="message" :class="msg.role">
            <div class="message-bubble">
              <i v-if="msg.role === 'bot' && msg.showIcon" class="bi bi-robot-fill message-icon"></i>
              <span v-html="msg.text"></span>
            </div>
          </div>

          <div class="quick-replies" v-if="showQuickReplies">
            <p class="quick-label">Try asking about:</p>
            <div class="quick-buttons">
              <button v-for="q in quickReplies" :key="q" class="quick-btn" @click="ask(q)">
                {{ q }}
              </button>
            </div>
          </div>
        </div>

        <div class="chatbot-input">
          <input
            v-model="input"
            type="text"
            placeholder="Type a message..."
            @keydown.enter="send"
          />
          <button @click="send" :disabled="!input.trim()" aria-label="Send">
            <i class="bi bi-send-fill"></i>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, onMounted, onUnmounted } from 'vue'

const open = ref(false)
const elevated = ref(false)

function checkScrollTop() {
  const el = document.querySelector('.scroll-top.active')
  elevated.value = !!el
}

onMounted(() => {
  checkScrollTop()
  window.addEventListener('scroll', checkScrollTop, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScrollTop)
})
const input = ref('')
const messages = ref([])
const showQuickReplies = ref(false)
const messagesRef = ref(null)

const knowledgeBase = [
  {
    keywords: ['who', 'karl', 'are you', 'about', 'tell me', 'yourself', 'developer', 'portfolio'],
    answer: "Hey! I'm Karl Louise Rito — a full-stack web developer from Biñan, Laguna, Philippines. I specialize in <strong>Vue</strong>, <strong>Laravel</strong>, and modern web technologies. This portfolio showcases my projects, skills, and blog. What would you like to know?"
  },
  {
    keywords: ['skills', 'technologies', 'tech', 'stack', 'know', 'languages', 'tools', 'what can you'],
    answer: "Here are my core skills:<br><br>• <strong>Frontend:</strong> Vue 3, React, JavaScript, TypeScript, HTML/CSS, Bootstrap<br>• <strong>Backend:</strong> Laravel, PHP, Node.js, Python<br>• <strong>Databases:</strong> MySQL, PostgreSQL<br>• <strong>Tools:</strong> Git, Docker, REST APIs, Vite<br><br>Check the <a href='/all-skills' target='_blank'>All Skills</a> page for the full list!"
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'message', 'hire', 'get in touch'],
    answer: "You can reach me at:<br><br>📧 <strong>Email:</strong> <a href='mailto:karllouiserito.1@gmail.com'>karllouiserito.1@gmail.com</a><br>📞 <strong>Phone:</strong> +63 976 366 7638<br>📍 <strong>Location:</strong> Biñan, Laguna, Philippines<br><br>You can also use the <a href='/#contact'>contact form</a> on this site to send me a message directly!"
  },
  {
    keywords: ['resume', 'cv', 'experience', 'work', 'job', 'background', 'career'],
    answer: "You can view or download my full resume on the <a href='/resume' target='_blank'>Resume page</a>. It includes my work experience, education, certifications, and technical skills."
  },
  {
    keywords: ['project', 'portfolio', 'work', 'showcase', 'sample'],
    answer: "I've worked on various web development projects. Check out the <a href='/#portfolio'>Portfolio section</a> on the homepage or browse <a href='/all-projects' target='_blank'>All Projects</a> for a complete list with details!"
  },
  {
    keywords: ['blog', 'article', 'post', 'write', 'tutorial', 'journal'],
    answer: "I write technical articles and tutorials about web development. Head over to the <a href='/blog' target='_blank'>Blog</a> to read posts on Vue, Laravel, and more!"
  },
  {
    keywords: ['service', 'offer', 'freelance', 'build', 'website', 'web dev', 'develop'],
    answer: "I offer full-stack web development services including custom websites, SPAs, REST APIs, and more. Visit the <a href='/#services'>Services</a> section for details. Let's build something great together!"
  },
  {
    keywords: ['github', 'source', 'code', 'repository', 'repo', 'open source'],
    answer: "You can find my code on <strong>GitHub</strong> — <a href='https://github.com/Karllouise-code' target='_blank'>github.com/Karllouise-code</a>. Feel free to explore my repositories and open-source projects!"
  },
  {
    keywords: ['linkedin', 'social', 'profile', 'connect', 'network'],
    answer: "Let's connect on <strong>LinkedIn</strong> — <a href='https://www.linkedin.com/in/karllouise08/' target='_blank'>linkedin.com/in/karllouise08/</a>"
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'sup', 'howdy'],
    answer: "Hey there! 👋 I'm your portfolio assistant. Ask me anything about Karl, his skills, projects, or how to get in touch!"
  },
  {
    keywords: ['thank', 'thanks', 'appreciate', 'helpful'],
    answer: "You're welcome! 😊 If you have more questions, just type away. Happy browsing!"
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'farewell'],
    answer: "Take care! 👋 Feel free to come back anytime. Explore the portfolio and don't hesitate to <a href='/#contact'>reach out</a>!"
  }
]

const quickReplies = [
  'Who is Karl?',
  'What are your skills?',
  'How to contact you?',
  'Show me your projects',
  'View my resume',
  'What services do you offer?'
]

function findAnswer(query) {
  const lower = query.toLowerCase()
  const matched = knowledgeBase.find(entry =>
    entry.keywords.some(kw => lower.includes(kw))
  )
  return matched ? matched.answer : null
}

function addMessage(role, text, showIcon = true) {
  messages.value.push({ role, text, showIcon })
}

function scrollToBottom() {
  nextTick(() => {
    const el = messagesRef.value
    if (el) el.scrollTop = el.scrollHeight
  })
}

function send() {
  const text = input.value.trim()
  if (!text) return
  addMessage('user', text)
  input.value = ''
  showQuickReplies.value = false
  scrollToBottom()

  setTimeout(() => {
    const answer = findAnswer(text)
    if (answer) {
      addMessage('bot', answer)
    } else {
      addMessage('bot', "I'm not sure about that. Try one of the suggestions below!", true)
      showQuickReplies.value = true
    }
    scrollToBottom()
  }, 400)
}

function ask(question) {
  addMessage('user', question)
  showQuickReplies.value = false
  scrollToBottom()
  setTimeout(() => {
    const answer = findAnswer(question)
    addMessage('bot', answer || "I'm not sure about that.")
    scrollToBottom()
  }, 400)
}

watch(open, (val) => {
  if (val && messages.value.length === 0) {
    addMessage('bot', "Hi! 👋 I'm your portfolio assistant. Ask me about Karl, his skills, projects, or anything on this site!", true)
    showQuickReplies.value = true
    scrollToBottom()
  }
})
</script>

<style scoped lang="scss">
.chatbot {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  transition: bottom 0.3s ease;

  &.elevated {
    bottom: 81px;
  }
  font-family: 'Roboto', sans-serif;
}

.chatbot-toggle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: var(--accent-color);
  color: #fff;
  font-size: 1.4rem;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(var(--accent-color-rgb), 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;

  &:hover {
    background: #0678e3;
    transform: scale(1.05);
  }

  &.active {
    background: #dc3545;
    box-shadow: 0 4px 16px rgba(220, 53, 69, 0.4);
    &:hover {
      background: #e0444e;
    }
  }
}

.chatbot-panel {
  position: absolute;
  bottom: 68px;
  right: 0;
  width: 360px;
  height: 520px;
  background: #0f1923;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.chatbot-header {
  background: rgba(var(--accent-color-rgb), 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .chatbot-header-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .chatbot-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--accent-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.2rem;
  }

  h5 {
    margin: 0;
    color: #fff;
    font-weight: 600;
    font-size: 0.95rem;
    font-family: 'Raleway', sans-serif;
  }

  .chatbot-status {
    font-size: 0.75rem;
    color: #22c55e;
    display: flex;
    align-items: center;
    gap: 4px;
    &::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #22c55e;
      display: inline-block;
    }
  }

  .chatbot-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.4);
    font-size: 1.3rem;
    cursor: pointer;
    padding: 4px;
    transition: color 0.2s;
    &:hover {
      color: #fff;
    }
  }
}

.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
  }
}

.message {
  display: flex;
  max-width: 85%;

  &.bot {
    align-self: flex-start;
  }

  &.user {
    align-self: flex-end;
  }

  .message-bubble {
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 0.88rem;
    line-height: 1.5;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  &.bot .message-bubble {
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.9);
    border-bottom-left-radius: 4px;

    :deep(a) {
      color: #149ddd;
      text-decoration: underline;
      text-underline-offset: 2px;
      &:hover {
        color: #fff;
      }
    }
  }

  &.user .message-bubble {
    background: var(--accent-color);
    color: #fff;
    border-bottom-right-radius: 4px;
  }

  .message-icon {
    color: #149ddd;
    font-size: 0.9rem;
    margin-top: 2px;
    flex-shrink: 0;
  }
}

.quick-replies {
  padding: 8px 0;

  .quick-label {
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 8px;
  }

  .quick-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .quick-btn {
    background: rgba(var(--accent-color-rgb), 0.15);
    border: 1px solid rgba(var(--accent-color-rgb), 0.25);
    color: #149ddd;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: rgba(var(--accent-color-rgb), 0.3);
      border-color: var(--accent-color);
    }
  }
}

.chatbot-input {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 12px 16px;
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.2);

  input {
    flex: 1;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 10px 16px;
    color: #fff;
    font-size: 0.88rem;
    outline: none;
    transition: border-color 0.2s;

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    &:focus {
      border-color: var(--accent-color);
    }
  }

  button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: var(--accent-color);
    color: #fff;
    font-size: 0.9rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    flex-shrink: 0;

    &:hover:not(:disabled) {
      background: #0678e3;
    }

    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
  }
}

.chat-panel-enter-active {
  transition: all 0.25s ease-out;
}
.chat-panel-leave-active {
  transition: all 0.2s ease-in;
}
.chat-panel-enter-from,
.chat-panel-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
}

@media (max-width: 480px) {
  .chatbot-panel {
    width: calc(100vw - 32px);
    height: 460px;
    right: -4px;
  }
}
</style>
