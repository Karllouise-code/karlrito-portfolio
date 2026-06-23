import { ref } from 'vue'

const isDark = ref(localStorage.getItem('theme') === 'dark')

function apply() {
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

apply()

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    apply()
  }

  return { isDark, toggleTheme }
}
